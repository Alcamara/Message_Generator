import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api",
    })
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(`Error with axios get: ${err.response.data}`);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>This is the beginning</p>
      </header>
    </div>
  );
}

export default App;
