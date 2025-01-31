import { useDispatch,useSelector } from 'react-redux';
import {login,logout} from './AuthSlice.jsx'
const useAuth = () => {


    const dispatch = useDispatch()
    const {token,role,isLoggedIn} = useSelector((state)=>state.auth)


    const storeTokenInLS = (serverToken,userRole)=>{
        dispatch(login({token:serverToken,role:userRole}))
    }
    
    
    const handleLogout = () =>{
        dispatch(logout())
    }
    return {
        token,
        role,
        isLoggedIn,
       
        storeTokenInLS,
        handleLogout,
      };
    
}

export default useAuth