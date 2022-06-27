import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";

import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, CircularProgress } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function ScrollDialog({ text, onClear }) {
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState("");

  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    onClear();
  };

  const descriptionElementRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const url = "https://hidden-eyrie-99411.herokuapp.com";
  React.useEffect(() => {
    if (text) {
      setLoading(true);
      setError(false);
      fetch("https://hidden-eyrie-99411.herokuapp.com/wordSearch?word=" + text)
        .then((res) => res.json())
        .then((r) => {
          console.log(r);
          if (r.error) {
            setError(true);
            setLoading(false);
            return;
          }
          setData(r);
          setLoading(false);
        })
        .catch((e) => setError(true));
    }
  }, [text]);

  function handleAudio(lg, i) {
    try {
      const f =
        data[lg].results[0].lexicalEntries[0].entries[0].pronunciations[i]
          .audioFile;
      console.log(f);
      const music = new Audio(f);
      music.play();
    } catch (e) {}
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Word Query</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          {error && <Alert severity="error">Something went wrong!!!</Alert>}
          {loading && (
            <div
              style={{
                height: "200px",
                width: "350px",
                textAlign: "center",
                verticalAlign: "middle",
              }}
            >
              <CircularProgress />
            </div>
          )}
          {!loading && (
            <div
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              style={{ height: "200px", width: "350px" }}
            >
              <strong>{data?.gb?.word}</strong>
              <br />
              {/* <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange1}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box> */}

              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="GB" />
                  <Tab label="US" />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                {data && (
                  <>
                    {data.gb.results[0].lexicalEntries[0].entries[0].pronunciations.map(
                      (x, i) => (
                        <IconButton
                          color="primary"
                          key={i}
                          onClick={() => handleAudio("gb", i)}
                          component="span"
                        >
                          <VolumeUp />
                        </IconButton>
                      )
                    )}
                    <div>
                      {data.gb.results[0].lexicalEntries[0].entries[0].pronunciations.map(
                        (x, i) => (
                          <span key={i}>{x.phoneticSpelling} &nbsp;</span>
                        )
                      )}
                    </div>
                    <hr />
                  </>
                )}
              </TabPanel>
              <TabPanel value={value} index={1}>
                {data && (
                  <>
                    {data.us.results[0].lexicalEntries[0].entries[0].pronunciations.map(
                      (x, i) => (
                        <IconButton
                          key={i}
                          color="primary"
                          onClick={() => handleAudio("us", i)}
                          component="span"
                        >
                          <VolumeUp />
                        </IconButton>
                      )
                    )}
                    <div>
                      {data.us.results[0].lexicalEntries[0].entries[0].pronunciations.map(
                        (x, i) => (
                          <span key={i}>{x.phoneticSpelling} &nbsp;</span>
                        )
                      )}{" "}
                      &nbsp;
                    </div>
                    <hr></hr>
                    <div>
                      {/* {data.us.results[0].lexicalEntries.map((entry, i) => {
                      const label = <Chip label={entry.lexicalCategory.text} />;
                      let def = null,
                        examples = [],
                        syn = [];
                      entry.entries[0].senses.map((sense) => {
                        def =
                          sense.definitions?.[0] || sense.shortDefinitions?.[0];
                        examples = sense.examples
                          ? sense.examples.map((ex) => ex.text)
                          : [];
                        syn = sense.synonyms
                          ? sense.synonyms.map((ex) => ex.text)
                          : [];
                      });
                      const phrases = entry.phrases
                        ? entry.phrases.map((x) => x.text)
                        : [];
                      return (
                        <React.Fragment key={i}>
                          {label} <br />
                          <i>Defintion:</i> {def} <br />
                          {examples.length > 0 && <i>Examples</i>}
                          {examples.map((ex, i) => (
                            <div key={i} style={{ margin: "4px" }}>
                              {ex}
                            </div>
                          ))}
                          <br />
                          {syn.length > 0 && <i>Synonyms</i>}
                          <div>
                            {syn.map((ex, i) => (
                              <span key={i}>{ex}, </span>
                            ))}
                          </div>
                        </React.Fragment>
                      );
                    })} */}
                    </div>
                  </>
                )}
              </TabPanel>
              {data &&
                data.gb.results[0].lexicalEntries.map((entry, i) => {
                  const label = <Chip label={entry.lexicalCategory.text} />;

                  const senses = entry.entries[0].senses.map((sense) => {
                    let defs = [],
                      examples: any = [],
                      syn = [];
                    if (sense.definitions && sense.definitions.length > 0) {
                      defs = sense.definitions;
                    } else if (
                      sense.shortDefinitions &&
                      sense.shortDefinitions.length > 0
                    ) {
                      defs = sense.shortDefinitions;
                    }
                    // defs = sense.definitions?.[0] || sense.shortDefinitions?.[0];
                    examples = sense.examples
                      ? sense.examples.map((ex) => ex.text)
                      : [];
                    syn = sense.synonyms
                      ? sense.synonyms.map((ex) => ex.text)
                      : [];
                    return { examples, defs, syn };
                  });
                  const phrases = entry.phrases
                    ? entry.phrases.map((x) => x.text)
                    : [];
                  
                  return (
                    <React.Fragment key={i}>
                      {label} <br />
                      {senses.map((sense,i) => (
                        <React.Fragment key={i}>
                          <span style={{marginTop:"10px",display:"inline-block"}}><strong>#{i+1}</strong></span><br/>
                          <span
                            style={{
                              marginTop: "10px",
                              display: "inline-block",
                            }}
                          >
                            <i>Defintion:</i>
                          </span>{" "}
                          <br />
                          {sense.defs.map((ex, i) => (
                            <div key={i} style={{ margin: "4px" }}>
                              {i + 1}. {ex}
                            </div>
                          ))}
                          {sense.examples.length > 0 && (
                            <span
                              style={{
                                marginTop: "10px",
                                display: "inline-block",
                              }}
                            >
                              <i>Examples</i>
                            </span>
                          )}
                          {sense.examples.map((ex, i) => (
                            <div key={i} style={{ margin: "4px" }}>
                              {i + 1}. {ex}
                            </div>
                          ))}
                          {sense.syn.length > 0 && (
                            <span
                              style={{
                                marginTop: "10px",
                                display: "inline-block",
                              }}
                            >
                              <i>Synonyms:</i>
                            </span>
                          )}
                          <div>
                            {sense.syn.map((ex, i, arr) => (
                              <span style={{ display: "inline-block" }} key={i}>
                                {ex}
                                {i < arr.length - 1 ? "," : ""}&nbsp;
                              </span>
                            ))}
                          </div>
                        </React.Fragment>
                      ))}
                      <br />
                      {phrases.length > 0 && (
                        <span
                          style={{ marginTop: "10px", display: "inline-block" }}
                        >
                          <i>Phrases:</i>
                        </span>
                      )}
                      <div>
                        {phrases.map((ex, i, arr) => (
                          <span style={{ display: "inline-block" }} key={i}>
                            {ex}
                            {i < arr.length - 1 ? "," : ""}&nbsp;
                          </span>
                        ))}
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
