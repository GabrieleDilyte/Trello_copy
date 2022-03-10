function Button({ isBlue, isGrey, margin, marginRight, children, onClick }) {
  const className = "".concat(
    isBlue
      ? " bg-sky-500 rounded p-1 text-white hover:bg-sky-600 pr-2 pl-2"
      : "",
    isGrey ? " text-slate-400 hover:text-slate-700" : "",
    margin ? " m-2" : "",
    marginRight ? " mr-2" : ""
  );

  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export default Button;
