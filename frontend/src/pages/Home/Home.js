import React, { useState } from "react";
import TeamsPart from "./TeamsPart";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import { Formik } from "formik";
import useRequestTeam from "../../hooks/useRequestTeam";

const Home = () => {
	const [openModal, setOpenModal] = useState(false);
	const {joinTeam}=useRequestTeam()

	const handleSubmit = (values) => {
		joinTeam(values['code'])
		window.location.reload()
	};

	return (
		<>
			<Button
				variant="contained"
				sx={{
					width: "10vw",
					marginBottom: "5vh",
				}}
				onClick={() => {
					setOpenModal(!openModal);
				}}
			>
				Join Team
			</Button>

			<Dialog open={openModal}>
				<Formik
					initialValues={{
						code: "",
					}}
					onSubmit={handleSubmit}
				>
					{(formik) => {
						return (
							<form onSubmit={formik.handleSubmit}>
								<DialogContent>
									<TextField
										variant="outlined"
										label="Enter Code"
										id="code"
										{...formik.getFieldProps("code")}
									/>
								</DialogContent>
								<DialogActions>
									<Button
										onClick={() => {
											setOpenModal(false);
										}}
									>
										Close
									</Button>
									<Button type="submit">Submit</Button>
								</DialogActions>
							</form>
						);
					}}
				</Formik>
			</Dialog>

			<TeamsPart />
		</>
	);
};

export default Home;
