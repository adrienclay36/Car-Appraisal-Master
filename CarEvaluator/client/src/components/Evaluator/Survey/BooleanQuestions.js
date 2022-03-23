import React, { useContext, useState, useEffect } from "react";
import styles from "./BooleanQuestions.module.css";
import { Switch } from "@mantine/core";
import { SurveyContext } from "../../../store/SurveyStore";

const BooleanQuestions = () => {
  const surveyContext = useContext(SurveyContext);
  const [checkedValues, setCheckedValues] = useState({
    Bluetooth: false,
    "Backup Camera": false,
    Infotainment: false,
    Screen: false,
    Navigation: false,
    "Power Seat Controls": false,
    "Rear Air Vents": false,
    "Bed Liner": false,
    "Tow Hitch": false,
    "Heated Seats": false,
    "Hands Free Calling": false,
  });





  return (
    <div
      className={`w-11/12 lg:w-4/6 md:w-4/6 bg-gray-100 border-2 rounded-md shadow-md p-10 ${styles.slideIn}`}
    >
      <p className="text-xl font-bold mb-6">Does your car have:</p>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-4 w-full lg:w-4/6 md:w-4/6 mx-auto">
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues.Bluetooth}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                Bluetooth: e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Bluetooth</p>
        </div>

        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues['Hands Free Calling']}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                'Hands Free Calling': e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Hands Free Calling</p>
        </div>

        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues["Backup Camera"]}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                "Backup Camera": e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Backup Camera</p>
        </div>
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues.Infotainment}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                Infotainment: e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Infotainment (video/audio functionality)</p>
        </div>
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues.Screen}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                Screen: e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>A Screen built into the dash</p>
        </div>
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues.Navigation}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                Navigation: e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Onboard navigation</p>
        </div>
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues["Power Seat Controls"]}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                "Power Seat Controls": e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Electronic Seat Controls</p>
        </div>
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues["Heated Seats"]}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                "Heated Seats": e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Heated Seats</p>
        </div>
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues["Rear Air Vents"]}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                "Rear Air Vents": e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Rear Air Vents</p>
        </div>
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues["Bed Liner"]}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                "Bed Liner": e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Bed Liner (Trucks Only)</p>
        </div>
        <div className="flex flex-1 flex-row-reverse lg:flex-row md:flex-row justify-between lg:justify-start md:justify-start items-center mb-4">
          <Switch
            value={checkedValues["Tow Hitch"]}
            onChange={(e) =>
              setCheckedValues({
                ...checkedValues,
                "Tow Hitch": e.currentTarget.checked,
              })
            }
            className="mr-4"
          />
          <p>Tow Hitch (Trucks Only)</p>
        </div>
      </div>

      <div className="flex flex-1 w-full justify-between mt-8">
        <button
          onClick={surveyContext.prevQuestion}
          className={`text-center text-black bg-white w-11/12 lg:w-2/6 md:w-2/6 uppercase border-2 p-4 border-r-8 hover:text-slate-500 hover:bg-slate-100`}
        >
          Go Back
        </button>
        <button
        onClick={() => surveyContext.appendBooleans(checkedValues)}
          className={`text-center text-black bg-white w-11/12 lg:w-2/6 md:w-2/6 uppercase border-2 p-4 border-r-8 hover:text-slate-500 hover:bg-slate-100`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BooleanQuestions;
