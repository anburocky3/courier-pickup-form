import JustValidate from "just-validate";

const formEl = document.getElementById("courier-request-form");

const localStorageKey = "courierData";

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
    localStorage.setItem(localStorageKey, JSON.stringify(existingCourierArray));
  } else {
    newCourierData.push(formValueObj);

    localStorage.setItem(localStorageKey, JSON.stringify(newCourierData));
  }

  alert("Courier Request submitted successfully!");
  formEl.reset();
});

function getAllCourierDatas() {
  // Get all stored courier datas which are available in localStorage
  const courierData = localStorage.getItem(localStorageKey);

  const courierDataArr = JSON.parse(courierData);

  if (courierDataArr) {
    //   write those values into the table ui.
    const tableEl = document.querySelector("#courierDataTable");

    const finalData = courierDataArr
      .map((courierData) => {
        return `
    <tr>
      <td class="px-2 py-1 border">${courierData.name}</td>
      <td class="px-2 py-1 border">${courierData.mobile}</td>
      <td class="px-2 py-1 border">${courierData["pickup-date"]}</td>
      <td class="px-2 py-1 border">${courierData["pickup-area"]}</td>
      <td class="px-2 py-1 border">
          <button
          type="button"
          class="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm">
          Delete
      </button>
      </td>
    </tr>
    `;
      })
      .join(" ");

    console.log(finalData);

    tableEl.innerHTML += finalData;
    //   console.log(courierDataArr);

    // display the UI with those datas.
  } else {
    console.log("No value available on localStorage");
  }
}

getAllCourierDatas();
