import React from "react";
import { Typography, Card, CardContent} from "@mui/material";
import { Link } from "react-router-dom";

const TeamsList = ({ data }) => {
  return (
    <Link to={`/team/${data.id}`} key={"team-view"}>
      <Card>
        <CardContent>
          <Typography>{data.name}</Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TeamsList;
