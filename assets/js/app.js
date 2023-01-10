function Book(index, bookTitle, bookAuthor) {
  this.index = index;
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
}

let books = [
  // {
  //   index: 1,
  //   bookTitle: 'title1',
  //   bookAuthor: 'author1',
  // },
  // {
  //   index: 2,
  //   bookTitle: 'title2',
  //   bookAuthor: 'author2',
  // },
];

// Load book from local storage
const getBooks = () => {
  if (localStorage.getItem('books') === null) {
    localStorage.setItem('books', JSON.stringify(books));
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
};

// Remove book
const removeBook = (position) => {
  const books = getBooks();
  books.splice(position, 1);

  localStorage.setItem('books', JSON.stringify(books));
  window.location.reload();
};

// Clear form fields
const clearFields = () => {
  document.querySelector('#bookTitle').value = '';
  document.querySelector('#bookAuthor').value = '';
};

// Add book
const addBook = (book) => {
  const books = getBooks();
  books.push(book);
  clearFields();
  localStorage.setItem('books', JSON.stringify(books));
  window.location.reload();
};

const listBooks = document.querySelector('#book-list');

// Display book to UI
const displayBooks = () => {
  const books = getBooks();
  // Load book section dynamically
  books.forEach((book) => {
    const bookDisplay = document.createElement('div');
    bookDisplay.className = `bookList${Date.now()}`;
    bookDisplay.innerHTML = `
        <p class="bookTitle"><b>${book.bookTitle}</b></p>
        <p>by<span></span><b>${book.bookAuthor}.</b></p>
        <button id="${Date.now()}" class="remove">Remove</button>
        `;
    listBooks.appendChild(bookDisplay);
  });

  localStorage.setItem('books', JSON.stringify(books));
};

// Event: Display Books
document.addEventListener('DOMContentLoaded', displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  // Get form values
  const bookTitle = document.querySelector('#bookTitle').value;
  const bookAuthor = document.querySelector('#bookAuthor').value;
  // Create unique id for each book
  const index = Date.now();

  // Instatiate book
  const book = new Book(index, bookTitle, bookAuthor);

  // Add Book to BookUserInterface
  addBook(book);
});

// Event: Remove a Book
listBooks.addEventListener('click', (e) => {
  // Get the position of DOM parent element of the button clicked
  const position = Array.from(e.target.parentNode.parentNode.children).indexOf(
    e.target.parentNode,
  );

  removeBook(position);
});
