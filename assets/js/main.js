import JustValidate from "just-validate";

const formEl = document.getElementById("courier-request-form");

const validateForm = new JustValidate(formEl, {
  validateBeforeSubmitting: true,
});

validateForm.addField(
  "#name",
  [
    {
      rule: "required",
    },
    {
      rule: "minLength",
      value: 3,
    },
    {
      rule: "maxLength",
      value: 20,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#mobile-no",
  [
    {
      rule: "required",
    },
    {
      rule: "number",
    },
    {
      rule: "minLength",
      value: 10,
    },
    {
      rule: "maxLength",
      value: 10,
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#pickup-date",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.addField(
  "#pickup-area",
  [
    {
      rule: "required",
    },
  ],
  {
    errorLabelCssClass: ["form-error"],
  }
);

validateForm.onSuccess(() => {
  const formData = new FormData(formEl);

  const formValueObj = Object.fromEntries(formData.entries());

  const newCourierData = [];

  // Get existing localStorage value, if it's exist!
  const existingCourierData = localStorage.getItem("courierData");

  // Parse that string into Javascript value
  const existingCourierArray = JSON.parse(existingCourierData);

  if (existingCourierArray) {
    // Create a new array and push the existing localstorage value into new array.
    existingCourierArray.push(formValueObj);

    // push the new array (which has all the info to the localstorage)
    localStorage.setItem("courierData", JSON.stringify(existingCourierArray));
  } else {
    newCourierData.push(formValueObj);

    localStorage.setItem("courierData", JSON.stringify(newCourierData));
  }

  alert("Courier Request submitted successfully!");
  formEl.reset();
});
