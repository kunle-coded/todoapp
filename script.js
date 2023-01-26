"use strict";

//Selections
const pageBody = document.body;
const mainContainer = document.querySelector(".main-container");
const moonIcon = document.querySelector(".moon");
const sunIcon = document.querySelector(".sun");
const gitHubDark = document.querySelector(".fa-github");
const sectionMain = document.querySelector(".summary-section");
const sidebar = document.querySelector(".sidebar");
const taskItems = document.querySelectorAll(".task-item");
const nav = document.querySelector(".nav-link");
const createTask = document.querySelector(".task-button");
const addTask = document.querySelector(".button-add-task");
const taskList = document.querySelector(".task-list");
const taskItem = document.querySelector(".task-item");
const textTitle = document.getElementById("task-title");
const textArea = document.getElementById("task-input");
const labelButtons = document.querySelector(".task-buttons");
const prevButtons = document.querySelector(".prev");
const nextButtons = document.querySelector(".next");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
const completeLabel = document.querySelector(".completed-count");
const pendingLabel = document.querySelector(".pending-count");

//Variables
let check = false;
let taskCount = 0;
let completeTask = 0;
let pendingTask = 0;
let taskArray = [];

let localArray = [];
let newArr = [];
let storeTask;
let getTaskData;
let maxContent = 3;
let addCount = 0;

//Functions >>>>>>>>>>>>>>>>
//DarkMode Switch
const switchDarkMode = function () {
  pageBody.classList.add("dark");
  gitHubDark.classList.add("dark");
  moonIcon.style.visibility = "hidden";
  sunIcon.style.visibility = "visible";
  sectionMain.style.boxShadow = "none";
  modal.classList.add("dark");
  textTitle.classList.add("dark");
  textArea.classList.add("dark");
  prevButtons.classList.add("dark");
  nextButtons.classList.add("dark");
  sidebarItems.forEach(function (el) {
    el.style.boxShadow = "none";
  });
};

//LightMode Switch
const switchLightMode = function () {
  pageBody.classList.remove("dark");
  gitHubDark.classList.remove("dark");
  moonIcon.style.visibility = "visible";
  sunIcon.style.visibility = "hidden";
  sectionMain.style.boxShadow = "";
  modal.classList.remove("dark");
  textTitle.classList.remove("dark");
  textArea.classList.remove("dark");
  prevButtons.classList.remove("dark");
  nextButtons.classList.remove("dark");
  sidebarItems.forEach(function (el) {
    el.style.boxShadow = "";
  });
};

//Close modal
const closeModalWindow = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const markup = `<div class="task-item" id="taskID">
<input
  class="check-box"
  type="checkbox"
  name="task"
  id="task-1"
/>
<div>
  <label class="task-text">No task yet</label>
  <p class="task-desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque aliquam neque ipsam, id saepe nihil esse fugiat optio ut vitae.</p>
</div>
<div class="task-buttons hide">
  <button class="button-delete" type="reset">Delete</button>
  <button class="button-complete" type="reset">Complete</button>
</div>
</div>`;

const startMessage = `<div class="message">
<div class="smile">
  <i class="fa fa-smile fa-lg"></i>
</div>
<p>Start by creating a task!</p>
</div>`;

const insertHtml = function () {
  taskList.insertAdjacentHTML("afterbegin", markup);
  const taskDesc = document.querySelector(".task-desc");
  const titleLabel = document.querySelector(".task-text");
  titleLabel.textContent = textTitle.value;
  taskDesc.textContent = textArea.value;

  textTitle.value = "";
  textTitle.focus();
  textArea.value = "";
};

const insertMessage = function () {
  taskList.insertAdjacentHTML("afterbegin", startMessage);
};

const checkButton = function () {
  const checkBox = document.querySelector(".check-box");
  checkBox.addEventListener("change", function (e) {
    if (checkBox.checked) {
      checkBox
        .closest(".task-item")
        .querySelector(".task-buttons")
        .classList.remove("hide");

      checkBox.closest(".task-item").classList.add("selected");
    } else {
      checkBox
        .closest(".task-item")
        .querySelector(".task-buttons")
        .classList.add("hide");

      checkBox.closest(".task-item").classList.remove("selected");
    }
  });
};

const deleteButton = function () {
  const deleteBtn = document.querySelector(".button-delete");
  deleteBtn.addEventListener("click", function (e) {
    const item = deleteBtn.closest(".task-item");

    item.remove();
    taskCount--;
    pendingTask--;
    pendingTaskCount();
  });
};
const completeButton = function () {
  const completeBtn = document.querySelector(".button-complete");
  completeBtn.addEventListener("click", function (e) {
    const item = completeBtn.closest(".task-item");
    item.remove();
    completeTask++;

    completeLabel.textContent = completeTask;
    pendingTaskCount();
  });
};

const pendingTaskCount = function () {
  pendingTask = taskCount - completeTask;
  pendingLabel.textContent = pendingTask;
};

//////////////////
//Event Handling
moonIcon.addEventListener("click", function () {
  switchDarkMode();
});

sunIcon.addEventListener("click", function () {
  switchLightMode();
});

//Create task
createTask.addEventListener("click", function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

addTask.addEventListener("click", function (e) {
  e.preventDefault();

  taskCount++;
  pendingTaskCount();

  if (textTitle.value === "") {
    alert("Enter a task!");
    return;
  } else if (taskList.childNodes.length <= maxContent) {
    insertHtml();
    localStorage.setItem("tasks", document.getElementById("taskID").innerHTML);
    taskArray.push(taskList.firstChild);
  } else {
    taskList.lastChild.remove();
    insertHtml();
    localStorage.setItem("tasks", document.getElementById("taskID").innerHTML);
    taskArray.push(taskList.firstChild);
  }

  if (addCount < 1) {
    const displayMessage = document.querySelector(".message");
    displayMessage.remove();
  }
  addCount++;

  checkButton();
  deleteButton();
  completeButton();
});

localStorage.setItem("taskDataArr", JSON.stringify(taskArray));
let retrievedArray = JSON.parse(localStorage.getItem("taskDataArr"));

retrievedArray.forEach((el) => {
  //console.log(el);
});

closeModal.addEventListener("click", closeModalWindow);
overlay.addEventListener("click", closeModalWindow);
sidebar.addEventListener("click", closeModalWindow);

const init = function () {
  //Display message at 0 task
  if (taskCount <= 0) insertMessage();
};

init();
