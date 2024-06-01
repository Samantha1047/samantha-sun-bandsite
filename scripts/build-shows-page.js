//Array of current show data
/* const showData = [
  {
    date: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
    button: {
      text: "BUY TICKETS",
      link: "",
    },
  },

  {
    date: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
    button: {
      text: "BUY TICKETS",
      link: "",
    },
  },

  {
    date: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA",
    button: {
      text: "BUY TICKETS",
      link: "",
    },
  },

  {
    date: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
    button: {
      text: "BUY TICKETS",
      link: "",
    },
  },

  {
    date: "Fri Nov 29 2024",
    venue: "Moscow Center",
    location: "San Francisco, CA",
    button: {
      text: "BUY TICKETS",
      link: "",
    },
  },

  {
    date: "Wed Dec 18 2024",
    venue: "Press Club",
    location: "San Francisco, CA",
    button: {
      text: "BUY TICKETS",
      link: "",
    },
  },
]; */

import { BandSiteApi } from "./band-site-api.js";
const api = new BandSiteApi("fcb695a7-499c-4df9-a259-10354602d489");

// Function to create an element with a specified class
function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

//Function to convert timestap into "Wed Dec 18 2024" format
function dateConvert(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

//function to create a show detail with a given show info
function createShowEl(show) {
  const showEl = createElementWithClass("article", "show__El");

  //create a container for data without separate
  const showDataContainer = createElementWithClass("div", "show__container");

  // Create and append date element
  const dateContainter = createElementWithClass("div", "show__El-container");
  const dateTitle = createElementWithClass("h6", "show__key");
  dateTitle.innerText = "DATE";
  dateContainter.appendChild(dateTitle);

  const dateEl = createElementWithClass("p", "show__date");
  dateEl.innerText = dateConvert(show.date);
  dateContainter.appendChild(dateEl);
  showDataContainer.appendChild(dateContainter);

  // Create and append venue element
  const venueContainter = createElementWithClass("div", "show__El-container");
  const venueTitle = createElementWithClass("h6", "show__key");
  venueTitle.innerText = "VENUE";
  venueContainter.appendChild(venueTitle);

  const venueEl = document.createElement("p");
  venueEl.innerText = show.place;
  venueContainter.appendChild(venueEl);
  showDataContainer.appendChild(venueContainter);

  // Create and append location element
  const locationContainter = createElementWithClass("div", "show__El-container");
  const locationTitle = createElementWithClass("h6", "show__key");
  locationTitle.innerText = "LOCATION";
  locationContainter.appendChild(locationTitle);

  const locationEl = document.createElement("p");
  locationEl.innerText = show.location;
  locationContainter.appendChild(locationEl);
  showDataContainer.appendChild(locationContainter);

  // Create and append button element
  const buttonEl = createElementWithClass("button", "show__button");
  buttonEl.innerText = "BUY TICKETS";
  buttonEl.type = "submit";
  showDataContainer.appendChild(buttonEl);

  //append showDataContainer to parent
  showEl.appendChild(showDataContainer);

  return showEl;
}

// Function to create a separator element
function createSeparator() {
  const separatorEl = createElementWithClass("hr", "separator");
  return separatorEl;
}

//function to display show data
function displayShow(shows) {
  const showContainer = document.getElementById("showId");

  for (let i = 0; i < shows.length; i++) {
    const show = shows[i];
    const showEl = createShowEl(show);
    showContainer.appendChild(showEl);

    // Add separator between display articles
    if (i < shows.length) {
      showContainer.appendChild(createSeparator());
    }
  }
}

//fetch showdata from API
async function renderShows() {
  try {
    const showData = await api.getShows();
    console.log(showData);
    displayShow(showData);
  } catch (err) {
    console.error("Failed to load shows:", err);
  }
}

renderShows();
//displayShow(showData);

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav__element a");
  const currentPage = window.location.pathname.split("/").pop() || "show.html";

  navLinks.forEach((link) => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("active");
    }
  });
});
