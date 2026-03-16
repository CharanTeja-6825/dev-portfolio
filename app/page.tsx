import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectedWorks from "@/components/SelectedWorks";
import TechArsenal from "@/components/TechArsenal";
import PixelsAtPlay from "@/components/PixelsAtPlay";

export default function Home() {
  return (
    <main style={{ background: "#030303", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <SelectedWorks />
      <TechArsenal />
      <PixelsAtPlay />
    </main>
  );
}
