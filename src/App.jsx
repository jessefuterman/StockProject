import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const MAX_LENGTH = 80;
  const [textLine, setTextLine] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(e, "what is e");
  }

  function handleChange(event) {
    setTextLine(event.target.value);
    handleSubmit(event.target.value);
    console.log(textLine, "what happens");
  }

  useEffect(() => {}, [textLine]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="submit-wrapper">
        <input className="submission-field" onChange={handleChange}></input>
        {<br />}
      </form>
      {textLine.length > MAX_LENGTH ? (
        <div>{`${textLine.substring(0, MAX_LENGTH)}...`} </div>
      ) : (
        <p>{textLine}</p>
      )}
    </div>
  );
}

export default App;
