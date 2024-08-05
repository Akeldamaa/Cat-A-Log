import "./Dashboard.css";
import Sidebar from "../../components/layout/Sidebar";
import Welcome from "./components/Welcome/Welcome";
import Upload from "./components/Upload/Upload";
import Analysis from "./components/Analysis/Analysis";
import Customization from "./components/Customization/Customization";
import NftMinting from "./components/NftMinting/NftMinting";
import TestApi from "../../components/TestApi";
import DataInputForm from "./components/DataInputForm/DataInputForm";

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <TestApi />
        <Welcome />
        <Upload />
        <Analysis />
        <DataInputForm />
        <Customization />
        <NftMinting />
      </div>
    </div>
  );
};

export default DashBoard;
