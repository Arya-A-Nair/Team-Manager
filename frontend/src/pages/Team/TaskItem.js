import React from "react";
import {
	Card,
	Typography,
	CardContent,
	CardActionArea,
	Box,
	Checkbox,
} from "@mui/material";
import useRequestTask from "../../hooks/useRequestTask";
import CalendarTodayTwoToneIcon from "@mui/icons-material/CalendarTodayTwoTone";

const priorityColor = {
	1: "#00e676",
	2: "#ffea00",
	3: "#ed4b82",
	4: "#a31545",
};

export default function TaskItem({ data }) {
	const { updateComplete } = useRequestTask();

	console.log(data);
	const handleUpdateComplete = () => {
		updateComplete(data.id);
		window.location.reload();
	};

	return (
		<Card
			sx={{
				maxWidth:350,
				// textAlign:"center",
				borderLeft: `2em solid ${priorityColor[data.priority]}`,
				borderRadius: 5,
				marginTop:2.5

			}}
		>
			<CardActionArea>
				<CardContent>
					<Box sx={{
						display:"flex",
						flexDirection:"row",
						justifyContent:"space-between"
					}}>
					<Box>

						<Typography gutterBottom variant="h5" component="div">
							{data.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{data.description}
						</Typography>
					</Box>
					<Checkbox
						checked={data.completed}
						onClick={handleUpdateComplete}
					/>
					</Box>
					<Box
						sx={{
							marginTop: "10%",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
							}}
						>
							<CalendarTodayTwoToneIcon />
							<Typography sx={{ marginLeft: "3%" }}>{data.deadline}</Typography>
						</Box>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
