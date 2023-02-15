import { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

export const MsgGeneratorForm = () => {
  const [guestList, setGuestList] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [msgCategories, setMsgCategories] = useState(null);

  const [form, setForm] = useState({
    guestId: "0",
    companyId: "0",
    msgCategoryId: "0",
  });

  useEffect(() => {
    console.log(form);
  }, []);

  const updateGuestId = (event) => {
    console.log(event.target.value);
    setForm((prev) => ({
      ...prev,
      guestId: event.target.value,
    }));
  };

  const updateCompanyId = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      companyId: target.value,
    }));
  };

  const updateMsgId = ({ target }) => {
    setForm((prev) => ({
      ...prev,
      msgCategoryId: target.value,
    }));
  };

  const sendForm = () => {
    axios({
      method: "POST",
      url: "/api/form",
      data: {
        companyId: form.companyId,
        guestId: form.guestId,
        msgCategoryId: form.msgCategoryId,
      },
    })
      .then((response) => {
        console.log(`Post send: ${form}`);
      })
      .catch((err) => {
        console.log(`Error with post request: ${err}`);
      });
  };

  return (
    <div className="form">
      <h2>Generate Msg</h2>
      <div className="default">
        <div className="dropdown">
          <label>
            <p>Guest list</p>
            <select value={form.guestId} onChange={updateGuestId} name="guest">
              <option value="0">Select Guest</option>
              <option value="1">Ryu</option>
              <option value="2">Ken</option>
              <option value="3">Luke</option>
              <option value="4">Ibuki</option>
            </select>
          </label>
        </div>
        <div className="dropdown">
          <label>
            <p>Compaines</p>
            <select
              onChange={updateCompanyId}
              value={form.companyId}
              name="companies"
            >
              <option value="0">Select Hotel</option>
              <option value="1">Hillton</option>
              <option value="2">Holiday Inn</option>
              <option value="3">Radisson</option>
            </select>
          </label>
        </div>
        <div className="dropdown">
          <label>
            <p>Type of Msg</p>
            <select onChange={updateMsgId} value={form.msgCategoryId}>
              <option value="0">Category</option>
              <option value="1">Welcome</option>
              <option value="2">Remainder</option>
              <option value="3">Thank You</option>
            </select>
          </label>
        </div>
      </div>
      <button
        onClick={() => {
          console.log(form);
          sendForm();
        }}
      >
        Generate Msg
      </button>
    </div>
  );
};
