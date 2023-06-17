import React from "react";
import axios from "axios";

function TarinersHomePage(props) {
  function HandleFormSubmition(e) {
    e.preventDefault();
    let form = document.getElementById("multerForm");
    let formData = new FormData(form);
    formData.append("HOST_ID_VALUE", props.ownerID);
    axios.post(`${process.env.REACT_APP_API_URL}/api/uploadFile`, formData);
  }

  return (
    <React.Fragment>
      <h1>Form</h1>
      <form
        encType="multipart/form-data"
        onSubmit={HandleFormSubmition}
        id="multerForm"
      >
        <input type="file" name="myFile" required />
        <button type="submit">Form submit</button>
        <p>{props.email}</p>
      </form>
    </React.Fragment>
  );
}

export default TarinersHomePage;
