import { useNavigate } from 'react-router-dom';

export const useBackButtonHandler = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page in the history
  };
  return handleBack;
};
