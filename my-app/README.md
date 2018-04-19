## Librari 

Librari is your personal library, where you are able to search for books and save them to your personalized bookshelves. It could be in order to keep track of books you have read, books you want to read, your all time favorites, etc. 

We are using the Google Books API in order to get search results for books, and collect some of the books' metadata.  

------------------------

## File structure and the thought of each component.

- Book: This is the view you get to when you want to get information about a book and want to add it to a shelf. You can either add the book to a current shelf, or create a new one. 

- data: Here is our model. 

- Header: Our header.

- Landing: This is the "main page" of the application, and is where we view the search results. Landing also holds the components Search and Header. 

- Library: This is a component that we haven't started with yet. The idea is that this should be the overview of your different shelves, i.e hold a couple to many of the component Shelf with their content. In this view you might also be able to drag and drop the books between shelves, and to remove current books. 

- Search: This is a component for the search bar, that is placed within the Landing view. 

- Shelf: No relevant content yet. Shelf is supposed to map the content from the array "shelves" in the model. The idea is that you are also able to drag and drop the books here. 

------------------------

## Flaws we know of and are going to fix:
- The deployed version of our app has some other flaws than the latest version of the code on our git. Some of the books will cause an error when clicking them, and also the books with default images will show an empty page.
- A debounce for the search results
- If you click on a book and then go back your search results are wiped.
- The title when hovering over books are not changing row. (Any ideas of how to fix this?)

## Next step:
 - Create and implement the Library and Shelf component
 - Maybe create personal logins and save the data in firebase
 - A lot of CSS
 - Figure out how drag and drop works
 - Instead of having a default search string, it might be nice to have a row that displays recommended books, and have the searchbar underneath

