// targetting DOM elements
const bookList = document.querySelector('.book-list-container');
const listBtn = document.querySelector('.listBtn');

const addNewBtn = document.querySelector('.add-new-btn');

const formContainer = document.querySelector('.form-container');

const contactBtn = document.querySelector('.contact');
const contactInfo = document.querySelector('.contact-info');


class Book {
  constructor(bookTitle, bookAuthor) {
    this.bookTitle = bookTitle;
    this.bookAuthor = bookAuthor;
  }
}

let books;

// SavedBooks Class: Handles Storage
class SavedBooks {
  static getBooks() {
    books = JSON.parse(localStorage.getItem('books')) || []
    return books;
  }

  static addBook(book) {
    const books = SavedBooks.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(bookTitle) {
    const books = SavedBooks.getBooks();

    books.forEach((book, index) => {
      if (book.bookTitle === bookTitle) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// BookUserInterface Class: Handle BookUserInterface Tasks
class BookUserInterface {
  static displayBooks() {
    const books = SavedBooks.getBooks();

    books.forEach((book) => BookUserInterface.addBookToList(book));
  }

  static addBookToList(book) {
    const listBooks = document.querySelector('#book-list');

    const bookDisplay = document.createElement('div');
    bookDisplay.className = 'bookList1';
    bookDisplay.innerHTML = `
        <p class="bookTitle"><b>${book.bookTitle}</b></p>
        <p class="bookAuthor">&nbsp;by&nbsp;<b>${book.bookAuthor}.</b></p>
        <button class="remove">Remove</button>
        `;
    listBooks.appendChild(bookDisplay);
  }

  static removeBook(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.remove();
    }
    localStorage.setItem('books', JSON.stringify(books));
  }

  static clearFields() {
    document.querySelector('#bookTitle').value = '';
    document.querySelector('#bookAuthor').value = '';
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', BookUserInterface.displayBooks);

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
  BookUserInterface.addBookToList(book);

  // Add book to SavedBooks
  SavedBooks.addBook(book);

  // Clear fields
  BookUserInterface.clearFields();
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from BookUserInterface
  BookUserInterface.removeBook(e.target);

  // Remove book from SavedBooks
  SavedBooks.removeBook(e.target.previousElementSibling.previousElementSibling.textContent);
});

// Day 3 : Project update
