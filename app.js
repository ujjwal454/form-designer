/*                                           constants                           */

const showOPtionsClassName = "custom-select-options";

const hideElementClassName = "hidden";

const defaults = {
  input: {
    id: generateUniqueId(),
    type: "input",
    label: "Sample Label",
    placeholder: "Sample placeholder",
  },
  select: {
    id: generateUniqueId(),
    type: "select",
    label: "Sample Label",
    options: ["Sample Option", "Sample Option", "Sample Option"],
  },
  textArea: {
    id: generateUniqueId(),
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
const saveBtn = document.querySelector("#save-btn");

/*                         Utils                       */

function generateUniqueId() {
  let timestamp = new Date().getTime();

  const randomNum = Math.random().toString(36);
  return `${timestamp}-${randomNum}`;
}

function appendChildFormContainer(element) {
  formContainerDiv.appendChild(element);
}

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
    sampleJson = sampleJson.filter((item) => item.id !== inputElemnentData.id);
  });

  return formElement;
}

function generateSelectOptions(selectOptions, parentId) {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("hidden");
  selectOptions.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("custom-select-option");
    const elementId = index + "_" + generateUniqueId();
    optionElement.id = elementId;
    optionElement.innerHTML = `
      <p>${option}</p>
      <img src="./assets/delete.svg" alt="delete-btn" width="15px" class="option-delete-btn" />
    `;

    const deleteOptionButton =
      optionElement.querySelector(".option-delete-btn");
    deleteOptionButton.addEventListener("click", () => {
      sampleJson.forEach((item, itemIndex) => {
        if (item.id === parentId) {
          sampleJson[itemIndex].options = sampleJson[itemIndex].options.filter(
            (optionItem, optionIndex) => optionIndex !== index
          );
        }
      });
      optionElement.remove();
    });

    optionsContainer.appendChild(optionElement);
  });

  return optionsContainer;
}

function generateSelect(selectElementData) {
  const formElement = document.createElement("div");
  formElement.classList.add("form-element");
  const elementId = selectElementData.id;
  formElement.id = elementId;

  const options = generateSelectOptions(selectElementData.options, elementId);

  formElement.innerHTML = `
    <div class="form-header">
      <p>${selectElementData.label}</p>
      <img src="./assets/delete.svg" alt="delete-btn" width="15px" class="delete-btn" />
    </div>
    <div class="input-wrapper">
      <div class="custom-select">
        <div class="custom-select-header">
          <p>Sample Label</p>
          <img src="./assets/arrow-down.svg" alt="arrow-down-icon" width="15px" />
        </div>
      </div>
    </div>
  `;

  const customSelect = formElement.querySelector(".custom-select");

  customSelect.appendChild(options);

  const addMoreBtn = document.createElement("button");
  addMoreBtn.classList.add("add-more-option-btn");
  addMoreBtn.classList.add("btn");
  addMoreBtn.classList.add("btn-save");
  addMoreBtn.textContent = "Add more";

  options.insertBefore(addMoreBtn, options.firstChild);

  const deleteButton = formElement.querySelector(".delete-btn");

  deleteButton.addEventListener("click", () => {
    formElement.remove();
    sampleJson = sampleJson.filter((item) => item.id !== selectElementData.id);
  });

  addMoreBtn.addEventListener("click", () => {
    let newOptionJson = defaults.select.options[0];

    sampleJson = sampleJson.map((item) => {
      if (item.id === selectElementData.id) {
        item = { ...item, options: [...item.options, newOptionJson] };
        return item;
      }
      return item;
    });

    let newOption = generateSelectOptions(
      [newOptionJson],
      elementId
    ).firstChild;
    options.appendChild(newOption);
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
              <img src="./assets/delete.svg" alt="delete-btn" width="15px"  class='textarea-delete-btn'/>
            </div>
            <div class="input-wrapper">
              <textarea name="" id="" rows="5" class="input" ></textarea>
            </div>
          </div>
        </div>`;

  const deleteButton = formElement.querySelector(".textarea-delete-btn");
  deleteButton.addEventListener("click", () => {
    formElement.remove();
    sampleJson = sampleJson.filter((item) => item.id !== textAreaData.id);
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
    appendChildFormContainer(element);
  });
}

/*              Add default form elements   */

renderElements(sampleJson);

/*      add events listners on add element button              */

addInputBtn.addEventListener("click", () => {
  const inputData = defaults.input;
  const element = generateInput(inputData);
  appendChildFormContainer(element);
  sampleJson.push(inputData);
});

addSelectBtn.addEventListener("click", () => {
  const selectData = defaults.select;
  const element = generateSelect(selectData);
  appendChildFormContainer(element);
  sampleJson.push(selectData);
});

addTextareaBtn.addEventListener("click", () => {
  const textareaData = defaults.textArea;
  const element = generateTextarea(textareaData);
  appendChildFormContainer(element);
  sampleJson.push(textareaData);
});

saveBtn.addEventListener("click", () => {
  console.log("::::::JSON saved::::::::::");
  console.log(sampleJson);
});
