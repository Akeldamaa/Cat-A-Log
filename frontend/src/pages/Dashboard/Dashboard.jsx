import "./Dashboard.css";
import Welcome from "./components/Welcome/Welcome";
import Upload from "./components/Upload/Upload";
import Analysis from "./components/Analysis/Analysis";
import Customization from "./components/Customization/Customization";
import NftMinting from "./components/NftMinting/NftMinting";
import TestApi from "../../components/TestApi";
import DataInputForm from "./components/DataInputForm/DataInputForm";
import ResponsiveSidebar from "../../components/layout/ResponsiveSidebar";

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <ResponsiveSidebar />
      <div className="content">
        {/* <TestApi /> */}
        <Welcome />
        <Upload />
        {/* <DataInputForm /> */}
        <Analysis />
        <Customization />
        <NftMinting />
      </div>
    </div>
  );
};

export default DashBoard;
