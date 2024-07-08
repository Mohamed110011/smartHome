import React, { Fragment, useState } from "react";

const InputMaison = ({ setMaisonsChange }) => {
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);

      const body = { description, address };
      const response = await fetch("http://localhost:5000/dashboard/maisons", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setMaisonsChange(true); // Notify parent component of change
      setDescription(""); // Clear the description field
      setAddress(""); // Clear the address field
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Input Maison</h1>
      <form className="d-flex flex-column" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add description"
          className="form-control my-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="add address"
          className="form-control my-2"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button className="btn btn-success mt-2">Add</button>
      </form>
    </Fragment>
  );
};

export default InputMaison;
