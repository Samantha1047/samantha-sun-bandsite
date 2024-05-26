//array to hold current display comments
const display = [
    {
        name:"Victor Pinto",
        avatar: {},
        date:"11/02/2023",
        content: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
    },

    {
        name:"Christina Cabrera",
        avatar: {},
        date:"10/28/2023",
        content: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
    },

    {
        name:"Isaac Tadesse",
        avatar: {},
        date:"10/20/2023",
        content:"I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
    }
]

// Function to create an element with a specified class
function createElementWithClass(tag, className) {
    const el = document.createElement(tag);
    el.classList.add(className);
    return el;
  }

// Function to create a display element for a given comment
function createDisplayElement(comment) {
    const displayEl = createElementWithClass("article", "display");

    //create and append avatar element
    const avatarEl = createElementWithClass("img", "display__avatar");
    displayEl.appendChild(avatarEl);

    // Create and comment content container
    const displayContentEl = createElementWithClass("div", "display__content");

    // Create and append name element
    const nameEl = document.createElement("h4");
    nameEl.innerText = comment.name;
    displayContentEl.appendChild(nameEl);

    //Create and append name element
    const dateEl = createElementWithClass("p", "display__date");
    dateEl.innerText = comment.date;
    displayContentEl.appendChild(dateEl);

    //Create and append content element
    const contentEl = createElementWithClass("p", "display__content");
    contentEl.innerText = comment.content;
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
function displayComments(display){
    const commentContainer = document.getElementById("displayId");

     // Add separator at the top of the section
    commentContainer.appendChild(createSeparator());

    for (let i = 0; i < display.length; i++){
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

//Function to get current date
function currentDate(){
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

//Function to add a new comment
function addNewComment(e){
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    //const avatar = form.avatar.value;
    //const date = form.date.value;
    const content = form.comment.value;

    //Create a new comment content
    const newComment = {
        name:name,
        avatar:createElementWithClass("img", "display__avatar"),
        date:currentDate(),
        content:content,
    }

    //create and append new comment inside the current display
    const displayEl = createDisplayElement(newComment);
    const commentContainer = document.getElementById("displayId");
    commentContainer.appendChild(displayEl);
    // Add separator at the bottom of the section
    commentContainer.appendChild(createSeparator());

    form.reset();
}


displayComments(display);

const newCommentForm = document.getElementById("comment__form");
newCommentForm.addEventListener("submit",addNewComment);
