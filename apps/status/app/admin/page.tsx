import Header from "../components/Header";
import Footer from "../components/Footer";
import { detectLocale } from "../server/lib/locale";
import { getServices } from "../server/repo/serviceRepository";
import { getIncidentHistories } from "../server/repo/incidentRepository";
import AdminForm, { type AdminIncident, type AdminService } from "./AdminForm";

// 常に最新の DB 状態を出す（プリフィル用）。ビルド時に事前描画しない。
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const locale = await detectLocale();

  // 管理画面のプリフィルは DB を正本として読む（Edge Config 反映は best-effort のため、
  // 送信直後の再読込で古い値が戻り、次の編集で上書き事故になるのを防ぐ）。
  const [services, incidents] = await Promise.all([
    getServices(locale, { skipCache: true }),
    getIncidentHistories(locale, { skipCache: true }),
  ]);

  const adminServices: AdminService[] = services.map((service) => ({
    id: service.id,
    label: service.label,
  }));

  const adminIncidents: AdminIncident[] = incidents.map((incident) => ({
    id: incident.id,
    slug: incident.slug,
    impact: incident.incidentImpact,
    title: incident.title,
    description: incident.description,
    affectedServiceIds: incident.affectedServiceIds,
    startedAt: incident.startedAt,
    resolvedAt: incident.resolvedAt,
    cause: incident.cause,
    externalLink: incident.externalLink,
  }));

  return (
    <>
      <Header locale={locale} />
      <main className="flex flex-col items-center md:p-8 p-4 md:mt-8 mt-4 md:mb-32 mb-16">
        <AdminForm
          locale={locale}
          services={adminServices}
          incidents={adminIncidents}
        />
      </main>
      <Footer />
    </>
  );
}
