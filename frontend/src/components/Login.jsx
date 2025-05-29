import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  async function handleClick() {
    const response = await fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    });

    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
      localStorage.setItem("token", result.token);
      navigate("/zilla");
    }
  }

  return (
    <div className="flex flex-col items-center mt-14">
      <div className="flex items-center gap-4 w-1/3">
        <div className="flex-grow border-t-2 border-black"></div>
        <span className="text-base text-black whitespace-nowrap">
          Login with your email
        </span>
        <div className="flex-grow border-t-2 border-black"></div>
      </div>
      <input
        className="px-4 border-2 border-black mt-8 w-1/3 h-14 rounded-lg bg-gray-200"
        type="email"
        id="email"
        placeholder="name@company.com"
      />
      <input
        className="px-4 border-2 border-black mt-8 w-1/3 h-14 rounded-lg bg-gray-200"
        type="password"
        id="password"
        placeholder="password"
      />
      <button
        onClick={handleClick}
        className="border-2 border-blue-700 mt-8 w-1/3 h-14 rounded-lg bg-blue-500 text-white text-lg font-extrabold cursor-pointer"
      >
        Sign In
      </button>
    </div>
  );
};

export default Login;
