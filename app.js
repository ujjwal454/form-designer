/*                                           constants                           */

const showOPtionsClassName = "custom-select-options";

const hideElementClassName = "hidden";

const defaults = {
  input: {
    id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample placeholder",
  },
  select: {
    id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  },
  textArea: {
    id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
};

let sampleJson = [
  {
    id: "c0ac49c5-871e-4c72-a878-251de465e6b4",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample placeholder",
  },
  {
    id: "146e69c2-1630-4a27-9d0b-f09e463a66e4",
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  },
  {
    id: "45002ecf-85cf-4852-bc46-529f94a758f5",
    type: "input",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
  {
    id: "680cff8d-c7f9-40be-8767-e3d6ba420952",
    type: "textarea",
    label: "Sample Label",
    placeholder: "Sample Placeholder",
  },
];

/*                                     query selectors                    */

const addInputBtn = document.querySelector("#add-input");
const addSelectBtn = document.querySelector("#add-select");
const addTextareaBtn = document.querySelector("#add-textarea");
const formContainerDiv = document.querySelector(".form-container");

/*                         Utils                       */

function addToggleEventOnSelect(element) {
  const headerElement = element.querySelector(".custom-select-header");

  headerElement.addEventListener("click", (e) => {
    const optionsDiv = e.currentTarget.nextElementSibling;
    const optionDivclasses = Array.from(optionsDiv.classList);

    if (optionDivclasses.includes(showOPtionsClassName)) {
      optionsDiv.classList.add(hideElementClassName);
      optionsDiv.classList.remove(showOPtionsClassName);
    } else {
      optionsDiv.classList.add(showOPtionsClassName);
      optionsDiv.classList.remove(hideElementClassName);
    }
  });
}

function generateInput(inputElemnentData) {
  const formElement = document.createElement("div");
  formElement.classList.add("form-element");
  formElement.id = inputElemnentData.id;
  formElement.innerHTML = `
      <div class="form-header">
        <p>${inputElemnentData.label}</p>
        <img src="./assets/delete.svg" alt="delete-btn" width="15px" class="delete-btn" />
      </div>
      <div class="input-wrapper">
        <input type="text" class="input" placeholder="${inputElemnentData.placeholder}" />
      </div>`;

  const deleteButton = formElement.querySelector(".delete-btn");

  deleteButton.addEventListener("click", () => {
    formElement.remove();
  });

  return formElement;
}

function generateSelectOptions(selectOptions) {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("hidden");

  selectOptions.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("custom-select-option");
    optionElement.innerHTML = `
      <p>${option}</p>
      <img src="./assets/delete.svg" alt="delete-btn" width="10px" class="option-delete-btn" />
    `;

    const deleteOptionButton =
      optionElement.querySelector(".option-delete-btn");
    deleteOptionButton.addEventListener("click", () => {
      optionElement.remove();
    });

    optionsContainer.appendChild(optionElement);
  });

  return optionsContainer;
}

function generateSelect(selectElementData) {
  const formElement = document.createElement("div");
  formElement.classList.add("form-element");
  formElement.id = selectElementData.id;

  const options = generateSelectOptions(selectElementData.options);

  formElement.innerHTML = `
    <div class="form-header">
      <p>${selectElementData.label}</p>
      <img src="./assets/delete.svg" alt="delete-btn" width="10px" class="delete-btn" />
    </div>
    <div class="input-wrapper">
      <div class="custom-select">
        <div class="custom-select-header">
          <p>Sample Label</p>
          <img src="./assets/arrow-down.svg" alt="arrow-down-icon" width="10px" />
        </div>
      </div>
    </div>
  `;

  const customSelect = formElement.querySelector(".custom-select");
  customSelect.appendChild(options);

  const deleteButton = formElement.querySelector(".delete-btn");
  deleteButton.addEventListener("click", () => {
    formElement.remove();
  });

  addToggleEventOnSelect(customSelect);
  return formElement;
}

function generateTextarea(textAreaData) {
  const formElement = document.createElement("div");
  formElement.classList.add("form-element");
  formElement.id = textAreaData.id;

  formElement.innerHTML = `<div class="form-element">
            <div class="form-header">
              <p>${textAreaData.label}</p>
              <img src="./assets/delete.svg" alt="delete-btn" width="10px"  class='textarea-delete-btn'/>
            </div>
            <div class="input-wrapper">
              <textarea name="" id="" rows="5" class="input" ></textarea>
            </div>
          </div>
        </div>`;

  const deleteButton = formElement.querySelector(".textarea-delete-btn");
  deleteButton.addEventListener("click", () => {
    formElement.remove();
  });
  return formElement;
}

function renderElements(jsonData) {
  jsonData.forEach((data) => {
    let element;
    switch (data.type) {
      case "input":
        element = generateInput(data);
        break;
      case "select":
        element = generateSelect(data);
        break;
      case "textarea":
        element = generateTextarea(data);
        break;
    }
    formContainerDiv.appendChild(element);
  });
}

/*              Add default form elements   */

renderElements(sampleJson);
