import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.scss';

function SearchBar({ handleSearchBar }) {
  return (
    <div className="flex-row2">
      <div className="flex-row">
        <div className="search-icon">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input
          className="search-bar"
          placeholder="Enter Movie Title"
          maxlength="50"
          onChange={(event) => handleSearchBar(event.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
