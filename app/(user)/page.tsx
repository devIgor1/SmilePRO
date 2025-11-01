import { HomeHeader } from "./_components/HomeHeader";
import { Hero } from "./_components/Hero";
import { Features } from "./_components/Features";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full" >
      <HomeHeader />
      <Hero />
      <Features />
    </div>
  );
}