let myLibrary = [{
    author: "King, Stephen", 
    title: "The Stand",
    pages: 1000,
    read: true,
    rating: 2
}
];
function Book(){
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
};

function addBookToLibrary() {

};

function displayBooks(arr) {
    console.table(myLibrary);
};