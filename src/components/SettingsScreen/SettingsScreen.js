import "./SettingsScreen.css";
import { useState, useContext } from "react";

function SettingsScreen() {
  const [checked, setChecked] = useState([]);
  const checkList = ["Location", "Instruments", "Price Range", "Styles", "Online", "In Person"];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  var isChecked = (item) => (checked.includes(item) ? "checked-item" : "not-checked-item");

  return (
    <div className="settings">
      <div className="checkList">
        <div className="title mb-5">Match Settings (select by):</div>
        <div className="list-container mt-4">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3">Confirm</button>
    </div>
  );
}

export default SettingsScreen;
