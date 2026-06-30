"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { LocaleText, StatusType } from "../server/types";
import type { Locale } from "../server/lib/locale";

export type AdminService = {
  id: string;
  label: LocaleText;
};

export type AdminIncident = {
  id: string;
  slug: string;
  impact: StatusType;
  title: LocaleText;
  description: LocaleText;
  affectedServiceIds: string[];
  startedAt: string;
  resolvedAt: string | null;
  cause: LocaleText | null;
  externalLink: string | null;
};

type Props = {
  locale: Locale;
  services: AdminService[];
  incidents: AdminIncident[];
};

type Mode = "new" | "update" | "service";

type ServiceState = {
  status: StatusType;
  summaryJa: string;
  summaryEn: string;
};

const STATUS_OPTIONS: { value: StatusType; ja: string; en: string }[] = [
  { value: "operational", ja: "正常", en: "Operational" },
  { value: "maintenance", ja: "メンテナンス", en: "Maintenance" },
  { value: "partiallyMaintenance", ja: "一部メンテナンス", en: "Partial maintenance" },
  { value: "degraded", ja: "機能低下", en: "Degraded" },
  { value: "partiallyDegraded", ja: "一部機能低下", en: "Partially degraded" },
  { value: "outage", ja: "停止", en: "Outage" },
  { value: "unknown", ja: "不明", en: "Unknown" },
];

/** ステータス別の定型サマリ（サービス一覧の各行に表示される文言）。 */
function presetSummary(status: StatusType): LocaleText {
  switch (status) {
    case "operational":
      return { ja: "現在正常に稼働しております。", en: "Operating normally." };
    case "outage":
      return { ja: "現在ご利用いただけません。", en: "Currently unavailable." };
    case "maintenance":
    case "partiallyMaintenance":
      return {
        ja: "メンテナンスを実施しております。",
        en: "Under maintenance.",
      };
    case "degraded":
    case "partiallyDegraded":
      return {
        ja: "一部機能に問題が発生しています。",
        en: "Some features are experiencing issues.",
      };
    default:
      return { ja: "状況を確認しています。", en: "Status under investigation." };
  }
}

/** ステータス別の定型更新本文。 */
function presetBody(status: StatusType): LocaleText {
  switch (status) {
    case "operational":
      return {
        ja: "復旧しました。ご不便をおかけし申し訳ございませんでした。",
        en: "This incident has been resolved. We apologize for the inconvenience.",
      };
    case "outage":
      return {
        ja: "現在、障害が発生しております。復旧に向けて対応しております。",
        en: "We are currently experiencing an outage and are working on recovery.",
      };
    default:
      return {
        ja: "現在、問題を調査しております。",
        en: "We are currently investigating the issue.",
      };
  }
}

// ---- 日時ヘルパー（JST の datetime-local 文字列を扱う） ----

function jstParts(date: Date): Record<string, string> {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const out: Record<string, string> = {};
  for (const p of parts) out[p.type] = p.value;
  return out;
}

/** 現在時刻を JST の "YYYY-MM-DDTHH:mm"（datetime-local 用）で返す。 */
function nowJstLocalInput(): string {
  const p = jstParts(new Date());
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

/** ISO(UTC) を JST の "YYYY-MM-DDTHH:mm" に変換する。 */
function isoToJstLocalInput(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return nowJstLocalInput();
  const p = jstParts(date);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

export default function AdminForm({ locale, services, incidents }: Props) {
  const router = useRouter();
  const isJa = locale === "ja";
  const tr = (ja: string, en: string) => (isJa ? ja : en);

  const [mode, setMode] = useState<Mode>("new");
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>("");

  const [impact, setImpact] = useState<StatusType>("outage");
  const [affected, setAffected] = useState<Set<string>>(new Set());
  const [serviceStates, setServiceStates] = useState<Record<string, ServiceState>>(
    {}
  );

  const [titleJa, setTitleJa] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descJa, setDescJa] = useState("");
  const [descEn, setDescEn] = useState("");
  const [startedAt, setStartedAt] = useState<string>(nowJstLocalInput());
  const [resolvedAt, setResolvedAt] = useState<string>("");
  const [causeJa, setCauseJa] = useState("");
  const [causeEn, setCauseEn] = useState("");
  const [externalLink, setExternalLink] = useState("");

  const [updateStatus, setUpdateStatus] = useState<StatusType>("outage");
  const [updateBodyJa, setUpdateBodyJa] = useState("");
  const [updateBodyEn, setUpdateBodyEn] = useState("");

  // サービスのみ変更モード用
  const [pickedServices, setPickedServices] = useState<Set<string>>(new Set());

  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [result, setResult] = useState<"success" | null>(null);

  const labelOf = (id: string) =>
    services.find((s) => s.id === id)?.label[locale] ?? id;

  // ---- 影響サービスのトグル ----
  const toggleAffected = (id: string) => {
    setAffected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // 初期状態は impact に合わせ、定型サマリをプリフィル
        setServiceStates((states) => {
          if (states[id]) return states;
          const summary = presetSummary(impact);
          return {
            ...states,
            [id]: { status: impact, summaryJa: summary.ja, summaryEn: summary.en },
          };
        });
      }
      return next;
    });
  };

  const setServiceState = (id: string, patch: Partial<ServiceState>) => {
    setServiceStates((states) => ({
      ...states,
      [id]: {
        status: patch.status ?? states[id]?.status ?? impact,
        summaryJa: patch.summaryJa ?? states[id]?.summaryJa ?? "",
        summaryEn: patch.summaryEn ?? states[id]?.summaryEn ?? "",
      },
    }));
  };

  /** あるサービス行に、選択ステータスの定型サマリを流し込む。 */
  const applyServicePreset = (id: string, status: StatusType) => {
    const summary = presetSummary(status);
    setServiceState(id, {
      status,
      summaryJa: summary.ja,
      summaryEn: summary.en,
    });
  };

  // ---- 既存インシデント選択でプリフィル ----
  const selectIncident = (id: string) => {
    setSelectedIncidentId(id);
    const incident = incidents.find((i) => i.id === id);
    if (!incident) return;
    setImpact(incident.impact);
    setTitleJa(incident.title.ja);
    setTitleEn(incident.title.en);
    setDescJa(incident.description.ja);
    setDescEn(incident.description.en);
    setStartedAt(isoToJstLocalInput(incident.startedAt));
    setResolvedAt(
      incident.resolvedAt ? isoToJstLocalInput(incident.resolvedAt) : ""
    );
    setCauseJa(incident.cause?.ja ?? "");
    setCauseEn(incident.cause?.en ?? "");
    setExternalLink(incident.externalLink ?? "");
    const nextAffected = new Set(incident.affectedServiceIds);
    setAffected(nextAffected);
    setServiceStates((states) => {
      const next = { ...states };
      for (const sid of incident.affectedServiceIds) {
        if (!next[sid]) {
          const summary = presetSummary(incident.impact);
          next[sid] = {
            status: incident.impact,
            summaryJa: summary.ja,
            summaryEn: summary.en,
          };
        }
      }
      return next;
    });
    setUpdateStatus(incident.impact);
    setUpdateBodyJa("");
    setUpdateBodyEn("");
  };

  // ---- 全体プリセット: 障害中 / 復旧 ----
  const applyOutagePreset = () => {
    setImpact("outage");
    setUpdateStatus("outage");
    const body = presetBody("outage");
    setUpdateBodyJa(body.ja);
    setUpdateBodyEn(body.en);
    setResolvedAt("");
    setServiceStates((states) => {
      const next = { ...states };
      for (const id of affected) applySummaryToState(next, id, "outage");
      return next;
    });
  };

  const applyRecoveryPreset = () => {
    setImpact("operational");
    setUpdateStatus("operational");
    const body = presetBody("operational");
    setUpdateBodyJa(body.ja);
    setUpdateBodyEn(body.en);
    setResolvedAt(nowJstLocalInput());
    setServiceStates((states) => {
      const next = { ...states };
      for (const id of affected) applySummaryToState(next, id, "operational");
      return next;
    });
  };

  const applySummaryToState = (
    target: Record<string, ServiceState>,
    id: string,
    status: StatusType
  ) => {
    const summary = presetSummary(status);
    target[id] = { status, summaryJa: summary.ja, summaryEn: summary.en };
  };

  // ---- サービスのみモードのトグル ----
  const togglePicked = (id: string) => {
    setPickedServices((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setServiceStates((states) => {
          if (states[id]) return states;
          const summary = presetSummary("operational");
          return {
            ...states,
            [id]: {
              status: "operational",
              summaryJa: summary.ja,
              summaryEn: summary.en,
            },
          };
        });
      }
      return next;
    });
  };

  // ---- バリデーション & ペイロード組み立て ----
  const activeServiceIds = useMemo(
    () => (mode === "service" ? [...pickedServices] : [...affected]),
    [mode, pickedServices, affected]
  );

  const validate = (): string[] => {
    const errs: string[] = [];
    if (mode === "service") {
      if (activeServiceIds.length === 0)
        errs.push(tr("サービスを1つ以上選択してください", "Select at least one service"));
    } else {
      if (mode === "update" && !selectedIncidentId)
        errs.push(tr("更新するインシデントを選択してください", "Select an incident to update"));
      if (!titleJa.trim() || !titleEn.trim())
        errs.push(tr("タイトル(ja/en)は必須です", "Title (ja/en) is required"));
      if (!descJa.trim() || !descEn.trim())
        errs.push(tr("概要(ja/en)は必須です", "Description (ja/en) is required"));
      if (affected.size === 0)
        errs.push(tr("影響サービスを1つ以上選択してください", "Select at least one affected service"));
      if (!startedAt)
        errs.push(tr("発生日時は必須です", "Started at is required"));
    }
    for (const id of activeServiceIds) {
      const st = serviceStates[id];
      if (!st || !st.summaryJa.trim() || !st.summaryEn.trim()) {
        errs.push(
          tr(
            `${labelOf(id)}: サマリ(ja/en)は空にできません`,
            `${labelOf(id)}: summary (ja/en) cannot be empty`
          )
        );
      }
    }
    return errs;
  };

  type ServicePayload = {
    serviceId: string;
    status: StatusType;
    summary: LocaleText;
  };
  type IncidentPayload = {
    id?: string;
    impact: StatusType;
    affectedServiceIds: string[];
    title: LocaleText;
    description: LocaleText;
    startedAt: string;
    resolvedAt?: string;
    cause?: LocaleText;
    externalLink?: string;
    updates?: { status: StatusType; body: LocaleText }[];
  };

  const buildPayload = () => {
    const servicePayload: ServicePayload[] = activeServiceIds.map((id) => ({
      serviceId: id,
      status: serviceStates[id]?.status ?? impact,
      summary: {
        ja: serviceStates[id]?.summaryJa ?? "",
        en: serviceStates[id]?.summaryEn ?? "",
      },
    }));

    if (mode === "service") {
      return { services: servicePayload };
    }

    const incident: IncidentPayload = {
      impact,
      affectedServiceIds: [...affected],
      title: { ja: titleJa, en: titleEn },
      description: { ja: descJa, en: descEn },
      startedAt,
    };
    if (mode === "update" && selectedIncidentId) incident.id = selectedIncidentId;
    if (resolvedAt) incident.resolvedAt = resolvedAt;
    if (causeJa.trim() || causeEn.trim())
      incident.cause = { ja: causeJa, en: causeEn };
    if (externalLink.trim()) incident.externalLink = externalLink.trim();
    if (updateBodyJa.trim() || updateBodyEn.trim()) {
      incident.updates = [
        { status: updateStatus, body: { ja: updateBodyJa, en: updateBodyEn } },
      ];
    }

    return { incidents: [incident], services: servicePayload };
  };

  const handlePreview = () => {
    const errs = validate();
    setErrors(errs);
    if (errs.length === 0) setShowPreview(true);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrors([]);
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors([
          data.error || tr("更新に失敗しました", "Update failed"),
          ...(data.details ? [String(data.details)] : []),
        ]);
        setShowPreview(false);
        setSubmitting(false);
        return;
      }
      setResult("success");
      setShowPreview(false);
      setSubmitting(false);
      router.refresh();
    } catch {
      setErrors([tr("通信に失敗しました", "Network error")]);
      setShowPreview(false);
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  // ---- 描画 ----
  const inputClass =
    "w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-500";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1";
  const sectionClass = "bg-white border rounded-lg p-4 mb-4";

  if (result === "success") {
    return (
      <div className="w-full max-w-2xl">
        <div className="bg-green-50 border border-green-300 rounded-lg p-6 text-center">
          <p className="text-green-800 font-semibold mb-2">
            {tr("更新しました", "Updated successfully")}
          </p>
          <p className="text-sm text-neutral-600 mb-4">
            {tr(
              "公開ページに反映されるまで最大30秒ほどかかります。",
              "It may take up to ~30s to appear on the public page."
            )}
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="bg-orange-600 text-white rounded-md px-4 py-2 text-sm font-medium"
            >
              {tr("公開ページを開く", "Open public page")}
            </Link>
            <button
              onClick={() => setResult(null)}
              className="border rounded-md px-4 py-2 text-sm"
            >
              {tr("続けて編集", "Edit more")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderServiceRows = (ids: string[]) =>
    ids.map((id) => {
      const st = serviceStates[id];
      return (
        <div key={id} className="border rounded-md p-3 mb-2 bg-neutral-50">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">{labelOf(id)}</span>
            <select
              value={st?.status ?? impact}
              onChange={(e) =>
                applyServicePreset(id, e.target.value as StatusType)
              }
              className="border rounded-md px-2 py-1 text-sm"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {isJa ? o.ja : o.en}
                </option>
              ))}
            </select>
          </div>
          <input
            value={st?.summaryJa ?? ""}
            onChange={(e) => setServiceState(id, { summaryJa: e.target.value })}
            placeholder={tr("サマリ（日本語）", "Summary (Japanese)")}
            className={`${inputClass} mb-1 text-sm`}
          />
          <input
            value={st?.summaryEn ?? ""}
            onChange={(e) => setServiceState(id, { summaryEn: e.target.value })}
            placeholder={tr("サマリ（英語）", "Summary (English)")}
            className={`${inputClass} text-sm`}
          />
        </div>
      );
    });

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-neutral-800">
          {tr("障害情報の更新", "Update status")}
        </h1>
        <button
          onClick={handleLogout}
          className="text-sm text-neutral-500 underline"
        >
          {tr("ログアウト", "Log out")}
        </button>
      </div>

      {/* モード切替 */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {(
          [
            ["new", tr("新規", "New")],
            ["update", tr("更新/復旧", "Update")],
            ["service", tr("サービスのみ", "Service")],
          ] as [Mode, string][]
        ).map(([m, label]) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setErrors([]);
            }}
            className={`rounded-md py-2 text-sm font-medium border ${
              mode === m
                ? "bg-orange-600 text-white border-orange-600"
                : "bg-white text-neutral-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 既存インシデント選択（更新モード） */}
      {mode === "update" && (
        <div className={sectionClass}>
          <label className={labelClass}>
            {tr("更新するインシデント", "Incident to update")}
          </label>
          <select
            value={selectedIncidentId}
            onChange={(e) => selectIncident(e.target.value)}
            className={inputClass}
          >
            <option value="">
              {tr("— 選択してください —", "— Select —")}
            </option>
            {incidents.map((i) => (
              <option key={i.id} value={i.id}>
                {i.title[locale] || i.slug}
                {i.resolvedAt ? tr("（復旧済）", " (resolved)") : ""}
              </option>
            ))}
          </select>
          {selectedIncidentId && (
            <button
              onClick={applyRecoveryPreset}
              className="mt-3 w-full bg-green-600 text-white rounded-md py-2 text-sm font-medium"
            >
              {tr("ワンタップ復旧（全項目を復旧に設定）", "One-tap resolve")}
            </button>
          )}
        </div>
      )}

      {/* インシデント本体（new / update） */}
      {(mode === "new" || mode === "update") && (
        <>
          <div className={sectionClass}>
            <div className="flex gap-2 mb-3">
              <button
                onClick={applyOutagePreset}
                className="flex-1 bg-red-600 text-white rounded-md py-2 text-sm font-medium"
              >
                {tr("障害中プリセット", "Outage preset")}
              </button>
              <button
                onClick={applyRecoveryPreset}
                className="flex-1 bg-green-600 text-white rounded-md py-2 text-sm font-medium"
              >
                {tr("復旧プリセット", "Recovery preset")}
              </button>
            </div>

            <label className={labelClass}>{tr("影響度", "Impact")}</label>
            <select
              value={impact}
              onChange={(e) => setImpact(e.target.value as StatusType)}
              className={`${inputClass} mb-3`}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {isJa ? o.ja : o.en}
                </option>
              ))}
            </select>

            <label className={labelClass}>
              {tr("影響サービス", "Affected services")}
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleAffected(s.id)}
                  className={`rounded-full px-3 py-1.5 text-sm border ${
                    affected.has(s.id)
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white text-neutral-700"
                  }`}
                >
                  {s.label[locale]}
                </button>
              ))}
            </div>
          </div>

          {affected.size > 0 && (
            <div className={sectionClass}>
              <label className={labelClass}>
                {tr("サービスごとの状態・文言", "Per-service status & summary")}
              </label>
              {renderServiceRows([...affected])}
            </div>
          )}

          <div className={sectionClass}>
            <label className={labelClass}>{tr("タイトル", "Title")}</label>
            <input
              value={titleJa}
              onChange={(e) => setTitleJa(e.target.value)}
              placeholder={tr("タイトル（日本語）", "Title (Japanese)")}
              className={`${inputClass} mb-1`}
            />
            <input
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder={tr("タイトル（英語）", "Title (English)")}
              className={inputClass}
            />

            <label className={`${labelClass} mt-3`}>
              {tr("概要", "Description")}
            </label>
            <textarea
              value={descJa}
              onChange={(e) => setDescJa(e.target.value)}
              placeholder={tr("概要（日本語）", "Description (Japanese)")}
              className={`${inputClass} mb-1`}
              rows={2}
            />
            <textarea
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              placeholder={tr("概要（英語）", "Description (English)")}
              className={inputClass}
              rows={2}
            />

            <div className="grid grid-cols-2 gap-2 mt-3">
              <div>
                <label className={labelClass}>
                  {tr("発生日時(JST)", "Started (JST)")}
                </label>
                <input
                  type="datetime-local"
                  value={startedAt}
                  onChange={(e) => setStartedAt(e.target.value)}
                  className={`${inputClass} text-sm`}
                />
              </div>
              <div>
                <label className={labelClass}>
                  {tr("復旧日時(JST)", "Resolved (JST)")}
                </label>
                <input
                  type="datetime-local"
                  value={resolvedAt}
                  onChange={(e) => setResolvedAt(e.target.value)}
                  className={`${inputClass} text-sm`}
                />
              </div>
            </div>
          </div>

          <div className={sectionClass}>
            <label className={labelClass}>
              {tr("更新（任意・タイムラインに追加）", "Update entry (optional)")}
            </label>
            <select
              value={updateStatus}
              onChange={(e) => setUpdateStatus(e.target.value as StatusType)}
              className={`${inputClass} mb-2 text-sm`}
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {isJa ? o.ja : o.en}
                </option>
              ))}
            </select>
            <textarea
              value={updateBodyJa}
              onChange={(e) => setUpdateBodyJa(e.target.value)}
              placeholder={tr("更新本文（日本語）", "Update body (Japanese)")}
              className={`${inputClass} mb-1 text-sm`}
              rows={2}
            />
            <textarea
              value={updateBodyEn}
              onChange={(e) => setUpdateBodyEn(e.target.value)}
              placeholder={tr("更新本文（英語）", "Update body (English)")}
              className={`${inputClass} text-sm`}
              rows={2}
            />
          </div>

          <details className={sectionClass}>
            <summary className="text-sm font-medium text-neutral-700 cursor-pointer">
              {tr("原因・外部リンク（任意）", "Cause / external link (optional)")}
            </summary>
            <div className="mt-3">
              <input
                value={causeJa}
                onChange={(e) => setCauseJa(e.target.value)}
                placeholder={tr("原因（日本語）", "Cause (Japanese)")}
                className={`${inputClass} mb-1 text-sm`}
              />
              <input
                value={causeEn}
                onChange={(e) => setCauseEn(e.target.value)}
                placeholder={tr("原因（英語）", "Cause (English)")}
                className={`${inputClass} mb-2 text-sm`}
              />
              <input
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                placeholder="https://..."
                className={`${inputClass} text-sm`}
              />
            </div>
          </details>
        </>
      )}

      {/* サービスのみモード */}
      {mode === "service" && (
        <div className={sectionClass}>
          <label className={labelClass}>
            {tr("対象サービス", "Target services")}
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {services.map((s) => (
              <button
                key={s.id}
                onClick={() => togglePicked(s.id)}
                className={`rounded-full px-3 py-1.5 text-sm border ${
                  pickedServices.has(s.id)
                    ? "bg-orange-600 text-white border-orange-600"
                    : "bg-white text-neutral-700"
                }`}
              >
                {s.label[locale]}
              </button>
            ))}
          </div>
          {pickedServices.size > 0 && renderServiceRows([...pickedServices])}
        </div>
      )}

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-3 mb-4">
          <ul className="list-disc list-inside text-sm text-red-700">
            {errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handlePreview}
        className="w-full bg-orange-600 text-white rounded-md py-3 font-semibold"
      >
        {tr("内容を確認", "Review")}
      </button>

      {/* プレビュー & 確認 */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[85vh] overflow-auto p-5">
            <h2 className="text-lg font-semibold mb-3">
              {tr("この内容で公開しますか？", "Publish this update?")}
            </h2>
            <pre className="text-xs bg-neutral-100 rounded p-3 overflow-auto whitespace-pre-wrap">
              {JSON.stringify(buildPayload(), null, 2)}
            </pre>
            <p className="text-xs text-neutral-500 mt-2">
              {tr(
                "日時は送信時に JST → UTC へ自動変換されます。",
                "Times are auto-converted from JST to UTC on submit."
              )}
            </p>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 border rounded-md py-2.5"
                disabled={submitting}
              >
                {tr("戻る", "Back")}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 bg-orange-600 text-white rounded-md py-2.5 font-semibold disabled:opacity-60"
              >
                {submitting
                  ? tr("送信中…", "Submitting…")
                  : tr("公開する", "Publish")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
