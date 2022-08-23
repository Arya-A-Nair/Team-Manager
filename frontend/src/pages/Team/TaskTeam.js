import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import useRequestTeam from "../../hooks/useRequestTeam";
import TaskItemTeam from "./TaskItemTeam";
import Masonry from "react-masonry-css";

const breakpoints = {
	default: 3,
	1100: 2,
	700: 1,
};

export default function TaskAssigned({ id }) {
	const theme = useTheme();
	const [taskList, setTaskList] = useState([
		
	]);
	const { getTasks } = useRequestTeam();

	useEffect(() => {
		getTasks(id, (res) => {
			setTaskList(res);
		});
	}, []);

	return (
		<Box
			sx={{
				marginTop: "7.5vh",
			}}
		>
			<Typography
				variant="h4"
				sx={{
					marginBottom: "5vh",
				}}
			>
				Tasks of the team
			</Typography>
			{taskList.length ? (
				<Paper
				sx={{
					bgcolor: theme.palette.primary.main,
					padding: 2,
					borderRadius: 5,
				}}
			>
				<Masonry
					breakpointCols={breakpoints}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{taskList.map((data) => {
						return <TaskItemTeam data={data} key={data.id} />;
					})}
				</Masonry>
			</Paper>
			):<Typography>
				No Tasks
			</Typography>}

			
		</Box>
	);
}
