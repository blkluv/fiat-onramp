const Button = ({ children, onClick, disabled = false }: any) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-black text-white py-2 px-8 rounded-full hover:bg-opacity-80"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
