import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom"; 
import Listdevice from "./Listdevice";


const InputDeviceList = ({ setDevicesChange }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [values, setValues] = useState("");
  const [mode, setMode] = useState("");

  

  const { maison_id } = useParams();
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name, type, status, values, mode };
      const response = await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });

      setDevicesChange(true);
      setName("");
      setType("");
      setStatus("");
      setValues("");
      setMode("");
    } catch (err) {
      console.error(err.message);
    }
  }


  return (
    <Fragment>
      <h1 className="text-center my-5">Input Device</h1>
      <form className="d-flex flex-column" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add name"
          className="form-control my-2"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="add type"
          className="form-control my-2"
          value={type}
          onChange={e => setType(e.target.value)}
        />
        <input
          type="text"
          placeholder="add status"
          className="form-control my-2"
          value={status}
          onChange={e => setStatus(e.target.value)}
        />
        <input
          type="text"
          placeholder="add values"
          className="form-control my-2"
          value={values}
          onChange={e => setValues(e.target.value)}
        />
        <input
          type="text"
          placeholder="add mode"
          className="form-control my-2"
          value={mode}
          onChange={e => setMode(e.target.value)}
        />
        <button className="btn btn-success
        mt-2">Add</button>
      </form>
      <Listdevice/>
    </Fragment>
  );
}

export default InputDeviceList;
 