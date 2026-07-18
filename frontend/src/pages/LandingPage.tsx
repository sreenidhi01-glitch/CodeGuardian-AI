import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Workflow from "../components/Workflow";
import DashboardPreview from "../components/DashboardPreview";
import WhyCodeGuardian from "../components/WhyCodeGuardian";
import Footer from "../components/Footer";
export default function LandingPage() {
  return (
    <div className="bg-slate-950 text-white">

      <Navbar />

      <Hero />

      <Features />

      <Workflow />
    <DashboardPreview />
    <WhyCodeGuardian />
        <Footer />
    </div>
  );
}