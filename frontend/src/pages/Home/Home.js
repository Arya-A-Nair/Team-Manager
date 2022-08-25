import React, { useState } from "react";
import TeamsPart from "./TeamsPart";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
} from "@mui/material";
import { Formik } from "formik";
import useRequestTeam from "../../hooks/useRequestTeam";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const Home = () => {
	const [openModal, setOpenModal] = useState(false);
	const { joinTeam } = useRequestTeam();

	const handleSubmit = (values) => {
		joinTeam(values["code"]);
		window.location.reload();
	};

	return (
		<>
			<Fab
				color="primary"
				aria-label="add"
				sx={{
					position: "absolute",
					bottom: "10vh",
					right: "10vw",
					scale:"150%"
				}}
				onClick={() => {
					setOpenModal(!openModal);
				}}
			>

				<AddIcon />
			</Fab>

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
