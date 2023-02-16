import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Form.css";

export const MsgGeneratorForm = ({ getMsg }) => {
  //
  const [formType, setFormType] = useState(0);
  useEffect(() => {}, [formType]);

  const [text, setText] = useState({ text: "" });
  const updateTextField = ({ target }) => {
    setText((prev) => ({
      ...prev,
      text: target.value,
    }));
  };

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

  /*
   event handlers
  */

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
    if (
      form.companyId !== "0" &&
      form.guestId !== "0" &&
      form.msgCategoryId !== "0"
    ) {
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
          getMsg(response.data.generateMsg);
          setForm({
            guestId: "0",
            companyId: "0",
            msgCategoryId: "0",
          });
        })
        .catch((err) => {
          console.log(`Error with post request: ${err}`);
        });
    } else {
      alert("All field must be complete in order to generate message!");
    }
  };

  const sendForm2 = () => {
    if (form.companyId !== "0" && form.guestId !== "0" && text.text !== "") {
      axios({
        method: "POST",
        url: "/api/form2",
        data: {
          companyId: form.companyId,
          guestId: form.guestId,
          text: text.text,
        },
      })
        .then((response) => {
          getMsg(response.data.msg);

          setForm({
            guestId: "0",
            companyId: "0",
            msgCategoryId: "0",
          });
          setText({ text: "" });
        })
        .catch((err) => {
          console.log(`Error with post request: ${err}`);
        });
    } else {
      alert("All field must be complete in order to generate message!");
    }
  };

  /*
    JSX for forms
  */

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
      <button
        onClick={() => {
          if (formType === 0) {
            setFormType(1);
          } else {
            setFormType(0);
          }
        }}
      >
        Switch Mode
      </button>
    </div>
  );

  const formSection2 = (
    <div className="form">
      <h2>Custom Guest Msg</h2>
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
      </div>
      <div>
        <p>
          Use the variable keys below to auto-populate guest and hotel
          information in your custom message output.{" "}
          <em>
            Note: variables are <strong>case-sensitive</strong>
          </em>
        </p>
        <p>firstName = Guest first name</p>
        <p>lastName = Guest last name</p>
        <p>company = Hotel Name</p>
        <p>roomNumber = Room number</p>
        <p>checkInDate = Date when guest check-in</p>
        <p>checkOutDate = Date when guest checkout</p>
      </div>
      <div className="text">
        <input
          value={text.text}
          onChange={updateTextField}
          type="text"
          placeholder="Enter custom message"
        />
      </div>
      <button
        onClick={() => {
          sendForm2();
        }}
      >
        Generate Msg
      </button>
      <button
        onClick={() => {
          if (formType === 0) {
            setFormType(1);
          } else {
            setFormType(0);
          }
        }}
      >
        Switch Mode
      </button>
    </div>
  );

  return guestList === null && companies === null && msgCategories === null ? (
    <div>Loading</div>
  ) : formType === 0 ? (
    formSection
  ) : (
    formSection2
  );
};
