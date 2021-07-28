import './Button.scss';

function Button({ selected, children, movieData, onClick }) {
  return (
    <button
      disabled={selected}
      type="button"
      className="btn"
      onClick={() => {
        onClick(movieData);
      }}
    >
      {children}
    </button>
  );
}

export default Button;
