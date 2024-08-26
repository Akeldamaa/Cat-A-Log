import "./FeaturedShelter.css";
import DonateToday from "../Assets/donate-today.jpg";
import Footer from "../../components/layout/Footer";
import Banner from "../../components/layout/Header";

export default function FeaturedShelter() {
  return (
    <div className="home-wrapper">
      <Banner />
      <div className="featuredShelter container">
        <div className="featuredShelter-section container">
          <div className="why-donate">
            <div className="">
              <h2>Donate to a shelter!</h2>

              <p className="content-p">
                Donating to animal shelters is a powerful way to make a positive
                impact on the lives of countless animals in need. Your
                contribution helps provide essential resources such as food,
                medical care, and shelter, which are crucial for the well-being
                of abandoned, neglected, or abused animals. Beyond meeting
                immediate needs, donations support programs that promote
                adoption, spay/neuter services, and education about responsible
                pet ownership. By giving to animal shelters, you're not only
                improving the lives of individual animals but also contributing
                to the broader effort of creating a more compassionate and
                humane community for all creatures.
              </p>
              <p className="content-p">
                The Purrgrammers want to promote a shelter to you every week.
                Our goal is to help shelters across the world and animals in
                need. If you can donate, it'd be greatly appreciated. If you'd
                much rather support a local shelter, we recommend looking them
                up and finding out how you can help support their efforts!
              </p>
            </div>
            <img className="donateToday" src={DonateToday} alt="" />
          </div>

          <div className="weekly-shelter">
            <h2>This Week's Featured Shelter:</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
