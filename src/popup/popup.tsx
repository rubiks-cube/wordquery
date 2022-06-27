import React from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AlertBox from "../contentScript/alertBox";

const App: React.FC<{}> = () => {
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  function handleSearch() {
    let word = name.trim().split(" ")[0].split(",")[0].toLowerCase();
    if (word) {
      setText(word);
    } else {
      setText(null);
    }
  }
  return (
    <div
      style={{
        width: "350px",
        height: "300px",
        overflow: "auto", 
        padding: "12px",
      }}
    >
      <TextField
        id="outlined-name"
        label="Word"
        style={{ width: "66%", marginRight: "8px" }}
        value={name}
        size="small"
        placeholder="Enter a word"
        onChange={handleChange}
      />
      <Button variant="contained" disableElevation onClick={handleSearch}>
        Search
      </Button>
      <div style={{height:"14px"}}></div>
      {text && <AlertBox text={text} onClear={() => setText(null)} />}
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
