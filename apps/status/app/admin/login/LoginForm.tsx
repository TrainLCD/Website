"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "../../server/lib/locale";

type Props = {
  locale: Locale;
};

const t = (locale: Locale) => ({
  title: locale === "ja" ? "管理ログイン" : "Admin Login",
  password: locale === "ja" ? "パスワード" : "Password",
  submit: locale === "ja" ? "ログイン" : "Log in",
  submitting: locale === "ja" ? "ログイン中…" : "Logging in…",
  failed:
    locale === "ja"
      ? "ログインに失敗しました"
      : "Login failed",
});

export default function LoginForm({ locale }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const labels = t(locale);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || labels.failed);
        setSubmitting(false);
        return;
      }
      const from = searchParams.get("from");
      const dest = from && from.startsWith("/admin") ? from : "/admin";
      router.replace(dest);
      router.refresh();
    } catch {
      setError(labels.failed);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white border rounded-lg p-6 shadow-sm"
    >
      <h1 className="text-lg font-semibold text-neutral-800 mb-4">
        {labels.title}
      </h1>
      <label className="block text-sm text-neutral-700 mb-1" htmlFor="password">
        {labels.password}
      </label>
      <input
        id="password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        required
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={submitting}
        className="mt-4 w-full bg-orange-600 text-white rounded-md py-2.5 font-medium disabled:opacity-60"
      >
        {submitting ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
