import Footer from "../../components/layout/Footer";
import "./Home.css";
import Banner from "../../components/layout/Header";
import WelcomeSection from "./components/WelcomeSection";
import FeaturesSection from "./components/FeaturesSection";
import MissionSection from "./components/MissionSection";
import AboutUsSection from "./components/AboutUsSection";

export default function Home() {
  return (
    <div className="home-wrapper">
      <Banner />
      <div className="home-section container">
        <WelcomeSection />
        <MissionSection />
        <FeaturesSection />
        <AboutUsSection />
      </div>
      <Footer />
    </div>
  );
}
