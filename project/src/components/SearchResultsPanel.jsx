import SearchListItem from './SearchListItem';
import './SearchResultsPanel.scss';

function SearchResultsPanel({ input, searchResults, nominees, addNominee }) {
  let searchResultsList;

  searchResultsList = searchResults.map((movie, index) => {
    return (
      <SearchListItem
        key={index}
        nominees={nominees}
        movieData={movie}
        addNominee={addNominee}
        searchResults={searchResults}
      />
    );
  });

  return (
    <div className="results-panel">
      {input ? (
        <h3>
          Searching for <span className="highlighted-text">"{input}"</span>
        </h3>
      ) : (
        <h3>Search Results</h3>
      )}

      {input && !searchResults.length ? (
        <p className="status-text">No Results Found</p>
      ) : (
        <ul>
          <div>{searchResultsList}</div>
        </ul>
      )}
    </div>
  );
}

export default SearchResultsPanel;
