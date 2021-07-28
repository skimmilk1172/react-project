import { useEffect, useState } from 'react';
import Button from './Button';

function SearchListItem({ nominees, movieData, addNominee }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (nominees !== undefined) {
      if (nominees.length === 5) {
        setSelected(true);
        return;
      }
      nominees.forEach((item) => {
        if (item.title === movieData.Title && item.year === movieData.Year) {
          setSelected(true);
        }
      });
    } else {
      setSelected(false);
    }
  }, [movieData, nominees]);

  return (
    <li>
      {`${movieData.Title} (${movieData.Year})`}
      <Button
        selected={selected}
        nominees={nominees}
        movieData={movieData}
        onClick={addNominee}
      >
        Nominate
      </Button>
    </li>
  );
}

export default SearchListItem;
