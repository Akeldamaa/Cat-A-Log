import { useState } from "react";
import "./Dashboard.css";
import Welcome from "./components/Welcome/Welcome";
import Upload from "./components/Upload/Upload";
import Analysis from "./components/Analysis/Analysis";
// import Customization from "./components/Customization/Customization";
// import NftMinting from "./components/NftMinting/NftMinting";
// import DataInputForm from "./components/DataInputForm/DataInputForm";
import ResponsiveSidebar from "../../components/layout/ResponsiveSidebar";
import PastCards from "./components/PastCards/PastCards";
// import TestApi from "../../components/TestApi";

const DashBoard = () => {
  const [cardsData, setCardsData] = useState([]); // State to store the trading cards data

  // Function to handle the generated cards from the Upload component
  const handleCardsGenerated = (newCards) => {
    setCardsData(newCards);
  };

  return (
    <div className="dashboard-container">
      <ResponsiveSidebar />
      <div className="content">
        {/* <TestApi /> */}
        <Welcome />

        <Upload onCardsGenerated={handleCardsGenerated} />
        {/* <DataInputForm /> */}

        <Analysis cardsData={cardsData} />
        <PastCards />
        {/* <Customization /> */}
        {/* <NftMinting /> */}
      </div>
    </div>
  );
};

export default DashBoard;
