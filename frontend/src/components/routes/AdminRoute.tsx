import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../services/redux/store"
import Loading from "./Loading";
import { Outlet } from "react-router-dom";

const AdminRoute: FC = () => {
    const {token,user} = useSelector((state:RootState)=>state.userReducer);
    const [ok, setOk] = useState<boolean>(false);
    useEffect(() => {
        const isAdmin:boolean = !!user && user.role ==='admin' && !!token;
        setOk(isAdmin); 
    }, [token,user])
    if(user === null)return <Loading/>;
    
    return ok? <Outlet/> :<Loading/>;
}

export default AdminRoute
