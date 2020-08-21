import React, { useEffect, useState } from "react";
import { FirebaseContext } from "./../firebase/provider";
import { useContext } from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import logo from "./../assets/logo.jpeg";
import "./../App.css";
import {
  Card,
  Input,
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
  Button,
  TextField,
} from "@material-ui/core";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const Form = () => {
  const { database } = useContext(FirebaseContext);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submission, setSubmission] = useState(null);
  const [content, setContent] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const dbRef = database.ref();
  const entriesRef = dbRef.child("entries");
  const addEntry = () => {
    setBtnDisabled(true);
    if (name === "") {
      alert("Name cannot be blank!");
      setBtnDisabled(false);
      return;
    }
    if (phone === "") {
      alert("Phone number cannot be blank!");
      setBtnDisabled(false);
      return;
    }
    if (
      content === null ||
      content.blocks === undefined ||
      content.blocks.length === 0 ||
      content.blocks[0].text === ""
    ) {
      alert("Story cannot be blank!");
      return;
    }
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
      entriesRef.child(`${phone}`).once("value", (snapshot) => {
        if (snapshot.exists()) {
          alert("Already submitted!");
          setBtnDisabled(false);
          return;
        } else {
          entriesRef.update({
            [phone]: { name, phone, blocks: content.blocks },
          });
          setIsSubmitted(true);
        }
      });
    }
  };
  return isSubmitted ? (
    <Container maxWidth="md">
      <Box my={4}>
        <Card>
          <Typography align="center" variant="h2">
            Your submission has been recorded
          </Typography>
        </Card>
      </Box>
    </Container>
  ) : (
    <Container maxWidth="md">
      <Box my={4}>
        <Card>
          <Grid
            container
            direction="column"
            className="container"
            justify="space-between"
            alignItems="center"
          >
            <Typography align="center" variant="h4">
              Write here, write now!
            </Typography>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <img alt="The Scribble Squad Logo" src={logo}></img>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  inputProps={{
                    style: { fontSize: 25 },
                  }}
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="my-input">Phone number</InputLabel>
                <Input
                  onChange={(e) => setPhone(e.target.value)}
                  inputProps={{
                    style: { fontSize: 25 },
                    maxLength: 10,
                  }}
                  aria-describedby="my-helper-text"
                />
                <FormHelperText id="my-helper-text">
                  We'll never share your phone number.
                </FormHelperText>
              </FormControl>
            </Grid>
            <div className="mainContainer">
              <Typography align="center" variant="h5">
                Your story
              </Typography>
              <Editor
                editorState={submission}
                onContentStateChange={setContent}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setSubmission}
              />
            </div>
            <Button
              disabled={btnDisabled}
              onClick={addEntry}
              color="primary"
              variant="contained"
            >
              Submit!
            </Button>
          </Grid>
        </Card>
      </Box>
    </Container>
  );
}