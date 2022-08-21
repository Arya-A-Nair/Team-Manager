import React, { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import useRequestTeam from "../../hooks/useRequestTeam";
import TaskItem from "./TaskItem";
import Masonry from "react-masonry-css";

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function TaskAssigned({ id }) {
	const [taskList, setTaskList] = useState([
		{
			name: "arya",
		},
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
			<Typography variant="h4" sx={{
        marginBottom:"5vh"
      }}>Task Assigned</Typography>
			<Paper
				sx={{
					bgcolor: "#121212",
					padding: "5vw",
				}}
			>
				<Masonry
					breakpointCols={breakpoints}
					className="my-masonry-grid"
					columnClassName="my-masonry-grid_column"
				>
					{taskList.map((data) => {
						return <TaskItem data={data}  key={data.id}/>;
					})}
				</Masonry>
			</Paper>
		</Box>
	);
}
