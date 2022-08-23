import React from "react";
import { Typography, Card, CardContent, Paper, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

const TeamsList = ({ data }) => {
  const theme=useTheme()
	return (
			<Paper  elevation={12} sx={{
        bgcolor:theme.palette.primary.main,
        borderRadius:5
      }}>
				<Card component={Link} to={`/team/${data.id}`}sx={{
          textDecoration:"None",
          color:"white"
          
        }}>
					<CardContent sx={{
						textAlign:"center"
					}}>
						<Typography variant="h5">{data.name}</Typography>
					</CardContent>
				</Card>
			</Paper>
	);
};

export default TeamsList;
