import Button from './Button';

function NominationListItem({ number, movie, removeNominee }) {
  return (
    <li>
      {`${number}. ${movie.title} (${movie.year})`}
      <Button movieData={movie} onClick={removeNominee}>
        Remove
      </Button>
    </li>
  );
}

export default NominationListItem;
