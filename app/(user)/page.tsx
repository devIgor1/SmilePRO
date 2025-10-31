import { HomeHeader } from "./_components/HomeHeader";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full" >
      <HomeHeader />
      <div className="text-3xl font-bold underline">Home Page</div>
    </div>
  );
}