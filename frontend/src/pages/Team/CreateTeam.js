import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Paper, Typography, TextField, Box, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import useRequestTeam from "../../hooks/useRequestTeam";

const validationSchema = yup.object({
	name: yup.string().required("Name is required"),
});

export default function CreateTeam() {
	const navigate = useNavigate();
    const {createTeam}=useRequestTeam();
	const initialValues = {
		name: "",
	};
	const handleSubmit = (values) => {
		createTeam(values["name"],(res)=>{
            navigate(`/team/${res}`)
        })
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
											to={`/`}
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
