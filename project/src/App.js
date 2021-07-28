import { useState, useEffect } from 'react';
import SearchPanel from '../src/components/SearchPanel';
import SearchResultsPanel from '../src/components/SearchResultsPanel';
import NominationPanel from '../src/components/NominationPanel';
import PuffLoader from 'react-spinners/PuffLoader';
import axios from 'axios';
import './App.scss';
import './styles/mediaQueries.scss';

const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function App() {
  const [input, setInput] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [nominees, setNominees] = useState([]);
  const [nomineeNumber, setNomineeNumber] = useState(0);
  const [submissionView, setSubmissionView] = useState(false);

  // API call to Movie DB on input change

  useEffect(() => {
    axios
      .get(
        `https://www.omdbapi.com/?s=${input.toLowerCase()}&type=movie&page=1&apikey=${API_KEY}`
      )
      .then((response) => {
        //limit results to 5 movies for panel
        const reducedList = response.data.Search.slice(0, 5);
        setSearchList(reducedList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [input, nominees]);

  // When nominee list is 5 -> sets submit page to submissionView

  useEffect(() => {
    setNomineeNumber(nominees.length);
  }, [nominees]);

  useEffect(() => {
    setNominees([]);
    setInput('');
    setSearchList([]);
  }, [submissionView]);

  // Show Submit page for 5 seconds and then back to home page

  if (submissionView) {
    setTimeout(() => {
      setSubmissionView(false);
    }, 6000);
  }

  // Live Search Function

  const handleSearchBar = (input) => {
    setSearchList([]);
    setInput(input);
  };

  const addNominee = (movieData) => {
    if (nominees === undefined) {
      setNominees([{ title: movieData.Title, year: movieData.Year }]);
    } else
      setNominees([
        ...nominees,
        { title: movieData.Title, year: movieData.Year },
      ]);
  };

  const removeNominee = (movieData) => {
    console.log({ movieData });
    console.log({ nominees });
    const updatedNominees = nominees.filter(
      (movie) =>
        !(movie.title === movieData.title && movie.year === movieData.year)
    );
    setSearchList([]);
    setNominees(updatedNominees);
  };

  const handleSubmit = () => {
    if (nominees && nominees.length === 5) {
      setSubmissionView(true);
    }
  };

  return (
    <>
      {submissionView && (
        <div className={submissionView && ' page-container show-page'}>
          <h1>Submitting Nominations!</h1>
          <div className="animation-box">
            <PuffLoader
              color={'darkgreen'}
              loading={submissionView}
              size={180}
            />
          </div>
          <h3 className="thankyou-message">
            Thanks! We have received your Nominations!
          </h3>
        </div>
      )}
      {!submissionView && (
        <div className={!submissionView && 'page-container'}>
          <SearchPanel
            handleSubmit={handleSubmit}
            nomineeNumber={nomineeNumber}
            handleSearchBar={handleSearchBar}
          />

          <div className="flex-row1">
            <SearchResultsPanel
              input={input}
              nominees={nominees}
              searchResults={searchList}
              addNominee={addNominee}
            />
            <div className="divider"></div>
            <NominationPanel
              nomineeTotal={nomineeNumber}
              nominees={nominees}
              removeNominee={removeNominee}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
