import Logo from "../assets/todozilla.png";

const Header = ({ toggle, setToggle }) => {
  return (
    <div className="flex justify-between items-center m-8 font-mono text-lg font-extrabold antialiased">
      <div className="flex items-center">
        <img className="w-10 mr-3" src={Logo} alt="Todo Logo" />
        <h1>TODOZILLA</h1>
      </div>

      <button
        onClick={() => {
          setToggle(!toggle);
        }}
        className="bg-black text-white text-base w-28 h-10 rounded-md tracking-tighter font-medium cursor-pointer"
      >
        {toggle ? "Sign Up" : "Sign In"}
      </button>
    </div>
  );
};

export default Header;
