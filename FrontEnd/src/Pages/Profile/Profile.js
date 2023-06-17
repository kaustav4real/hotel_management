import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Profile.css";

function Profile(props) {
  const [userData, setUserData] = useState([]);
  const [messageAfterDeletion, setMessageAfterDeletion] = useState(" ");

  const getUserData = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/hostedPropertyImages`;
      const { data } = await axios.get(url, { withCredentials: true });
      setUserData(data.finalResult);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = (event) => {
    const imageName = event.target.id;
    const imageData = JSON.stringify({ imageName });
    console.log(imageData);
    axios
      .post(`${process.env.REACT_APP_API_URL}/deletePropertyImages`, {
        imageData,
      })
      .then((response) => {
        setMessageAfterDeletion(response.message);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="mainProfileContainer">
      <div className="flex p-4 align-middle">
        <img
          className="h-10 w-10 rounded-full"
          src={props.imageSource}
          alt="profile"
        />
        <h5 className="text-2xl pt-1 pl-3">{props.name}</h5>
      </div>
      <div>
        <p className="profileEmail">{props.email}</p>
      </div>
      <div className="pl-4 pr-4">
        <hr />
      </div>
      <div className="">
        <Link to="/hostSignUp">
          <h5 className="text-xl pt-1 pl-3">Host your gym</h5>
        </Link>
      </div>
      <div>
        {userData.map((p) => {
          return (
            <div key={p.imageurl}>
              <img
                src={`${process.env.REACT_APP_API_URL}/public/files/${p.imageurl}`}
                alt="gym-images"
              />
              <button
                className="imageDelete"
                id={p.imageurl}
                onClick={(e) => deleteImage(e)}
              >
                DELETE
              </button>
            </div>
          );
        })}
      </div>
      <div className="emptyBottomDiv" />
      <p>{messageAfterDeletion}</p>
    </div>
  );
}

export default Profile;
