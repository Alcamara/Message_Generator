import "./App.css";
import { MsgGeneratorForm } from "../MsgGeneratorForm/MsgGeneratorForm";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api",
    })
      .then((results) => {
        console.log(results.data);
      })
      .catch((err) => {
        console.log(`Error with axios get: ${err.response.data}`);
      });
  }, []);

  return (
    <div className="App">
      <MsgGeneratorForm />
    </div>
  );
}

export default App;
