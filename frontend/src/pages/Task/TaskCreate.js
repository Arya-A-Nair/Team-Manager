import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Grid,
	Paper,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	FormHelperText,
	Button,
} from "@mui/material";
import { Formik } from "formik";
import { lightGreen, cyan, amber, red } from "@mui/material/colors";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useRequestTeam from "../../hooks/useRequestTeam";
import useRequestTask from '../../hooks/useRequestTask'

const priorityOptionsData = {
	1: {
		label: "Low",
		color: lightGreen[500],
	},
	2: {
		label: "Medium",
		color: cyan[500],
	},
	3: {
		label: "High",
		color: amber[500],
	},
	4: {
		label: "Critical",
		color: red[500],
	},
};
const priorityOptionsDataList = Object.keys(priorityOptionsData).map((key) => ({
	key,
	...priorityOptionsData[key],
	value: key,
}));

const validationSchema = yup.object({
	name: yup.string().required("Name is required"),
	priority: yup.string().required("Priority is required"),
	member:yup.string().required("Assign this task to someone"),
	deadline:yup.date().required("Enter a Deadline"),
	description:yup.string().required("Enter a description")
});

export default function TaskCreate() {
	const { getMembers } = useRequestTeam();
	const {createTask}=useRequestTask()
	const navigate=useNavigate()
	const [members, setMembers] = useState([]);
	const { id } = useParams();
	useEffect(() => {
		getMembers(id, (res) => {
			setMembers(res);
		});
	}, [id]);
	const initialValues = {
		name: "",
		priority: "",
		member: "",
		deadline:"",
		description:""
	};
	const handleSubmit = (values) => {
		const data={
			team_id:id,
			name:values.name,
			deadline:values.deadline,
			assigned_to:values.member,
			description:values.description,
			priority:values.priority
		}
		createTask(data)
		navigate(`/team/${id}`)
		
	};

	return (
		<Paper
			sx={{
				borderRadius: (theme) => theme.spacing(0.5),
				boxShadow: (theme) => theme.shadows[5],
				padding: (theme) => theme.spacing(3),
			}}
		>
			<Typography variant="h6" mb={4}>
				Create Task
			</Typography>
			<Formik
				initialValues={initialValues}
				validateOnBlur={false}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				{(formik) => {
					return (
						<form onSubmit={formik.handleSubmit}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextField
										fullWidth
										id="name"
										label="Name"
										{...formik.getFieldProps("name")}
										error={formik.touched.name && Boolean(formik.errors.name)}
										helperText={formik.touched.name && formik.errors.name}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										id="description"
										label="description"
										{...formik.getFieldProps("description")}
										error={formik.touched.description && Boolean(formik.errors.description)}
										helperText={formik.touched.description && formik.errors.description}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControl
										sx={{
											width: "100%",
										}}
										error={
											formik.touched.priority && Boolean(formik.errors.priority)
										}
									>
										<InputLabel id="priority-label">Priority</InputLabel>
										<Select
											fullWidth
											labelId="priority-label"
											label="Priority"
											id="priority"
											{...formik.getFieldProps("priority")}
										>
											{Array.isArray(priorityOptionsDataList)
												? priorityOptionsDataList.map((p) => {
														return (
															<MenuItem value={p.value} key={p.value}>
																<Box
																	sx={{
																		display: "flex",
																		alignItems: "center",
																	}}
																>
																	<Box sx={{ ml: 1 }}>{p.label}</Box>
																</Box>
															</MenuItem>
														);
												  })
												: null}
										</Select>
										<FormHelperText>
											{formik.touched.priority && formik.errors.priority}
										</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<FormControl
										sx={{
											width: "100%",
										}}
									>
										<InputLabel id="Assigned-To">Assign To</InputLabel>
										<Select
											fullWidth
											labelId="assign-label"
											label="Assign-To"
											id="member"
											{...formik.getFieldProps("member")}
										>
											{Array.isArray(members)
												? members.map((member) => {
														return (
															<MenuItem value={member.id} key={member.id}>
																<Box
																	sx={{
																		display: "flex",
																		alignItems: "center",
																	}}
																>
																	<Box sx={{ ml: 1 }}>{member.username}</Box>
																</Box>
															</MenuItem>
														);
												  })
												: null}
										</Select>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<TextField
										id="date"
										label="Deadline"
										type="date"
										sx={{ width: 250 }}
										InputLabelProps={{
											shrink: true,
										}}
										{...formik.getFieldProps("deadline")}

									/>
								</Grid>
								<Grid item>
									<Box
										sx={{
											display: "flex",
											margin: (theme) => theme.spacing(1),
											marginTop: (theme) => theme.spacing(3),
										}}
									>
										<Button
											component={Link}
											to={`/team/${id}`}
											size="medium"
											variant="outlined"
											sx={{ mr: 2 }}
										>
											Back
										</Button>

										<Button
											type="submit"
											size="medium"
											variant="contained"
											color="primary"
										>
											Submit
										</Button>
									</Box>
								</Grid>
							</Grid>
						</form>
					);
				}}
			</Formik>
		</Paper>
	);
}
