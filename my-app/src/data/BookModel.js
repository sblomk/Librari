const BookModel = function(){
    let apiKey = 'AIzaSyBnc2ubpX3pUGpAfNpxFsjO3RfWK-r1nzg';
    let filter = 'Tolkien';
    let observers = [];
    let book;
    let search = [];

    this.setFilter = function(q) {
      if (!(Object.is(q, ''))){
        filter = q;
        notifyObservers();
      }
    }

    this.setSearch = function(results){
      search = results;
      //console.log("i modellen, search är: " + search);
      //notifyObservers();
    }

    this.getSearch = function(id){
      console.log("Vi vill ha " + id);
      for (var i = 0; i < search.length; i++){
        console.log(i + " " + search[i].id);
        if (search[i].id === id){
          //console.log( 'i getSearch, id för den sökta är:  ' + search[i].id);
          console.log(search[i]);
          return (search[i]);
        }
      }
      return search[0];
    }
    
    this.setChosen = function(b){
      //console.log("i modellen, vald bok är " + b);
      book = b;
      //console.log(book);
    }
    this.getChosen = function(){
      return book;
    }

    this.getAllBooks = function() {
        const url = 'https://www.googleapis.com/books/v1/volumes?q=' + filter + '&key=' + apiKey;
        return fetch(url)
            .then(processResponse)
            .catch(handleError)
    }
  
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