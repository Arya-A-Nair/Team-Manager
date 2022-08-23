import React, { useEffect, useState } from "react";
import { Typography,  Box } from "@mui/material";

import Masonry from "react-masonry-css";
import axios from "axios";
import getCommonOptions from "../../helpers/getCommonOptions";
import "../../index.css";
import TeamsList from "./TeamsList";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

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
        variant="h4"
        component="h2"
        sx={{
          mb: 3,
        }}
      >
        Teams you are a part of:
      </Typography>
      <Box>
      {teamsList.length ?(
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
        
          {teamsList.map((data) => {
            return (
              <div key={data.id}>
                <TeamsList data={data}/>
              </div>
            );
          })}
        </Masonry>
      ):<Typography>You haven't joined any teams</Typography>}
        
      </Box>
    </>
  );
};

export default TeamsPart;
