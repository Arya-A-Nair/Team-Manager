import React, { useCallback } from "react";
import axios from "axios";
import getCommonOptions from "../helpers/getCommonOptions";
import { useSnackbar } from "notistack";
import formatHttpApiError from "../helpers/formatHttpAPIError";

export default function useRequestTeam() {
	const { enqueueSnackbar } = useSnackbar();

	const handleError = useCallback(
		(err) => {
			const formattedError = formatHttpApiError(err);
			enqueueSnackbar(formattedError);
		},
		[enqueueSnackbar]
	);

	const getTeamData = useCallback(
		(id, setTeamData) => {
			axios
				.post("/team/getTeamData/", { team_id: id }, getCommonOptions())
				.then((res) => {
					setTeamData(res.data);
				})
				.catch((err) => {
					handleError(err);
				});
		},
		[getCommonOptions,handleError]
	);

	const getAssignedTasks = useCallback((id, successCallback) => {
		axios
			.post("/team/getTaskAssigned/", { team_id: id }, getCommonOptions())
			.then((res) => {
				successCallback(res.data);
			})
			.catch((err) => {
				handleError(err);
				return [];
			});
	}, [getCommonOptions,handleError]);

	const getTasks = useCallback((id, successCallback) => {
		axios
			.post("/team/getTasks/", { team_id: id }, getCommonOptions())
			.then((res) => {
				successCallback(res.data);
			})
			.catch((err) => {
				handleError(err);
				return [];
			});
	}, [handleError,getCommonOptions]);

	const getMembers = useCallback(
		(id, successCallback) => {
			axios
				.post("/team/getMembers/", { team_id: id }, getCommonOptions())
				.then((res) => {
					successCallback(res.data);
				})
				.catch((err) => {
					handleError(err);
				});
		},
		[getCommonOptions,handleError]
	);

	const joinTeam = useCallback(
		(code) => {
			axios
				.post("/team/joinTeamCode/", { team_id: code }, getCommonOptions())
				.then((res) => {})
				.catch((err) => {
					handleError(err);
				});
		},
		[getCommonOptions,handleError]
	);

	const createTeam = useCallback(
		(name, successCallback) => {
			axios
				.post("/team/createTeam/", { name }, getCommonOptions())
				.then((res) => {
					successCallback(res.data["id"]);
				})
				.catch((err) => {
					handleError(err);
				});
		},
		[getCommonOptions,handleError]
	);
	return {
		getTeamData,
		getAssignedTasks,
		getTasks,
		getMembers,
		joinTeam,
		createTeam,
	};
}
