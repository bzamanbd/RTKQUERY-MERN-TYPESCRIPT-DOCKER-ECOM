import { FC, useEffect } from 'react'
import RouterWrapper from './router/RouterWrapper'
import { useDispatch } from 'react-redux'
import { userExist, userNotExist } from './services/redux/reducer/userReducer';

const App: FC = ()=> {
  const dispatch = useDispatch(); 
  const userString = localStorage.getItem("auth"); 
  const user = userString? JSON.parse(userString) : null;
  useEffect(() => {
    if(user){ 
      dispatch(userExist(user));
    }else{ 
      dispatch(userNotExist());
    }
  }, [dispatch, user]);
  return (
    <>
      <RouterWrapper/> 
    </>
  )
}

export default App
