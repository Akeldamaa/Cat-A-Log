import { Link } from "react-router-dom";
import SavannahCat from "../../Assets/SavannahCat.jpg";
import DomesticCat from "../../Assets/DomesticCat.jpg";
import MinskinCat from "../../Assets/MinskinCat.jpg";

export default function MissionSection() {
  return (
    <div className="mission-section">
      <div>
        <h2>Our Mission</h2>
      </div>
      <div>
        <p>
          The <strong>Cat-A-Log</strong> app aims to provide a fun and engaging
          platform for cat enthusiasts to collect, trade, and learn about
          various cat breeds and their unique attributes. Beyond celebrating the
          diversity of feline breeds, we have dedicated a{" "}
          <Link to="/featured-shelter">page</Link> to supporting local animal
          shelters by promoting adoption and awareness. We aim to improve
          awareness while offering a fun Cat Trading Card app.
        </p>
      </div>
      <div className="cat-images">
        <div className="cat cat--1">
          <img src={DomesticCat} alt="domestic cat" />
        </div>
        <div className="cat cat--2">
          <img src={SavannahCat} alt="savannah cat" />
        </div>
        <div className="cat cat--3">
          <img src={MinskinCat} alt="minskin cat" />
        </div>
      </div>
    </div>
  );
}
