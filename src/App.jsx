import { useState, useRef } from "react";
import "./App.css";

function App() {
  const inputref = useRef();
  const ACCESS_KEY = "0hdgaQf7y1o06SZbgi9ALvS7jWXgdA2eYJ_nrGJAGm4";
  const [results, setResults] = useState([]);
  async function getImg() {
    if (inputref.current.value.trim() != "") {
      const response = await fetch(
        `https://api.unsplash.com/search/photos/?query=${inputref.current.value}&per_page=28&client_id=${ACCESS_KEY}`
      );
      let data = await response.json();
      console.log(data);
      setResults(data.results);
    } else {
      inputref.current.placeholder = "Enter keyword to get images";
    }
  }

  return (
    <>
      <div className="header flex">Image Search App <img className="w-12" src=".\animated-img.gif"/></div>
      <div className="search flex gap-2 w-full items-center content-center justify-center p-5">
        <input
          className="search-bar p-2"
          ref={inputref}
          type="text"
          placeholder="Search"
        />
        <button className="bg-blue-700 search-btn" onClick={getImg}>
          Get Images
        </button>
      </div>
      <div className="main flex flex-wrap w-full gap-2 p-2 justify-center items-center">
        {results.map((item) => {
          return (
            <a href={item.links.html} target="_blank">
              <div
                key={item.id}
                className="card flex flex-col items-center justify-center bg-white"
              >
                <img src={item.urls.small} alt="" />
                <h3 className="p-2">{item.alt_description}</h3>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

export default App;
