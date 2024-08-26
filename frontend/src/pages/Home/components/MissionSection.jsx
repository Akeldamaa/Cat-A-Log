import { Link } from "react-router-dom";

export default function MissionSection() {
  return (
    <div className="mission-statement">
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
    </div>
  );
}
