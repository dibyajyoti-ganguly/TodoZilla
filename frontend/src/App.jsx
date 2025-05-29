import Header from "./components/Header";
import Authbody from "./components/Authbody";
import { useState } from "react";

const App = () => {
  const [toggle, setToggle] = useState(0);

  return (
    <div>
      <Header toggle={toggle} setToggle={setToggle} />
      <Authbody toggle={toggle} />
    </div>
  );
};

export default App;
