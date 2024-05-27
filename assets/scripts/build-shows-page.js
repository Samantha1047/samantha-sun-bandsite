//Array of current show data
const showData = [
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
];

let keysAdded = false;

// Function to create an element with a specified class
function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.classList.add(className);
  return el;
}

/* //get the viewport width in realtime
window.addEventListener("resize", function () {
  const viewportWidth = window.innerWidth;
  return viewportWidth;
}); */

//function to create a show detail with a given show info
function createShowEl(show) {
  const viewportWidth = window.innerWidth;

  if (viewportWidth < 320) {
    const showEl = createElementWithClass("article", "show__El");
    //create a container for data without separate
    const showDataContainer = createElementWithClass("div", "show__container");

    // Create and append date element
    const dateTitle = createElementWithClass("h6", "show__key");
    dateTitle.innerText = "DATE";
    showDataContainer.appendChild(dateTitle);

    const dateEl = createElementWithClass("p", "show__date");
    dateEl.innerText = show.date;
    showDataContainer.appendChild(dateEl);

    // Create and append venue element
    const venueTitle = createElementWithClass("h6", "show__key");
    venueTitle.innerText = "VENUE";
    showDataContainer.appendChild(venueTitle);

    const venueEl = document.createElement("p");
    venueEl.innerText = show.venue;
    showDataContainer.appendChild(venueEl);

    // Create and append location element
    const locationTitle = createElementWithClass("h6", "show__key");
    locationTitle.innerText = "LOCATION";
    showDataContainer.appendChild(locationTitle);

    const locationEl = document.createElement("p");
    locationEl.innerText = show.location;
    showDataContainer.appendChild(locationEl);

    // Create and append button element
    const buttonEl = createElementWithClass("button", "show__button");
    buttonEl.innerText = show.button.text;
    buttonEl.type = "submit";
    showDataContainer.appendChild(buttonEl);

    //append showDataContainer to parent
    showEl.appendChild(showDataContainer);

    return showEl;
  } else {
    if (!keysAdded) {
      const table = createElementWithClass("table", "show__table");
      //create all the keys title
      const tableRow = document.createElement("tr");

      const dateTitle = createElementWithClass("th", "show__key");
      dateTitle.innerText = "DATE";
      tableRow.appendChild(dateTitle);

      const venueTitle = createElementWithClass("th", "show__key");
      venueTitle.innerText = "VENUE";
      tableRow.appendChild(venueTitle);

      const locationTitle = createElementWithClass("th", "show__key");
      locationTitle.innerText = "LOCATION";
      tableRow.appendChild(locationTitle);

      let showClass = document.getElementById("showId");

      table.appendChild(tableRow);
      showClass.appendChild(table);

      keysAdded = true;
    }

    const tableRow1 = document.createElement("tr");
    // Create and append date element
    const dateEl = createElementWithClass("td", "show__date");
    dateEl.innerText = show.date;
    tableRow1.appendChild(dateEl);

    // Create and append venue element
    const venueEl = document.createElement("td");
    venueEl.innerText = show.venue;
    tableRow1.appendChild(venueEl);

    // Create and append location element
    const locationEl = document.createElement("td");
    locationEl.innerText = show.location;
    tableRow1.appendChild(locationEl);

    // Create and append button element
    const tdEl = createElementWithClass("td", "show__last-row");
    const buttonEl = createElementWithClass("button", "show__button");
    buttonEl.innerText = show.button.text;
    buttonEl.type = "submit";
    tdEl.appendChild(buttonEl);
    tableRow1.appendChild(tdEl);

    //append showDataContainer to parent
    const table = document.querySelector(".show__table");
    table.appendChild(tableRow1);

    return table;
  }
}

// Function to create a separator element
function createSeparator() {
  const separatorEl = createElementWithClass("hr", "separator");
  return separatorEl;
}

//function to display show data
function displayShow(shows) {
  const showContainer = document.getElementById("showId");
  const viewportWidth = window.innerWidth;

  if (viewportWidth < 320) {
    for (let i = 0; i < shows.length; i++) {
      const show = shows[i];
      const showEl = createShowEl(show);
      showContainer.appendChild(showEl);

      // Add separator between display articles
      if (i < shows.length) {
        showContainer.appendChild(createSeparator());
      }
    }
  } else {
    for (let i = 0; i < shows.length; i++) {
      const show = shows[i];
      const showEl = createShowEl(show);
      showContainer.appendChild(showEl);
    }
  }
}

displayShow(showData);
