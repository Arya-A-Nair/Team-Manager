import React from "react";
import {
	Card,
	Typography,
	CardContent,
	Checkbox,
	
} from "@mui/material";
import useRequestTask from "../../hooks/useRequestTask";

export default function TaskItem({ data }) {
	
	return (
		<Card
			sx={{
				maxWidth: 275,
				flexGrow: 1,
                borderRadius:5
			}}
		>
			<CardContent>
				<Typography variant="h5">{data.username}</Typography>
				<Typography>{data.email}</Typography>
			</CardContent>
		</Card>
	);
}
