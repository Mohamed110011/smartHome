import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Listdevice from "./Listdevice";

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
  }, [refresh]); // Appeler fetchDevices lorsque refresh change

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, type, status, values, mode };
      await fetch(`http://localhost:5000/dashboard/devices/${maison_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", token: localStorage.token },
        body: JSON.stringify(body)
      });

      setRefresh((prev) => !prev); // Inverser l'état de refresh pour déclencher useEffect
      setName("");
      setType("");
      setStatus("");
      setValues("");
      setMode("");
    } catch (err) {
      console.error(err.message);
    }
  };

  // Fonction pour déterminer si les champs add values et add mode doivent être masqués
  const shouldHideValuesAndMode = () => {
    return type === "lampe"; // Masquer si le type est "lampe"
  };
  

  return (
    <Fragment>
      <h1 className="text-center my-5">Input Device</h1>
      <form className="d-flex flex-column" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add name"
          className="form-control my-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="form-group my-2">
          {/* Type de périphérique */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              id="capteur"
              value="capteur"
              checked={type === "capteur"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="capteur">
              Capteur
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              id="lampe"
              value="lampe"
              checked={type === "lampe"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="lampe">
              Lampe
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              id="climatiseur"
              value="climatiseur"
              checked={type === "climatiseur"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="climatiseur">
              Climatiseur
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              id="caméra"
              value="caméra"
              checked={type === "caméra"}
              onChange={(e) => setType(e.target.value)}
            />
            <label className="form-check-label" htmlFor="caméra">
              Caméra
            </label>
          </div>
        </div>
        {/* Statut */}
        <div className="form-group my-2">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="true"
              value="true"
              checked={status === "true"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label className="form-check-label" htmlFor="true">
              True
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="status"
              id="false"
              value="false"
              checked={status === "false"}
              onChange={(e) => setStatus(e.target.value)}
            />
            <label className="form-check-label" htmlFor="false">
              False
            </label>
          </div>
        </div>
        {/* Champ values (masqué si type est lampe) */}
        {!shouldHideValuesAndMode() && (
          <input
            type="text"
            placeholder="add values"
            className="form-control my-2"
            value={values}
            onChange={(e) => setValues(e.target.value)}
          />
        )}
        {/* Champ mode (masqué si type est lampe) */}
        {!shouldHideValuesAndMode() && (
          <input
            type="text"
            placeholder="add mode"
            className="form-control my-2"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          />
        )}
        <button className="btn btn-success mt-2">Add</button>
      </form>
      <Listdevice devices={devices} fetchDevices={fetchDevices} />
    </Fragment>
  );
};

export default InputDeviceList;
