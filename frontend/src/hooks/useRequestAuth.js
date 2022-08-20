import { useState,useContext, useCallback} from 'react'
import axios from 'axios'
import formatHttpApiError from '../helpers/formatHttpAPIError'
import { AuthContext } from '../contexts/AuthContextsPovider'
import { useSnackbar } from 'notistack'
import getCommonOptions from '../helpers/getCommonOptions'

export default function useRequestAuth(){
    const [loading,setLoading]=useState(false)
    const {setIsAuthenticated,setUser}=useContext(AuthContext)
  const [logoutPending, setLogoutPending] = useState(false);

    const  {enqueueSnackbar}=useSnackbar()


    const handleError=useCallback((err)=>{
        const formattedError = formatHttpApiError(err);
        enqueueSnackbar(formattedError)
        setLoading(false);
    },[enqueueSnackbar,setLoading])


    const login=useCallback(({username,password}, successCallback)=>{
        setLoading(true)
        axios.post("/api/auth/token/login/",{username,password})
        .then((res)=>{
            const {auth_token}=res.data
            localStorage.setItem('authToken',auth_token)
            setLoading(false)
            setIsAuthenticated(true)
            if(successCallback){
                successCallback();
            }
        }).catch(handleError)
    },[setLoading,setIsAuthenticated, handleError])

    const register=useCallback(({username,email,password},successCallback)=>{
        setLoading(true)
        axios.post("/api/auth/users/",{
            username,
            password,
            email
        })
        .then(()=>{
            enqueueSnackbar("Successfully Signed Up")
            setLoading(false)
            if(successCallback){
                successCallback()
            }
        }).catch(handleError)
    },[enqueueSnackbar,setLoading,handleError])

    const logout = useCallback(() => {
        setLogoutPending(true);
        axios
          .post("/api/auth/token/logout/",null, getCommonOptions())
          .then(() => {
            localStorage.removeItem("authToken");
            setLogoutPending(false);
            setIsAuthenticated(false);
            setUser(null)
          })
          .catch((err) => {
            setLogoutPending(false);
            handleError(err);
          });
      }, [handleError, setLogoutPending, setIsAuthenticated,setUser]);

    return {
        loading,
        login,
        register,
        logout,
        logoutPending
    }
}