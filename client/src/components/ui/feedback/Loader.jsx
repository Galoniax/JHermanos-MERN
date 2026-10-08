const Loader = ({ color = "white", size = 6 }) => {
  return (
    <div
      style={{ width: `${size}px`, height: `${size}px`, color }}
      className={`
        animate-spin
        inline-block
        border-4
        border-current
        border-t-transparent
        rounded-full
      `}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loader;