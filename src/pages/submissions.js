import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { convertFromRaw, Editor } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { FirebaseContext } from "../firebase/provider";
import { Card, Container, Box, Typography, Grid } from "@material-ui/core";

export const Submissions = () => {
  const { database } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const dbRef = database.ref();
    const entriesRef = dbRef.child("entries");
    entriesRef.once("value").then((snapshot) => {
      setData(snapshot.val());
      setLoading(false);
    });
  }, []);

  const convertBlocks = (e) => {
    const blocks = [];
    e.forEach((e) => {
      blocks.push({ ...e, entityRanges: [] });
    });
    return blocks;
  };
  const convertBlockToHTML = (blocks) => {
    return draftToHtml({ blocks });
  };
  const renderBlocks = () => {
    const markup = [];
    for (let phoneNumber in data) {
      markup.push(
        <Container maxWidth="md">
          <Box my={4}>
            <Card>
              <Typography align="center" variant="h4">
                {data[phoneNumber].name} <br />
              </Typography>
              <Typography align="center" variant="h5">
                {phoneNumber}
              </Typography>
              <Box my={5}>
                <Grid
                  container
                  direction="column"
                  className="container"
                  justify="space-between"
                  alignItems="center"
                >
                  <Container
                    dangerouslySetInnerHTML={{
                      __html: convertBlockToHTML(
                        convertBlocks(data[phoneNumber].blocks)
                      ),
                    }}
                  ></Container>
                </Grid>
              </Box>
            </Card>
          </Box>
        </Container>
      );
    }
    // const markup = data.map((d) => <div>{d.name}</div>);
    return markup;
  };
  // const rawContentState = {
  //   blocks: convertBlocks(data.entries[9001522059].blocks),
  // };
  // // console.log(rawContentState);
  // const markup = draftToHtml(rawContentState);
  // console.log(markup);
  return loading ? <h1>Loading....</h1> : renderBlocks();
};
