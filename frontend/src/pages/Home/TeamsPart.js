import React, { useEffect, useState } from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";
import axios from "axios";
import getCommonOptions from "../../helpers/getCommonOptions";

const TeamsPart = () => {
  const [teamsList, setTeamsList] = useState([]);

  useEffect(() => {
    axios
      .get("/team/part/", getCommonOptions())
      .then((res) => {
        setTeamsList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          mb: 3,
        }}
      >
        Teams you are a part of:
      </Typography>
      <Box sx={{
        display:"flex",
        flexDirection:"row"
      }}>
        {teamsList.map((data) => {
          return (
            <Card sx={{
              width:"20vw",
              marginRight :"5vw"

            }} key={data.id}>
              <CardContent>
                <Typography>{data.name}</Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </>
  );
};

export default TeamsPart;
