const notifications = document.querySelector(".notifications"),
buttons = document.querySelectorAll(".buttons .btn");

// icon references: https://www.toptal.com/designers/htmlarrows/symbols/

const toastDetails = {
    timer: 5000,
    success: {
        icon: '&#10004;',
        title: 'Success',
        text: 'This is a success toast.',
    },
    error: {
        icon: '&#10008;',
        title: 'Error',
        text: 'This is an error toast.',
    },
    warning: {
        icon: '&#9888;',
        title: 'Warning',
        text: 'This is a warning toast.',
    },
    info: {
        icon: '&#8505;',
        title: 'Info',
        text: 'This is an information toast.',
    }
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const createToast = (id) => {
    // Getting the icon and text for the toast based on the id passed
    const { icon, title, text } = toastDetails[id];
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast ${id}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="column">
                         <i>${icon}</i>                     
                         <i>${title}</i>
                         <span>${text}</span>
                      </div>
                      <i onclick="removeToast(this.parentElement)">&#10006;</i>`;
    notifications.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

// Adding a click event listener to each button to create a toast when clicked
buttons.forEach(btn => {
    btn.addEventListener("click", () => createToast(btn.id));
});