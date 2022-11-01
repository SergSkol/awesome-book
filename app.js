const storageKey = 'awesomeBooks';
const currentFormTitle = document.querySelector('#title');
const currentFormAuthor = document.querySelector('#author');
const currentFormBookAddButton = document.querySelector('#book-add-button');

class Book {
  constructor(title, author) {
    let newId = 0;
    const timeNow = new Date();
    newId = timeNow.getTime();

    this.id = newId;
    this.title = title;
    this.author = author;
  }
}

class BookShelf {
  constructor() {
    this.arrBooks = [];
  }

  addBook(newBook) {
    this.arrBooks.push(newBook);
  }

  removeBook(id) {
    for (let i = 0; i < this.arrBooks.length; i += 1) {
      if (this.arrBooks[i].id === id) {
        this.arrBooks.splice(i, 1);
      }
    }
  }

  saveDataToLocalStorage() {
    localStorage.setItem(storageKey, JSON.stringify(this.arrBooks));
  }

  addElement(elementType, parent, className) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    parent.appendChild(element);
    return element;
  }

  showBooks() {
    const bookList = document.querySelector('.book-list');
    this.arrBooks.forEach((book) => {
      const bookItem = this.addElement('div', bookList, 'book-item');
      const bookTitle = this.addElement('div', bookItem, 'book-title');
      bookTitle.innerHTML = `"${book.title}"` + ` by ${book.author}`;

      const bookRemoveButton = this.addElement('button', bookItem, 'book-remove-button');
      bookRemoveButton.innerHTML = 'Remove';

      bookRemoveButton.addEventListener('click', () => {
        this.removeBook(book.id);
        this.saveDataToLocalStorage();
        window.location.reload();
      });
    });
  }

  loadDataFromLocalStorage() {
    const dataLoaded = JSON.parse(localStorage.getItem(storageKey));

    if (dataLoaded !== null) {
      dataLoaded.forEach((book) => {
        const newBook = {
          id: 0,
          title: '',
          author: '',
        };

        newBook.id = book.id;
        newBook.title = book.title;
        newBook.author = book.author;
        this.arrBooks.push(newBook);
      });
    }
    this.showBooks();
  }
}

const awesomeBookShelf = new BookShelf();

currentFormBookAddButton.addEventListener('click', () => {
  const title = currentFormTitle.value;
  const author = currentFormAuthor.value;
  const newBook = new Book(title, author);
  awesomeBookShelf.addBook(newBook);
  awesomeBookShelf.saveDataToLocalStorage();
});

window.onload = () => {
  awesomeBookShelf.loadDataFromLocalStorage();
};
