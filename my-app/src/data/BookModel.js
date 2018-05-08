import firebase from "../firebase.js"

const BookModel = function() {
  
  this.userId = 'jlvZokc9JmT5ABQEq21ydMwtWNJ3';
  

  // en observer för som hämtar inloggningsuppgifter om någon är inne
  // sätter userId till den inloggades id
  this.addListener = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.userId = user.uid;
        console.log("user id är: "+this.userId);
        /*
        var mail = user.email;
        var displayName = user.displayName;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        */
      }
      else {
        // User is signed out.
      }
    }.bind(this));
  }
  this.addListener();

  let apiKey = 'AIzaSyCdfNCyUlSSV9AkebmZhTW_Rfw2yjzJHK4';//'AIzaSyBnc2ubpX3pUGpAfNpxFsjO3RfWK-r1nzg';
  let observers = [];

  // saves the chosen book in local storage
  let book = JSON.parse(localStorage.getItem('chosen'));

  // Saving initial values for filter and shelves in local storage

  if (localStorage.getItem('filter') === null){
    localStorage.setItem('filter', 'Tolkien');
  }
  if (localStorage.getItem('shelves') === null){
    let initialshelves = [{id:1, name: 'Shelf 1', books: []}, {id:2, name: 'Shelf 2', books: []}];
    localStorage.setItem('shelves', JSON.stringify(initialshelves));
    //let shelves = JSON.parse(localStorage.getItem('shelves'));
  }
  //firebase.database().ref('users/' + this.userId).set({
   // shelves: [{id:1, name: 'Shelf 1', books: []}, {id:2, name: 'Shelf 2', books: []},{id:3, name: 'Shelf 3', books: []}]
  //});
  //let shelves = JSON.parse(localStorage.getItem('shelves'));

  // saves the initial search result in local storage
  let search = JSON.parse(localStorage.getItem('search'));
  if (search === null) {
    search = []
  };

  this.getSearchResults = function() {
    console.log(JSON.parse(localStorage.getItem('search')));
    return JSON.parse(localStorage.getItem('search'));
  }


  this.setFilter = function(q) {
    // the API does not allow empty queries
    // so if the search bar is emptied, we will hold on to the latest non-empty search value
    if (!(Object.is(q, ''))){
      //filter = q;
      localStorage.setItem('filter', q);
      notifyObservers();
    }
  }

  // saves the search result in local storage
  this.setSearch = function(results){
    search = results;
    localStorage.setItem('search', JSON.stringify(search));
  }

  // getSearch is called with the id of the book that has been clicked
  // it returns the corresponding book object
  this.getSearch = function(id){

    for (var i = 0; i < search.length; i++){
      if (search[i].id === id){
        this.setChosen(search[i]);
        return search[i];
      }
    }
    // if there is no matching id, return the first object
    //return search[0];
  }

  // saving the chosen book object to local storage
  this.setChosen = function(b){
    book = b;
    localStorage.setItem('chosen', JSON.stringify(book));
  }
  this.getChosen = function(){
    return book;
  }

  // API call returning a maximum of 40 books, with the filter set by the user
  this.getAllBooks = function() {
    let filter = localStorage.getItem('filter');
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + filter + '&maxResults=32' + '&key=' + apiKey;
    return fetch(url)
        .then(processResponse)
        .catch(handleError)
  }

  this.getShelfByID = function(id) {
    //var shelves = JSON.parse(localStorage.getItem('shelves'));
    var shelves = this.getShelves();
    for (var i = 0; i < shelves.length; i++) {
      if (shelves[i].id === id) {
        return shelves[i];
      }
    }
  }

  // adding the chosen book to the chosen shelf
  this.addToShelf = function(shelfId, bookId) {
    //var shelves = JSON.parse(localStorage.getItem('shelves'));
    //var shelves = this.getShelves();

    var ref = firebase.database().ref('/users/' + this.userId + '/shelves');
    ref.on("value", function(snapshot) {
      var shelves = snapshot.val();


    for (var i = 0; i < shelves.length; i++) {
      if (shelves[i].id === shelfId) {
        for(var j = 0; j < shelves[i].books.length; j++){
          // if the chosen book is already in the chosen shelf, return
          if(shelves[i].books[j].id === bookId){
            return
          }
        }
        // if not, add the book to the shelf
        shelves[i].books.push(this.getSearch(bookId));

        // pushar till databasen
        firebase.database().ref('users/' + this.userId).set({
          shelves: shelves
        });
        localStorage.setItem('shelves', JSON.stringify(shelves));
      }
    }
  }.bind(this))
  }


  this.removeBookFromShelf = function(shelfId, bookId) {
    //console.log('shelf ' + shelfId);
    //console.log('book ' + bookId);
    //var shelves = JSON.parse(localStorage.getItem('shelves'));
    var shelves = this.getShelves();
    for (var i = 0; i < shelves.length; i++) {
      if (shelves[i].id === shelfId) {
        for(var j = 0; j < shelves[i].books.length; j++){
          if(shelves[i].books[j].id === bookId){
            console.log("tar bort " + shelves[i].books[j].id)
            shelves[i].books.splice(j,1);
            //localStorage.setItem('shelves', JSON.stringify(shelves));
            firebase.database().ref('users/' + this.userId).set({
              shelves: shelves
            });
            notifyObservers();
          }
        }
      }
    }
  }

  // checks the number of shelves and assigns the next unused integer as the id to the new shelf
  this.createShelfId = function() {
    //var shelves = JSON.parse(localStorage.getItem('shelves'));
    var ref = firebase.database().ref('/users/' + this.userId + '/shelves');
    ref.on("value", function(snapshot) {
      var shelves = snapshot.val();
      let counter = 1
      for(var i = 0; i < shelves.length; i++) {
        if(shelves[i].id === counter){
          counter += 1;
        } else {
          return counter
        }
      }
      return counter
    })
    
    //var shelves = this.getShelves();

  }

  this.createShelf = function(id, name){
    var id = this.userId;
    var shelves;
    //var shelves = JSON.parse(localStorage.getItem('shelves'));
    var ref = firebase.database().ref('/users/' + this.userId + '/shelves');
    ref.on("value", function(snapshot) {
      shelves = snapshot.val();
    //var shelves = this.getShelves();
    let shelf = {
      id: id,
      name: name,
      books: []
    }
    shelves.push(shelf)
    }.bind(this))
    
    //firebase.database().ref('users/' + this.userId).set({
      //shelves: shelves
    //});
  

    //localStorage.setItem('shelves',JSON.stringify(shelves));
    //console.log("i createShelf" + shelves);
    notifyObservers();
  }

  this.getShelves = function(callback, errorcallback) {
    // Import Admin SDK
//var admin = require("firebase-admin");

// Get a database reference to our posts
//var db = admin.database();
var ref = firebase.database().ref('/users/' + this.userId + '/shelves');

// Attach an asynchronous callback to read the data at our posts reference
ref.on("value", function(snapshot) {
    var childData = snapshot.val();
    //var shelfArray = []
    console.log('shelves från firebase: ' + childData.name);
    //shelfArray.push(childData);
    console.log('precis före CB')
    callback(childData);
  }
  
  //console.log('........................' + snapshot.val());
  //return snapshot.val();
, function (errorObject) {
  errorcallback(errorObject);
  console.log("The read failed: " + errorObject.code);
});


// ------------------------------------------------------------------------------
/*
    var shelfArray = [];
    var article;
    var articleRef = firebase.database().ref('/users/' + this.userId + '/shelves');
    articleRef.once('value').then(function(snapshot) {
      // The first promise succeeded. Save snapshot for later.
      article = snapshot.val();
      snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();
        console.log('shelves från firebase: ' + childData.name);
        shelfArray.push(childData);
      })
      for (var i=0; i < shelfArray.length; i++){
        console.log('******** '+ shelfArray[i].name)
      }
      return shelfArray;

      // ------------------------------------------------------------------------------

      // By returning a Promise, we know the function passed to "then" below
      // will execute after the transaction finishes.
      //return articleRef.child('readCount').transaction(function(current) {
        // Increment readCount by 1, or set to 1 if it was undefined before.
        //return (current || 0) + 1;
      //});
    })/*.then(function(readCountTxn) {
      snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();
        shelfArray.push(childData);
      })
      return shelfArray;
    });*/
      // All promises succeeded.
      //renderBlog({
        //article: article,
        //readCount: readCountTxn.snapshot.val()
      //});
    }//, function(error) {
      // Something went wrong.
      //console.error(error);
    //});
    /*var shelfArray = [];
    console.log('getshelves före firebase');
    var shelves = firebase.database().ref('/users/' + this.userId + '/shelves');
    console.log("hallihallå" + shelves)
    shelves.on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      shelfArray.push(childData);
      console.log(childData.books[0].volumeInfo.title);
      console.log('shelves från firebase: ' + childData.name);
        });
      // ...
      //console.log("++++++" + shelfArray[0].books.volumeInfo.title)
          });    /*var shelves = firebase.database().ref('users/' + userId + '/shelves');
      starCountRef.on('value', function(snapshot) {
    updateStarCount(postElement, snapshot.val());
    });*/

    //console.log("i getShelf" + JSON.parse(localStorage.getItem('shelves')));
  
    //return JSON.parse(localStorage.getItem('shelves'));
    
    //return shelfArray;
  

  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllBooks() API Error:', error.message || error)
      })
    } else {
      console.error('getAllBooks() API Error:', error.message || error)
    }
  }

  this.addObserver = function (observer) {
      observers.push(observer);
    };

  this.removeObserver = function (observer) {
      observers = observers.filter(o => o !== observer);
    };

  const notifyObservers = function () {
      observers.forEach(o => o.update());
    };

};

export const modelInstance = new BookModel();
