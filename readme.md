# IMDB Search!

IMDB Search is a simple application, built on HTML5, CSS3, and jQuery.  It allows the user to search the IMDB database by movie title, person (either actor or director), movie ID, or person ID.

## Functionality

Once a user has selected the type of search they would like to perform, and has entered a search term, clicking the submit button will cause the javascript file to fire off an AJAX request which has a promise attached to it.  When the request is fired, a spinner is activated, and will continue running until the promise either results in a success or a failure.

Assuming the request returns successfully, the data received from the IMDB API is then parsed apart and split into different divs.  Click handlers are attached to these divs which allow the user to pull up a detailed view if desired.

If one of the divs are clicked on, a modal appears, showing the title/name, image, and description associated with the selected item.  The modal can be dismissed by simply clicking on the background behind it.

## Further Considerations

Some small additions have been made to improve user experience.  For example, upon data being successfully returned from the IMDB API, the input field will clear automatically so that the user is free to enter a new search term.

In addition, the selected search type turns red upon user click (and the default search type is made red upon page load) to ensure the user knows which term is currently active.

## Next Steps

While I was planning on including both pagination and the ability to sort/order the results by varying criteria, unfortunately I did not have enough time left to do so.  However, I had thought ahead on how I would approach both of these features.

Concerning pagination, I did not see any pagination allowances built into the IMDB API, so I was planning on simply storing the entire data object and then keeping track of an offset integer.  This would allow me to simply slice out sections of the data array to display on the page, along with buttons that would increase/decrease the offset and refresh the results section.

The request to make the data sortable was a little confusing, based on the fact that only the movie title search seemed to return more than one entry.  Regardless, my mental approach would be to iterate through the items in the data array, resetting them to have a key of whatever sorting criteria we were currently using.  For instance, every movie item's key would be its own director's name if we were sorting by director.  That way, it would be relatively easy to iterate through the array again using either JavaScript's sort() function or a hand-written algorithm like quicksort in terms of each object's key.
