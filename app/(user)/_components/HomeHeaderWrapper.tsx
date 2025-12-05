import getSession from "@/lib/getSession";
import { HomeHeaderClient } from "./HomeHeader";

export async function HomeHeaderWrapper() {
  const session = await getSession();

  return <HomeHeaderClient session={session} />;
}
