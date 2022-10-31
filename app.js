const storageKey = "awesomeBooks";
const currentFormTitle = document.querySelector('#title');
const currentFormAuthor = document.querySelector('#author');
const currentFormBookAddButton = document.querySelector('#book-add-button');
const arrBooks = [];

function removeBook(id) {
  for (let i=0;i<arrBooks.length;i++) {
    if (arrBooks[i].id==id) {
      arrBooks.splice(i, 1); 
    }
  }
}

function addBook() {
  let maxId = 0;
  arrBooks.forEach((book) => {
    if (book.id>maxId) {
      maxId = book.id;
    }
  });

  const newBook = {
    id: maxId+1,
    title: currentFormTitle.value,
    author: currentFormAuthor.value,
  };
  arrBooks.push(newBook);
}

function saveDataToLocalStorage() {
  localStorage.setItem(storageKey, JSON.stringify(arrBooks));
}

function addElement(elementType, parent, className) {
  const element = document.createElement(elementType);
  element.classList.add(className);
  parent.appendChild(element);
  return element;
}

function showBooks() {
  const bookList = document.querySelector('.book-list');
  arrBooks.forEach((book) => {
    const bookItem = addElement('div', bookList, 'book-item');
    const bookTitle = addElement('div', bookItem, 'book-title');
    bookTitle.innerHTML = book.title;
    const bookAuthor = addElement('div', bookItem, 'book-author');
    bookAuthor.innerHTML = book.author;
    const bookRemoveButton = addElement('button', bookItem, 'book-remove-button');
    bookRemoveButton.innerHTML = 'Remove';

    bookRemoveButton.addEventListener('click', () => {
      removeBook(book.id);
      saveDataToLocalStorage();
      location.reload();
    });
  });
}

function loadDataFromLocalStorage() {
  const dataLoaded = JSON.parse(localStorage.getItem(storageKey));

  if (dataLoaded !== null) {
    dataLoaded.forEach((book) => {
      let newBook = {
        id: 0,
        title: "",
        author: "",
      };

      newBook.id = book.id;
      newBook.title = book.title;
      newBook.author = book.author;
      arrBooks.push(newBook);
    });
  }
  showBooks();
}

currentFormBookAddButton.addEventListener('click', () => {
  addBook();
  saveDataToLocalStorage();
});

window.onload = () => {
  loadDataFromLocalStorage();
};
