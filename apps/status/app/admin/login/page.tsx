import { Suspense } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { detectLocale } from "../../server/lib/locale";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const locale = await detectLocale();
  return (
    <>
      <Header locale={locale} />
      <main className="flex flex-col items-center md:p-8 p-4 md:mt-16 mt-8 md:mb-32 mb-16">
        <Suspense fallback={null}>
          <LoginForm locale={locale} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
