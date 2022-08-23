import React from "react";
import { Card, Typography, CardContent, Checkbox, Box } from "@mui/material";

import useRequestTask from "../../hooks/useRequestTask";

const priorityColor = {
	1: "#00e676",
	2: "#ffea00",
	3: "#ed4b82",
	4: "#a31545",
};

export default function TaskItem({ data }) {
	const { updateComplete } = useRequestTask();

	const handleUpdateComplete = () => {
		updateComplete(data.id);
		window.location.reload();
	};

	return (
		<Card
			sx={{
				maxWidth: 275,
				borderRadius: 4,
				borderLeft: `1em solid ${priorityColor[data.priority]}`,
			}}
			key={data.id}
		>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box>
					<Typography variant="h5" >{data.name}</Typography>
                    <Typography variant="subtitle2">Assigned To {data.assigned_to}</Typography>
				</Box>
				<Checkbox
					checked={data.completed}
					onClick={handleUpdateComplete}
				></Checkbox>
			</CardContent>
		</Card>
	);
}
