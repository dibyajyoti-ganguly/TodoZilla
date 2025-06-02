import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const Zilla = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/todo", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        console.log(result);
        setList(result); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function Logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Logout button at top */}
      <div className="p-4 flex justify-end">
        <button
          onClick={Logout}
          className="px-4 py-2 bg-orange-500 font-mono text-black rounded-md border-2 border-black shadow-md cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Card container taking the remaining height */}
      <div className="flex-grow flex justify-center items-center">
        <Card list={list} setList={setList} />
      </div>
    </div>
  );
};

export default Zilla;
