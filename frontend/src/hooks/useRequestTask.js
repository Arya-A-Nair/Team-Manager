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

    const updateComplete=useCallback((id)=>{
        axios.post('/team/updateComplete/',{task_id:id},getCommonOptions())
        .then((res)=>{
            enqueueSnackbar("Task completed")
        })
        .catch((err)=>{
            handleError(err)
        })

    },[enqueueSnackbar,handleError])


    return {
        updateComplete
    }
}