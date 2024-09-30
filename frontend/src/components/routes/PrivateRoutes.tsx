import { Outlet } from 'react-router-dom';
import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../services/redux/store';
import Loading from './Loading';

const PrivateRoutes: FC = () => {
    const { token } = useSelector((state:RootState)=>state.userReducer); 
    const [ok, setOk] = useState<boolean>(false);
    
    useEffect(() => {
      if(token){ 
        setOk(true);
      }else{ 
        setOk(false);
      }
    }, [token]);

    return ok? <Outlet/>:<Loading/> ;
}
export default PrivateRoutes;