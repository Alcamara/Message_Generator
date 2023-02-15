import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

export const MsgGeneratorForm = () => {
  //guest list and useEffect
  const [guestList, setGuestList] = useState(null);
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/guests",
    })
      .then((results) => {
        setGuestList(results.data.guests);
      })
      .catch((err) => {
        console.log(`Error with axios get: ${err.response.data}`);
      });
  }, []);

  // companies state and useEffect
  const [companies, setCompanies] = useState(null);
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/companies",
    })
      .then((results) => {
        setCompanies(results.data.companies);
      })
      .catch((err) => {
        console.log(`Error with axios get: ${err.response.data}`);
      });
  }, []);
  // msgCategories and useEffect
  const [msgCategories, setMsgCategories] = useState(null);
  useEffect(() => {
    axios({
      method: "GET",
      url: "/api/categories",
    })
      .then((results) => {
        setMsgCategories(results.data.categories);
      })
      .catch((err) => {
        console.log(`Error with axios get: ${err.response.data}`);
      });
  }, []);

  const [form, setForm] = useState({
    guestId: "0",
    companyId: "0",
    msgCategoryId: "0",
  });

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
        console.log(`Post send: ${response.status}`);
      })
      .catch((err) => {
        console.log(`Error with post request: ${err}`);
      });
  };

  const formSection = (
    <div className="form">
      <h2>Guest Msg Generator</h2>
      <div className="default">
        <div className="dropdown">
          <label>
            <p>Guest list</p>
            <select value={form.guestId} onChange={updateGuestId} name="guest">
              <option value="0">Select Guest</option>

              {guestList &&
                guestList.map(({ firstName, id, lastName }) => (
                  <option key={firstName + " " + lastName} value={id}>
                    {firstName + " " + lastName}
                  </option>
                ))}
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
              {companies &&
                companies.map(({ name, id }) => (
                  <option key={name} value={id}>
                    {name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div className="dropdown">
          <label>
            <p>Type of Msg</p>
            <select onChange={updateMsgId} value={form.msgCategoryId}>
              <option value="0"> Select Category</option>
              {msgCategories &&
                msgCategories.map(({ category, id }) => (
                  <option key={category} value={id}>
                    {category}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>
      <button
        onClick={() => {
          sendForm();
        }}
      >
        Generate Msg
      </button>
    </div>
  );

  return guestList == null && companies == null && msgCategories == null ? (
    <div>Loading</div>
  ) : (
    formSection
  );
};
