import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import "./options.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const countrylist = {
  ar: "Arabic",
  de: "German",
  es: "Spanish",
  hi: "Hindi",
  ru: "Russian",
  zh: "Chinese",
};

const App: React.FC<{}> = () => {
  const [lang, setLang] = React.useState("ru");
 
  const handleChange = (event: SelectChangeEvent) => {
    setLang(event.target.value as string);
  };

  useEffect(()=>{
    console.log(lang)
     chrome.storage.sync.set({lang},()=>{
      console.log(99)
     })
  },[lang])
  return (
    <Box sx={{ minWidth: 50 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          Default translate language
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          label="Default translate language"
          onChange={handleChange}
        >
          {Object.keys(countrylist).map((i) => (
            <MenuItem value={i} key={i}>{countrylist[i]}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
