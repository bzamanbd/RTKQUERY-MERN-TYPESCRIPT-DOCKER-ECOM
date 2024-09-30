import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import loadingPic from '../../assets/loading2.gif'

const Loading = ({path = 'login'}) => { 
  const [count, setCount] = useState(2);
  const navigate = useNavigate(); 
  const location = useLocation(); 
  useEffect(() => { 
    const interval = setInterval(() => {
      setCount((currentCount)=> --currentCount);
    }, 1000);
   
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    count === 0 && navigate(`/${path}`, {state: location.pathname});
    return () => clearInterval(interval);
  }, [path, count, navigate,location]);
  return ( 
    <div className='flex justify-center items-center min-h-screen'>
      <img src={loadingPic} alt="Loading" className='w-64' />
    </div>
  );
}

export default Loading
