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
function addBookToLibrary() {

};

function displayBooks(arr) {
    let removeButton = document.createElement('BUTTON');
    removeButton.classList.add('remove-from');
    let shelf = document.getElementById('library-shelf');
    let bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    arr.forEach(book => {
        let list = document.createElement('ul');
        let clone = bookCard.cloneNode();
        let newButton = removeButton.cloneNode();
        for (let thing in book){
            let item = document.createElement('li');
            if (thing === 'read') {
                book[thing] === true ? item.innerHTML = 'Read' : item.innerHTML = 'Not read';
            } else {                
                item.innerHTML = book[thing];
            };
            console.log(book[thing]);
            clone.appendChild(item);
            clone.appendChild(newButton);
        }
        shelf.appendChild(clone);
    });
};
displayBooks(myLibrary);