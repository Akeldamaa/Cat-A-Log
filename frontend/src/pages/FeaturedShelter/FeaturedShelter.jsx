import Navbar from "../../components/layout/Navbar";
import "./FeaturedShelter.css";
import DonateToday from '../Assets/donate-today.jpg'
import Footer from "../../components/layout/Footer";
import Banner from "../../components/layout/Header";

export default function FeaturedShelter() {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <Banner />
        <div className="featured-section">
          <div className="why-donate">
            <img
              className="donateToday"
              src={DonateToday}
              alt=""
            />
            <h2>Donate to a shelter!</h2>

            <p className="content-p">
              Donating to animal shelters is a powerful way to make a positive impact on the lives
              of countless animals in need. Your contribution helps provide essential resources such
              as food, medical care, and shelter, which are crucial for the well-being of abandoned,
              neglected, or abused animals. Beyond meeting immediate needs, donations support programs
              that promote adoption, spay/neuter services, and education about responsible pet ownership.
              By giving to animal shelters, you're not only improving the lives of individual animals but
              also contributing to the broader effort of creating a more compassionate and humane community for all creatures.


            </p>
            <p className="content-p">
              The Purgrammers want to promote a shelter to you every week. Our goal is to help shelters accross the world
              and animals in need. If you can donate, it'd be greatly appreciated. If you'd much rather
              support a local shelter, we reccomend looking them up and finding out how you can help support their efforts!
            </p>
          </div>
          <div>
            <h2>
              This Week's Featured Shelter:
            </h2>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
