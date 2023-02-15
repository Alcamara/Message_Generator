import { useState, useEffect } from "react";
import "./App.css";
import { MsgGeneratorForm } from "../MsgGeneratorForm/MsgGeneratorForm";
import { PreviewMsg } from "../PreviewMsg/PreviewMsg";

function App() {
  const [msg, setMsg] = useState({ msg: "Generate New Message Above" });
  useEffect(() => {}, [msg]);
  const getMsg = (newMsg) => {
    setMsg({ msg: newMsg });
  };
  return (
    <div className="App">
      <MsgGeneratorForm getMsg={getMsg} />
      <PreviewMsg msg={msg.msg} />
    </div>
  );
}

export default App;
