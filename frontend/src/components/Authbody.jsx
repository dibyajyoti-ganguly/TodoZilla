import Signup from "./Signup";
import Login from "./Login";

const Authbody = ({ toggle }) => {
  return (
    <div className="flex flex-col mt-14 font-mono">
      <h1 className="flex justify-center text-5xl font-extrabold ">Welcome</h1>
      {toggle ? <Login /> : <Signup />}
    </div>
  );
};

export default Authbody;
