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
// clear items
clearBtn.addEventListener("click", clearItems);
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
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);
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
    //Make the button not clickable
    notClickable();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
  } else {
    displayAlert("you need to write something!", "danger");
    //Make the button not clickable
    notClickable();
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

// clear items
function clearItems() {
  const items = document.querySelectorAll(".shopList-item");
  if (items.length > 0) {
    items.forEach(function (item) {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("Empty list", "danger");
  setBackToDefault();
  // localStorage.removeItem('list');
}
// delete function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}

// edit function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  // set edit item
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // set form value
  itemInput.value = editElement.innerHTML;
  editFlag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

// set back to default
function setBackToDefault() {
  itemImput.value = "";
  editFlag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

//Make the button not clickable
function notClickable() {
  submitBtn.disabled = true;
  submitBtn.style.cursor = "not-allowed";

  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.style.cursor = "default";
  }, 2500);
}
// ---- LOCAL STORAGE ----
function addToLocalStorage(id, value) {
  const shopItem = {
    id: id,
    value: value,
  };
  let items = getLocalStorage();
  console.log(items);

  items.push(shopItem);
  localStorage.setItem("list", JSON.stringify(items));
  // console.log("added to local storage");
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();

  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value) {}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
// localStorage API
// setItem
// getItem
// removeItem
// save as string

// ---- SETUP ITEMS ----
