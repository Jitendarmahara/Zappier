import { Appbar } from "@/components/appbar";
import { Hero } from "@/components/Hero";
import { HeroVideo } from "@/components/HeroVideo";

export default function Home() {
  return (
    <main className="pb-48">
    <Appbar></Appbar>
    <Hero></Hero>
    <HeroVideo></HeroVideo>
    </main>
  )
}
