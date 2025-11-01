import { HomeHeader } from "./_components/HomeHeader";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";
import { Professionals } from "./_components/Professionals";
import { Pricing } from "./_components/Pricing";
import { CTA } from "./_components/CTA";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full" >
      <HomeHeader />
      <Hero />
      <Features />
      <Professionals />
      <Pricing />
      <CTA />
    </div>
  );
}