import Benefits from "./components/Benefits";
import CallToAction from "./components/CallToAction";
import FeaturesShowcase from "./components/FeaturesShowcase";
import Footer from "./components/Footer";
import GovernmentBenefits from "./components/GovernmentBenefits";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Implementation from "./components/Implementation";
import POSIntegration from "./components/POSIntegration";

function LandingPage() {
  return (
    <div>
      <Hero />
      <Benefits />
      <HowItWorks />
      <GovernmentBenefits />
      <POSIntegration />
      <FeaturesShowcase />
      <Implementation />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default LandingPage;
