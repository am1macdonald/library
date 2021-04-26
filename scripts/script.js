let myLibrary = [{
    author: "King, Stephen", 
    title: "Stand, The",
    pages: 1000,
    read: true,
    rating: 2
}, {
    author: "Martin, George",
    title: "Hedge Knight, The",
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

let submitButton = document.getElementById('click', addBookToLibrary());

function addBookToLibrary() {

    
};

function removeBook() {
    
}

function displayBooks(arr) {
    let i = 0;
    let removeButton = document.createElement('BUTTON');
    removeButton.classList.add('remove-from');
    let shelf = document.getElementById('library-shelf');
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    arr.forEach(book => {
        let list = document.createElement('ul');
        let clone = bookCard.cloneNode();
        clone.setAttribute("data-index", i);
        let newButton = removeButton.cloneNode();
        newButton.innerHTML = "REMOVE";
        newButton.addEventListener('click', removeBook());
        for (let metaData in book){
            let listItem = document.createElement('li');
            if (metaData === 'read') {
                book[metaData] === true ? listItem.innerHTML = 'Read' : listItem.innerHTML = 'Not read';
            } else {                
                listItem.innerHTML = book[metaData];
            };
            console.log(book[metaData]);
            list.appendChild(listItem); 
        };
        clone.appendChild(list);
        clone.appendChild(newButton);
        shelf.appendChild(clone);
        i++;
    });
};
displayBooks(myLibrary);