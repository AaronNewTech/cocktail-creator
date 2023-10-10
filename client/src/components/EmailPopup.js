import React, { useState, useEffect } from "react";
// import * as yup from "yup";
import { useFormik } from "formik";

function EmailPopup() {
  const [formErrors, setFormErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: async (values) => {
      const newEmail = {
        name: values.name,
        email: values.email,
      };
      // console.log(newEmail);
      const response = await fetch("/add_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmail),
      });
      if (response.ok) {

        formik.resetForm();
        setFormErrors([]);
      } else {
        const err = await response.json();
        setFormErrors(err.errors);
      }
    },
  });

  return (
    <div className="email-popup">
      <img
        src="/images/emailpopup/email-popup.png"
        id="email-popup-image"
        alt="Email Popup"
      />
      <img onClick={formik.handleSubmit}
        src="/images/emailpopup/email-popup-button.png"
        id="email-signup-button"
        alt="Email Signup Button"
      />
      <div id="add-email-container">
        <form className="add-email-form">
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Name"
          />

          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder="Email"
            rows={5}
          />
          {formErrors.length > 0
            ? formErrors.map((err, index) => (
                <p key={index} style={{ color: "red" }}>
                  {err}
                </p>
              ))
            : null}
          {/* <input type="submit" value="Add Email" /> */}
        </form>
      </div>
    </div>
  );
}

export default EmailPopup;
