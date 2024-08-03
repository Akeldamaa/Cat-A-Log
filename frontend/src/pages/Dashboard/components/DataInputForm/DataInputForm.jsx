import { useState } from "react";
import { Input } from "../../../../components/forms/Input";
import "./DataInputForm.css";

function DataInputForm() {
  const [catData, setCatData] = useState({
    breed: "",
    characteristics: "",
    age: "",
    gender: "",
  });

  return (
    <div className="section data-input">
      <h2 className="section-title">Data Input</h2>
      <form className="data-input-form">
        <div className="form-group">
          <div className="form-control">
            <Input
              id="breed"
              type="text"
              placeholder="Enter breed"
              value={catData.breed}
              onChange={(e) =>
                setCatData({ ...catData, breed: e.target.value })
              }
              className="form-input"
              label={"Breed"}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <Input
              id="characteristics"
              type="text"
              placeholder="Enter characteristics"
              value={catData.characteristics}
              onChange={(e) =>
                setCatData({ ...catData, characteristics: e.target.value })
              }
              className="form-input"
              label={"Characteristics"}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <Input
              id="age"
              type="text"
              placeholder="Enter age"
              value={catData.age}
              onChange={(e) => setCatData({ ...catData, age: e.target.value })}
              className="form-input"
              label={"Age"}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-control">
            <Input
              id="gender"
              type="text"
              placeholder="Enter gender"
              value={catData.gender}
              onChange={(e) =>
                setCatData({ ...catData, gender: e.target.value })
              }
              className="form-input"
              label={"Gender"}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default DataInputForm;
