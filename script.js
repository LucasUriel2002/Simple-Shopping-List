// ---- SELECT ITEMS ----
const alert = document.querySelector(".alert");
const form = document.querySelector(".shopList-form");
const itemInput = document.getElementById("itemImput");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".shopList-container");
const list = document.querySelector(".shopList-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ---- EVENT LISTENERS ----
// submit form
form.addEventListener("submit", addItem);
// ---- FUNCTIONS ----
function addItem(e) {
  e.preventDefault();
  const value = itemImput.value;
  const id = new Date().getTime().toString();

  //better way to do!
  if (value && !editFlag) {
    const element = document.createElement("article");
    // add class
    element.classList.add("shopList-item");
    // add Id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = ` 
            <p class="title">${value}</p>
            <div class="btn-container">

                <button type="button" class="edit-btn btns">
                    <span class="material-symbols-outlined">edit_note</span>
                </button>

                <button type="button" class="delete-btn btns">
                    <span class="material-symbols-outlined">delete_forever</span>
                </button>

            </div>`;
    // append child
    list.appendChild(element);
    // display alert
    displayAlert("item added to the list", "success");
    // show container
    container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    console.log("editing");
  } else {
    displayAlert("you need to write something!", "danger");

    //Make the button not clickable
    submitBtn.disabled = true;
    submitBtn.style.cursor = "not-allowed";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.style.cursor = "default";
    }, 2900);
  }
}

function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);

  //remove alert opacity animation
  let opacity = 0;
  let animation = 1;

  let id = setInterval(() => {
    alert.style.opacity = opacity;
    opacity += 0.05;
  }, 1);

  setTimeout(() => {
    clearInterval(id);
    animation = 0;
  }, 200);

  setTimeout(() => {
    id = setInterval(() => {
      alert.style.opacity = opacity;
      opacity -= 0.02;
    }, 1);
  }, 2700);

  //remove alert text content and class
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
    clearInterval(id);
  }, 2900);
}

// set back to default
function setBackToDefault() {
  console.log("set back to default");
}

// ---- LOCAL STORAGE ----
function addToLocalStorage(id, value) {
  console.log("added to local storage");
}
// ---- SETUP ITEMS ----
