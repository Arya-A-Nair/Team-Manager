import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import getCommonOptions from "../../helpers/getCommonOptions";
import { Typography, Box, Paper } from "@mui/material";
import TaskAssigned from "./TaskAssigned";
import useRequestTeam from "../../hooks/useRequestTeam";
import TaskTeam from './TaskTeam'

const Team = () => {
	const {getTeamData}=useRequestTeam()
	const { id } = useParams();
	const [teamData, setTeamData] = useState({
		name: "",
		code: "",
		created_at: "",
	});

	useEffect(() => {
		getTeamData(id,setTeamData)
	}, []);

	return (
		<>
			<Paper
				variant="outlined"
				sx={{
					bgcolor: "#121212",
					paddingTop: "10vh",
					paddingBottom: "10vh",
					paddingRight: "2vw",
					paddingLeft: "2vw",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography
						variant="h3"
						sx={{
							color: "white",
						}}
					>
						{teamData.name}
					</Typography>
					<Typography
						variant="h5"
						sx={{
							color: "white",
						}}
					>
						Code- {teamData.code}
					</Typography>
				</Box>
			</Paper>
			<TaskAssigned id={id}/>
			<TaskTeam id={id}/>
		</>
	);
};

export default Team;
