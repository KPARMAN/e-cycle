import Header from "@/components/Header.jsx";
import Hero from "@/components/Hero.jsx";
import Streamline from "@/components/Streamline.jsx";
import Revolutionize from "@/components/Revolutionize.jsx";
import Features from "@/components/Features.jsx";
import Benefits from "@/components/Benefits.jsx";
import CustomerStories from "@/components/CustomerStories.jsx";
import CTA from "@/components/CTA.jsx";
import FAQ from "@/components/FAQ.jsx";
import Footer from "@/components/Footer.jsx";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Streamline />
        <Revolutionize />
        <Features />
        <Benefits />
        <CustomerStories />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
