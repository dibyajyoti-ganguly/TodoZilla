/* eslint-disable no-unused-vars */
import A from "../assets/a.png";

const Card = ({ list, setList }) => {
  const addTodo = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        item: document.getElementById("item").value,
      }),
    });

    const inputField = document.getElementById("item");
    inputField.value = "";

    const result = await response.json();
    console.log(result);
    if (response.status === 200) {
      setList(result);
    }
  };

  return (
    <div className="w-1/3 h-[600px] bg-white rounded-2xl shadow-2xl font-mono">
      <img src={A} alt="letter-a" className="w-12 mt-12 ml-10" />
      <h1 className="text-3xl mt-6 ml-10 font-black">Todozilla</h1>
      <p className="text-base mt-3 mx-10 text-gray-500 ">
        A sleek, productivity app that empowers you to capture and organize
        tasks with intuitive UI, & seamless performance across devices.
      </p>
      <div className="mt-8 ml-10 text-xl">
        {list.map((item, index) => {
          return (
            <div className="flex">
              <input type="checkbox" className="mb-2.5 mr-6" />
              <li className="list-none mb-3 font-black">
                {item.toUpperCase()}
              </li>
            </div>
          );
        })}
      </div>
      <div className="flex mt-10">
        <input
          id="item"
          type="text"
          className="w-60 h-10 ml-24 mr-3 px-4 bg-zinc-300 rounded-lg shadow-2xl"
        />
        <button
          onClick={addTodo}
          className="bg-orange-500 w-10 h-10 rounded-lg text-2xl shadow-2xl cursor-pointer border-2 border-black"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Card;
