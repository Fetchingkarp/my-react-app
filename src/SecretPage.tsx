import './SecretPage.css';
import { useNavigate } from 'react-router-dom';

const SecretPage = () => {
  const navigate = useNavigate();
  return (
    <div className='secret-page'>
      <div className='log-out-button-secret' onClick={() => navigate("/")}> 
        <p className='log-out-text-secret'>Log Out</p>
      </div>
      <div>
        <p>Secret</p>
      </div>
    </div>
  )
}

export default SecretPage;