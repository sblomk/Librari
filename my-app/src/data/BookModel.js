const BookModel = function(){
    let apiKey = 'AIzaSyBnc2ubpX3pUGpAfNpxFsjO3RfWK-r1nzg';
    

    this.getAllBooks = function() {
        const url = 'https://www.googleapis.com/books/v1/volumes?q=inauthor:tolkien&key=' + apiKey;
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

};

export const modelInstance = new BookModel();