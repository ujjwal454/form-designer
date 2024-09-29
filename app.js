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

function syncJson() {
  const formElements = document.querySelectorAll(".form-element");
  const newOrder = Array.from(formElements).map((el) => el.id);

  sampleJson = newOrder.map((id) => sampleJson.find((item) => item.id === id));
}

function getDragAfterElement(y) {
  const draggableNodeList = document.querySelectorAll(
    ".form-element:not(.dragging)"
  );
  const draggable = Array.from(draggableNodeList);

  let closestElement = null;
  let clossestOffset = Number.NEGATIVE_INFINITY;

  draggable.forEach((child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > clossestOffset) {
      clossestOffset = offset;
      closestElement = child;
    }
  });

  return closestElement;
}

function handleDragAndDrop(element) {
  element.addEventListener("dragstart", () => {
    element.classList.add("dragging");
  });
  element.addEventListener("dragend", () => {
    element.classList.remove("dragging");
  });
}

function generateUniqueId() {
  const randomNum = Math.random().toString().substring(4, 8);
  return `${new Date().getTime()}-${randomNum}`;
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
  formElement.draggable = "true";
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
    sampleJson = sampleJson.filter((item) => item.id !== inputElemnentData.id);
    formElement.remove();
  });
  handleDragAndDrop(formElement);
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
  formElement.draggable = "true";

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
  handleDragAndDrop(formElement);
  return formElement;
}

function generateTextarea(textAreaData) {
  const formElement = document.createElement("div");
  formElement.classList.add("form-element");
  formElement.id = textAreaData.id;
  formElement.draggable = "true";

  formElement.innerHTML = `
            <div class="form-header">
              <p>${textAreaData.label}</p>
              <img src="./assets/delete.svg" alt="delete-btn" width="15px"  class='textarea-delete-btn'/>
            </div>
            <div class="input-wrapper">
              <textarea  rows="5" class="input" placeholder="${textAreaData.placeholder}"></textarea>
            </div>
          </div>
        `;

  const deleteButton = formElement.querySelector(".textarea-delete-btn");
  deleteButton.addEventListener("click", () => {
    formElement.remove();
    sampleJson = sampleJson.filter((item) => item.id !== textAreaData.id);
  });
  handleDragAndDrop(formElement);
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
  const inputData = { ...defaults.input, id: generateUniqueId() };
  const element = generateInput(inputData);
  appendChildFormContainer(element);
  sampleJson.push(inputData);
});

addSelectBtn.addEventListener("click", () => {
  let selectData = { ...defaults.select, id: generateUniqueId() };
  const element = generateSelect(selectData);
  appendChildFormContainer(element);
  sampleJson.push(selectData);
});

addTextareaBtn.addEventListener("click", () => {
  const textareaData = { ...defaults.textArea, id: generateUniqueId() };
  const element = generateTextarea(textareaData);
  appendChildFormContainer(element);
  sampleJson.push(textareaData);
});

saveBtn.addEventListener("click", () => {
  console.log("::::::JSON saved::::::::::");
  console.log(sampleJson);
});

formContainerDiv.addEventListener("dragover", (e) => {
  e.preventDefault();
  const closestElement = getDragAfterElement(e.clientY);
  const draggingElement = document.querySelector(".dragging");

  if (!formContainerDiv.contains(draggingElement)) {
    return;
  }

  if (closestElement === null) {
    formContainerDiv.appendChild(draggingElement);
  } else {
    formContainerDiv.insertBefore(draggingElement, closestElement);
  }

  syncJson();
});
