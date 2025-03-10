import { useNavigate } from "react-router-dom";

// Default error message
function ErrorMessage({message}) {
    const navigate = useNavigate();
    const goBackHome = () => {
        navigate('/');
    }
    return (
        <div>
            <p>{message}</p>
            <button onClick={goBackHome}>Go back</button>
        </div>
    );
}

export default ErrorMessage;