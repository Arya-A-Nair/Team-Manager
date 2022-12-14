import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Paper, useTheme, Button } from "@mui/material";
import TaskAssigned from "./TaskAssigned";
import useRequestTeam from "../../hooks/useRequestTeam";
import TaskTeam from "./TaskTeam";
import TeamMember from "./TeamMember";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Team = () => {
	const theme = useTheme();
	const { getTeamData } = useRequestTeam();
	const { id } = useParams();
	const [teamData, setTeamData] = useState({
		name: "",
		code: "",
		created_at: "",
	});

	useEffect(() => {
		getTeamData(id, setTeamData);
	}, [getTeamData]);

	return (
		<>
			<Paper
				elevation={6}
				sx={{
					bgcolor: theme.palette.primary.main,
					paddingTop: "10vh",
					paddingBottom: "10vh",
					paddingRight: "2vw",
					paddingLeft: "2vw",
					borderRadius: 5,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
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
						Code- {teamData.id}
					</Typography>
				</Box>
			</Paper>
				<Button
					variant="contained"
					sx={{
						marginTop: "10vh",
					}}
					to={`create/`}
					component={Link}
				>
					<AddIcon></AddIcon> Add Task
				</Button>
			<TaskAssigned id={id} />
			<TaskTeam id={id} />
			<TeamMember id={id} />
		</>
	);
};

export default Team;
