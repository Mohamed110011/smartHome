import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Listdevice from "../devicelist/Listdevice";

const InputDeviceList = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [values, setValues] = useState("");
  const [mode, setMode] = useState("");
  const [devices, setDevices] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { maison_id } = useParams();

  const fetchDevices = async () => {
    try {
      const response = await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", token: localStorage.token }
      });
      const jsonData = await response.json();
      setDevices(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [refresh]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, type, status, values, mode };
      await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });

      setRefresh((prev) => !prev);
      setName("");
      setType("");
      setStatus("");
      setValues("");
      setMode("");
    } catch (err) {
      console.error(err.message);
    }
  };

  const shouldHideValuesAndMode = () => {
    return type === "lamp"  || type === "Washing Machine" || type === "Refrigerator" || type === "Router" || type === "Television" || type === "Music System" || type === "Camera"  ;


  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Input Device</h1>
      <form className="d-flex flex-column" onSubmit={onSubmitForm}>
        <label htmlFor="name">Device Name</label>
        <input
          type="text"
          placeholder="add name"
          className="form-control my-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="form-group my-2">
          <label htmlFor="type">Device Type</label>
          <select
            className="form-control"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select type</option>
            <option value="sensor">Sensor</option>
            <option value="lamp">Lamp</option>
            <option value="air_conditioner">Air Conditioner</option>
            <option value="camera">Camera</option>
            <option value="refrigerator">Refrigerator</option>
            <option value="router">Router</option>
            <option value="television">Television</option>
            <option value="music system">Music System</option>
            <option value="washing_machine">Washing Machine</option>
          </select>
        </div>
        <div className="form-group my-2">
          <label htmlFor="status">Status</label>
          <select
            className="form-control"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select status</option>
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>
        </div>
        {!shouldHideValuesAndMode() && (
          <div>
            <label htmlFor="values">Device Value</label>
            <input
              type="text"
              placeholder="add value"
              className="form-control my-2"
              value={values}
              onChange={(e) => setValues(e.target.value)}
            />
          </div>
        )}
        {!shouldHideValuesAndMode() && (
          <div>
            <label htmlFor="mode">Device Mode</label>
            <input
              type="text"
              placeholder="add mode"
              className="form-control my-2"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            />
          </div>
        )}
        <button className="btn btn-success mt-2">Add</button>
      </form>
      <Listdevice devices={devices} fetchDevices={fetchDevices} />
    </Fragment>
  );
};

export default InputDeviceList;
