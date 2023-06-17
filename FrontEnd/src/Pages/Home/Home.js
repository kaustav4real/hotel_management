import React, { useState, useEffect } from "react";
import axios from "axios";

import Cards from "../../Components/Cards/Cards";

function HomePage() {
  const [dataRetrieved, setDataRetrieved] = useState([]);
  const [success, setSuccess] = useState(false);
  const getResults = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/`;
      const Data = await axios.get(url).then((fetchedData) => {
        return fetchedData.data;
      });
      console.log(Data);
      setSuccess(true);
      setDataRetrieved(Data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getResults();
  }, []);
  return (
    <div>
      <div className="">
        {dataRetrieved.map((p) => {
          return (
            <Cards
              key={p.owner_id}
              address={p.address}
              price={p.price}
              gym_name={p.gym_name}
            />
          );
        })}
      </div>
      {success ? <h1>Sucecss</h1> : <h1>Searching</h1>}
    </div>
  );
}

export default HomePage;
