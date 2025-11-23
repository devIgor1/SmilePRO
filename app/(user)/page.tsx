import { HomeHeader } from "./_components/HomeHeader";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";
import { Professionals } from "./_components/Professionals";
import { Pricing } from "./_components/Pricing";
import { CTA } from "./_components/CTA";
import { Footer } from "./_components/Footer";
import { getActiveClinics } from "./_data-access/get-active-clinics";

export default async function Home() {
  const clinics = await getActiveClinics();

  return (
    <div className="flex min-h-screen flex-col w-full" >
      <HomeHeader />
      <Hero />
      <Features />
      <Professionals clinics={clinics} />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}