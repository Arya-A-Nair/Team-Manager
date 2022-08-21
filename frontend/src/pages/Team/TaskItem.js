import React from 'react'
import { Card,Typography,CardContent,Checkbox } from '@mui/material'
import axios from 'axios'
import getCommonOptions from '../../helpers/getCommonOptions'
import useRequestTask from '../../hooks/useRequestTask'


export default function TaskItem({data}) {
    const {updateComplete} = useRequestTask()
    


    const handleUpdateComplete=()=>{
        updateComplete(data.id)
        window.location.reload()
    }


  return (
    <Card sx={{
        maxWidth:275
    }} key={data.id}>
        <CardContent>
            <Typography variant="h5">
                {data.name}
            </Typography>
            <Typography>
                {data.description}
            </Typography>
            <Checkbox checked={data.completed} onClick={handleUpdateComplete}></Checkbox>
        </CardContent>
    </Card>
  )
}
