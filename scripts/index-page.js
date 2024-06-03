import { BandSiteApi } from "./band-site-api.js";
const api = new BandSiteApi("fcb695a7-499c-4df9-a259-10354602d489");

// Function to create an element with a specified class
function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

//Function to convert timestap into MM/DD/YYYY
function dateConvert(timestamp) {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

// Function to create a display element for a given comment
function createDisplayElement(comment) {
  const displayEl = createElementWithClass("article", "display__article");

  //create and append avatar element
  const avatarEl = createElementWithClass("img", "display__avatar");
  displayEl.appendChild(avatarEl);

  // Create and comment content container
  const displayContentEl = createElementWithClass("div", "display__container");

  // Create and append name element
  const nameEl = document.createElement("h4");
  nameEl.innerText = comment.name;
  displayContentEl.appendChild(nameEl);

  //Create and append name element
  const dateEl = createElementWithClass("p", "display__date");
  dateEl.innerText = dateConvert(comment.timestamp);
  displayContentEl.appendChild(dateEl);

  //Create and append content element
  const contentEl = createElementWithClass("p", "display__content");
  contentEl.innerText = comment.comment;
  displayContentEl.appendChild(contentEl);

  //Append comment content container to display element
  displayEl.appendChild(displayContentEl);

  return displayEl;
}

// Function to create a separator element
function createSeparator() {
  const separatorEl = createElementWithClass("hr", "separator");
  return separatorEl;
}
//Function to display default comments
function displayComments(display) {
  const commentContainer = document.getElementById("displayId");

  // Add separator at the top of the section
  commentContainer.appendChild(createSeparator());

  for (let i = 0; i < display.length; i++) {
    const comment = display[i];
    const displayEl = createDisplayElement(comment);
    commentContainer.appendChild(displayEl);

    // Add separator between display articles
    if (i < display.length - 1) {
      commentContainer.appendChild(createSeparator());
    }
  }

  // Add separator at the bottom of the section
  commentContainer.appendChild(createSeparator());
}

//fetch comments from API
async function renderComments() {
  try {
    const comments = await api.getComments();
    console.log(comments);
    displayComments(comments);
  } catch (err) {
    console.error("Failed to load comments:", err);
  }
}

renderComments();

//Funtion to add a new comment using axios
async function addNewComment(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const content = form.comment.value;

  const newComment = {
    name: name,
    comment: content,
  };

  try {
    const response = await api.postComment(newComment);
    const addedComment = response;
    const displayEl = createDisplayElement(addedComment);
    const commentContainer = document.getElementById("displayId");
    const separatorEl = createSeparator();
    commentContainer.insertBefore(separatorEl, commentContainer.firstChild);
    commentContainer.insertBefore(displayEl, separatorEl.nextSibling);
    form.reset();
  } catch (err) {
    console.error("Fail to post comment:", err);
  }
}

//displayComments(display);
//DisplayComments();

const newCommentForm = document.getElementById("comment__form");
newCommentForm.addEventListener("submit", addNewComment);

//Check the current url and set active stste for nav element
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav__element a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html"; // Default to "index.html" if path is empty

  navLinks.forEach((link) => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("active");
    }
  });
});
