class Book {
  constructor (author, title, pages, read, rating) {
    this.author = author
    this.title = title
    this.pages = pages
    this.read = read
    this.rating = rating
  }

  changeRead () {
    this.read ? this.read = false : this.read = true
    saveLibrary()
  };
};

let myLibrary = [
  new Book('Stephen King', 'The Stand', 1000, true, 2),
  new Book('George Martin', 'The Hedge Knight', 250, false, 3)
]

const background = document.getElementById('background')
const popup = document.getElementById('popup')
const newBookButton = document.getElementById('adder')
const form = document.getElementById('book-input')
const clearButton = document.getElementById('clear-data')
const submitButton = document.getElementById('submit')
const cancelButton = document.getElementById('cancel')

newBookButton.addEventListener('click', event => {
  background.classList.add('blur')
  clearButton.disabled = true
  popup.style.display = 'flex'
})

cancelButton.addEventListener('click', event => {
  form.reset()
  clearButton.disabled = false
  background.classList.remove('blur')
  popup.style.display = 'none'
})

submitButton.addEventListener('click', function () {
  if (form.checkValidity() === true) {
    addBookToLibrary()
    background.classList.remove('blur')
    popup.style.display = 'none'
    form.reset()
  } else {
    console.log('something wrong!!!')
  }
})

function addBookToLibrary () {
  const author = document.getElementById('author').value
  const title = document.getElementById('book-name').value
  const pages = parseInt(document.getElementById('page-count').value)
  const readSelection = document.getElementById('read-div').value
  let read
  readSelection === 'true' ? read = true : read = false
  let rating
  const ratingRadios = document.getElementsByName('rating')
  for (let i = 0; i < 5; i++) {
    if (ratingRadios[i].checked === true) {
      rating = ratingRadios[i].id
      break
    };
  };
  const newBook = new Book(author, title, pages, read, rating)
  myLibrary.push(newBook)
  displayBooks(myLibrary)
  saveLibrary()
};
const shelf = document.getElementById('library-shelf')
function removeBook (book) {
  const bookIndex = myLibrary.indexOf(book)
  myLibrary.splice(bookIndex, 1)
  shelf.childNodes[bookIndex].remove()
  displayBooks(myLibrary)
  saveLibrary()
};
function displayBooks (arr) {
  shelf.innerHTML = ''
  let i = 0
  const removeButton = document.createElement('BUTTON')
  removeButton.classList.add('custom-button', 'custom-font', 'book-card-button', 'flex-center-column')
  const bookCard = document.createElement('div')
  bookCard.classList.add('book-card', 'flex-center-column')
  arr.forEach(book => {
    const list = document.createElement('ul')
    list.classList.add('flex-center-column')
    const clone = bookCard.cloneNode()
    clone.setAttribute('data-index', i)
    const newButton = removeButton.cloneNode()
    newButton.innerHTML = 'Delete'
    newButton.addEventListener('click', function () {
      removeBook(book)
    })
    for (const metaData in book) {
      const listItem = document.createElement('li')
      switch (metaData) {
        case 'title':
          listItem.setAttribute('id', 'book-title')
          listItem.innerHTML = book[metaData]
          list.prepend(listItem)
          break
        case 'author':
          listItem.innerHTML = book[metaData]
          list.appendChild(listItem)
          break
        case 'read':
          book[metaData] === true ? listItem.innerHTML = 'Read' : listItem.innerHTML = 'Not Read'
          listItem.classList.add('read-item')
          listItem.addEventListener('click', function () {
            book.changeRead()
            listItem.innerHTML === 'Read' ? listItem.innerHTML = 'Not Read' : listItem.innerHTML = 'Read'
          })
          list.appendChild(listItem)
          break
        case 'pages':
          if (book[metaData] <= 10000) {
            listItem.innerHTML = book[metaData] + ' pages'
            list.appendChild(listItem)
          } else {
            listItem.innerHTML = 'too many pages!'
            list.appendChild(listItem)
          };
          break
        case 'rating':
          listItem.innerHTML = 'Rating: ' + book[metaData] + ' / 5'
          list.appendChild(listItem)
          break
      };
    };
    clone.appendChild(list)
    clone.appendChild(newButton)
    shelf.appendChild(clone)
    i++
  })
};
clearButton.addEventListener('click', function () {
  if (confirm('Erase your library?')) {
    window.localStorage.clear()
    displayBooks(myLibrary)
    location.reload()
  }
})
function saveLibrary () {
  window.localStorage.setItem('library', JSON.stringify(myLibrary))
};
function loadLibrary () {
  myLibrary = JSON.parse(window.localStorage.getItem('library')).map(book => {
    return new Book(book.author, book.title, book.pages, book.read, book.rating)
  })
  displayBooks(myLibrary)
};
if (!window.localStorage.getItem('library')) {
  displayBooks(myLibrary)
} else loadLibrary()
