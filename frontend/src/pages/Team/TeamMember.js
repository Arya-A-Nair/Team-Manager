import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import useRequestTeam from "../../hooks/useRequestTeam";
import MemberItem from "./MemberItem";
import Masonry from "react-masonry-css";

const breakpoints = {
	default: 3,
	1100: 2,
	700: 1,
};

export default function TeamMember({ id }) {
	const theme = useTheme();
	const [members, setMember] = useState([]);
	const { getMembers } = useRequestTeam();
	useEffect(() => {
		getMembers(id, (res) => {
			setMember(res);
		});
	}, [getMembers, setMember, id]);

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
				Team Members
			</Typography>

			{members.length ? (
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
						{members.map((data, index) => {
							return <MemberItem data={data} key={index} />;
						})}
					</Masonry>
				</Paper>
			) : (
				<Typography>No Tasks</Typography>
			)}
		</Box>
	);
}
