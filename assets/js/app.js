function Book(bookTitle, bookAuthor) {
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
}

let books;

const getBooks = () => {
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
};

const removeBtn = document.querySelector('.remove');

removeBtn.addEventListener('click', (e) => {
  let books = getBooks();

  books.forEach((index) => {
    if (e.target.className === 'remove') {
      index = e.target;
      books = books.filter((bk) => JSON.stringify(bk.id) !== id);
      localStorage.setItem('local', JSON.stringify(book)); // LOCAL STORAGE
      e.target.parentElement.remove();
    }
  });
});

const removeBook = () => {
  if (removeBtn.classList.contains('remove')) {
    books.splice(index, 1);
    removeBtn.parentElement.remove();
  }

  localStorage.setItem('books', JSON.stringify(books));
};

const clearFields = () => {
  document.querySelector('#bookTitle').value = '';
  document.querySelector('#bookAuthor').value = '';
};

const addBook = (book) => {
  const books = getBooks();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  const listBooks = document.querySelector('#book-list');

  const bookDisplay = document.createElement('div');
  bookDisplay.className = 'bookList1';
  bookDisplay.innerHTML = `
      <p class="bookTitle"><b>${book.bookTitle}</b></p>
      <p>by<span></span><b>${book.bookAuthor}.</b></p>
      <button class="remove">Remove</button>
      `;

  listBooks.appendChild(bookDisplay);
  clearFields();
};

// SavedBooks Class: Handles Storage
const SavedBooks = () => {
  // getBooks();
  removeBook();
  addBook();
};

window.addEventListener('DocumentContentLoaded', SavedBooks);

// BookUserInterface Class: Handle BookUserInterface Tasks
const displayBooks = () => {
  const books = getBooks();

  books.forEach((book) => addBook(book));

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

  // Instatiate book
  const book = new Book(bookTitle, bookAuthor);

  // Add Book to BookUserInterface
  addBook(book);
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from BookUserInterface
  // removeBook(e.target);
  // Remove book from SavedBooks
  // removeBook(
  //   e.target.previousElementSibling.previousElementSibling.textContent
  // );
});
