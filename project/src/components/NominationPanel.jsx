import NominationListItem from './NominationListItem';
import './NominationPanel.scss';

function NominationPanel({ nominees, nomineeTotal, removeNominee }) {
  let nominationList;

  if (nominees) {
    nominationList = nominees.map((movie, index) => {
      return (
        <NominationListItem
          number={index + 1}
          key={movie.Title}
          movie={movie}
          removeNominee={removeNominee}
        />
      );
    });
  }

  return (
    <div className="nominee-panel">
      <div className="count-box">
        {nomineeTotal <= 5 && (
          <>
            <h3>Nominations</h3>
          </>
        )}
      </div>
      {nomineeTotal === 0 && (
        <>
          <p className="status-text">
            <h3>How it works</h3>
            <p>1. Search for movie titles</p>
            <p>2. Nominate 5 movies</p>
            <p>3. Submit your nominations</p>
          </p>
        </>
      )}

      <ol>
        <div>{nominationList}</div>
      </ol>
    </div>
  );
}

export default NominationPanel;
