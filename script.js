const addBookButton = document.querySelector(".add-book");
const modal = document.querySelector("dialog");
const closeButton = document.querySelector(".close-button");
const form = document.querySelector("form");


//Event Listener to Open and Close Modal
addBookButton.addEventListener("click", () => {
    modal.showModal();
})

closeButton.addEventListener("click", () => {
    modal.close();
})

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}


function addBookToLibrary(book) {
    myLibrary.push(book);
}


// Display Library Content
function displayBooks() {
    // Clear the contents before displaying
    const bookShelf = document.querySelector(".book-shelf");
    bookShelf.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <p>${book.title}</p>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <button class="${book.read ? "read" : "not-read"} toggle">
                ${book.read ? "Read" : "Not Read"}
            </button>
            <button class="remove">
                Remove
            </button>
        `;
        bookShelf.appendChild(bookDiv);

        //Event Listener for remove Button
        const removeBtn = bookDiv.querySelector(".remove");
        removeBtn.addEventListener("click", () => {
            myLibrary.pop(bookDiv);
            bookShelf.removeChild(bookDiv);
        });

        //Event Listener To Toggle Read Button
        const toggleReadBtn = bookDiv.querySelector(".toggle");
        toggleReadBtn.addEventListener("click", () => {
            //Toggle classes
            toggleReadBtn.classList.toggle("read");
            toggleReadBtn.classList.toggle("not-read");

            //Toggle display
            toggleReadBtn.textContent = toggleReadBtn.classList.contains("read") ? "Read" : "Not Read";
        }) 
    });
}

//Event Listener for Submission of Form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.querySelector("#title").value;
    const author = form.querySelector("#author").value;
    const pages = form.querySelector("#pages").value;
    const read = form.querySelector("#checkbox").checked;

    const myBook = new Book(title, author, pages, read)

    addBookToLibrary(myBook);

    displayBooks();

    modal.close();

    form.reset();
})