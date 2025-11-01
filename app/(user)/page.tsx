import { HomeHeader } from "./_components/HomeHeader";
import { Hero } from "./_components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full" >
      <HomeHeader />
      <Hero />
    </div>
  );
}