let myLibrary = [{
    author: "Stephen King", 
    title: "The Stand",
    pages: 1000,
    read: true,
    rating: 2
}, {
    author: "George Martin",
    title: "The Hedge Knight",
    pages: 250,
    read: false,
    rating: 3
}
];
function Book(author, title, pages, read, rating){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
};
let popup = document.getElementById('popup');
let newBookButton = document.getElementById("adder");
newBookButton.addEventListener('click', event => {
    popup.style.display = 'flex';
});
let cancelButton = document.getElementById('cancel');
cancelButton.addEventListener('click', event => {
    popup.style.display = 'none';
});
let submitButton = document.getElementById('submit');
submitButton.addEventListener('click', function() {
    addBookToLibrary();
    popup.style.display = 'none';
});
function addBookToLibrary() {
    let author = document.getElementById("author").value;
    let title = document.getElementById('book-name').value;
    let pages = document.getElementById('page-count').value;
    let read = document.getElementById('read-div').value;    
    let rating;
    let ratingRadios = document.getElementsByName('rating');
    for (let i = 0; i < 5; i++){
        if (ratingRadios[i].checked === true) {
            rating = ratingRadios[i].id;
            break;
        };
    };
    let newBook = new Book(author, title, pages, read, rating);    
    myLibrary.push(newBook);
    displayBooks(myLibrary);
    saveLibrary();   
};
let shelf = document.getElementById('library-shelf');
function removeBook(book) {
    let bookIndex = myLibrary.indexOf(book);
    console.log(book, bookIndex);
    myLibrary.splice(bookIndex, 1);
    shelf.childNodes[bookIndex].remove();
    saveLibrary();
};
function displayBooks(arr) {
    shelf.innerHTML = '';
    let i = 0;
    let removeButton = document.createElement('BUTTON');
    removeButton.classList.add('custom-button', 'custom-font', 'book-card-button', 'flex-center-column');
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card', 'flex-center-column');
    arr.forEach(book => {
        let list = document.createElement('ul');
        list.classList.add('flex-center-column');
        let clone = bookCard.cloneNode();
        clone.setAttribute("data-index", i);
        let newButton = removeButton.cloneNode();
        newButton.innerHTML = "Delete";
        newButton.addEventListener('click', function(){
            removeBook(book)});
        for (let metaData in book){
            let listItem = document.createElement('li');
            switch (metaData) {
                case 'title':
                    listItem.setAttribute("id", "book-title");
                    listItem.innerHTML = book[metaData];
                    list.prepend(listItem);
                    break;
                case 'author':
                    listItem.innerHTML = book[metaData];
                    list.appendChild(listItem);
                    break;
                case 'read':
                    book[metaData] === 'read' ? listItem.innerHTML = 'Read' : listItem.innerHTML = 'Not read';
                    list.appendChild(listItem); 
                    break;
                case 'pages':
                    listItem.innerHTML = book[metaData] + ' pages';
                    list.appendChild(listItem); 
                    break;
                case 'rating':
                    listItem.innerHTML = 'Rating: ' + book[metaData] + ' / 5';
                    list.appendChild(listItem);                     
                    break;
            };
            console.log(book[metaData]);
        };
        clone.appendChild(list);
        clone.appendChild(newButton);
        shelf.appendChild(clone);
        i++;
    });
};

let clearButton = document.getElementById('clear-data');

clearButton.addEventListener('click', function() {
    if (confirm("Erase your library?")){
        window.localStorage.clear();
        displayBooks(myLibrary);
        location.reload();
    } else return;
});

function saveLibrary(){
    window.localStorage.setItem('library', JSON.stringify(myLibrary));
};
function loadLibrary() {
    myLibrary = JSON.parse(window.localStorage.getItem('library'));
    displayBooks(myLibrary);
};
if (!window.localStorage.getItem('library')) {
    displayBooks(myLibrary);
} else loadLibrary();