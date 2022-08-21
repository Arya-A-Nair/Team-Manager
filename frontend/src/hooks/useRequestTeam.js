import React, { useCallback } from "react";
import axios from "axios";
import getCommonOptions from "../helpers/getCommonOptions";
import { useSnackbar } from "notistack";
import formatHttpApiError from "../helpers/formatHttpAPIError";

export default function useRequestTeam() {
  const {enqueueSnackbar}=useSnackbar()


	const handleError = useCallback(
		(err) => {
			const formattedError = formatHttpApiError(err);
			enqueueSnackbar(formattedError);
		},
		[enqueueSnackbar]
	);

	const getTeamData = useCallback((id, setTeamData) => {
		axios
			.post("/team/getTeamData/", { team_id: id }, getCommonOptions())
			.then((res) => {
				setTeamData(res.data);
			})
			.catch((err) => {
        handleError(err)
			});
	}, []);

  const getAssignedTasks=useCallback((id,successCallback)=>{
    axios.post('/team/getTaskAssigned/',{team_id:id},getCommonOptions())
	.then((res)=>{
		successCallback(res.data)
	})
	.catch((err)=>{
		handleError(err)
		return []
	})
  })

  const getTasks=useCallback((id,successCallback)=>{
    axios.post('/team/getTasks/',{team_id:id},getCommonOptions())
	.then((res)=>{
		successCallback(res.data)
	})
	.catch((err)=>{
		handleError(err)
		return []
	})
  })

  	
	return {
		getTeamData,
		getAssignedTasks,
		getTasks
	};
}
