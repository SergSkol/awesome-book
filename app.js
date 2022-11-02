const storageKey = 'awesomeBooks';
const currentFormTitle = document.querySelector('#title');
const currentFormAuthor = document.querySelector('#author');
const currentFormBookAddButton = document.querySelector('#book-add-button');

class BookShelf {
  constructor() {
    this.arrBooks = [];
  }

  addBook(newTitle, newAuthor) {
    const timeNow = new Date();
    const newBook = {
      id: timeNow.getTime(),
      title: newTitle,
      author: newAuthor,
    };

    this.arrBooks.push(newBook);
  }

  removeBook(id) {
    this.arrBooks = this.arrBooks.filter((book) => book.id !== id);
  }

  saveDataToLocalStorage() {
    localStorage.setItem(storageKey, JSON.stringify(this.arrBooks));
  }

  showBooks() {
    function addElement(elementType, parent, className) {
      const element = document.createElement(elementType);
      element.classList.add(className);
      parent.appendChild(element);
      return element;
    }

    const bookList = document.querySelector('.book-list');
    this.arrBooks.forEach((book) => {
      const bookItem = addElement('div', bookList, 'book-item');
      const bookTitle = addElement('div', bookItem, 'book-title');
      bookTitle.innerHTML = `" ${book.title} "  +  by ${book.author}`;

      const bookRemoveButton = addElement(
        'button',
        bookItem,
        'book-remove-button',
      );
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
    if (dataLoaded == null) {
      this.arrBooks = [];
    } else {
      this.arrBooks = dataLoaded;
    }

    this.showBooks();
  }
}

const awesomeBookShelf = new BookShelf();

currentFormBookAddButton.addEventListener('click', () => {
  const title = currentFormTitle.value;
  const author = currentFormAuthor.value;
  awesomeBookShelf.addBook(title, author);
  awesomeBookShelf.saveDataToLocalStorage();
});

window.onload = () => {
  awesomeBookShelf.loadDataFromLocalStorage();
};
