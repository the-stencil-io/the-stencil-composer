import React from 'react';


/*
Services / Links

Searchable by
* Label value
* Technical name (Service)
* Value (Links)

Results:
* List is filtered
* SearchString in match is highlighted



Articles

Searchable by
* Page 1, 2, 3 Headings
* Link label value, value
* Service label value, technical name
* Search goes through all locales

Results:
* Search result Article is expanded with a background colour
* Exact search result seachString is highlighted within the Article item
* What about if user is in a different locale filter for explorer? Does it matter?


Questions:
* How to deal with Link, Article, and Workflow explorer? How can SecondarySearch differentiate between which explorer is open?
* Need a submit button to avoid expanding / contracting explorer?
* What if you're in Workflows view with FI language filter and you search for a SV workflow name?'

*/

interface SearchSecondaryProps {
  
}

const SearchSecondary: React.FC<SearchSecondaryProps> = () => {
  return null;
}

export { SearchSecondary }