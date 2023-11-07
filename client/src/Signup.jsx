import { useUser } from './UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USERNAME_EXISTS_ERROR = 'Username Already Exists';
const VALIDATION_ERROR = 'Username and Password must be present, and age must be 16 years or older';

function Signup({userToDisplay}) {
  const { setUser } = useUser();
  const initialValue = {
    username: '',
    password: '',
    age: '',
  };
  const navigate = useNavigate();
  const [userExists, setUserExists] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [signupForm, setSignupForm] = useState(initialValue);

  function handleSignupChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setSignupForm({
      ...signupForm,
      [name]: value,
    });
  }

  function handleSignupSubmit(e) {
    e.preventDefault()
    fetch('/api/signup', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(signupForm)
    })
    .then((res) => {
        if (res.status === 201){
            return res.json()
        } else if (res.status === 500){
            setUserExists(true)
            setValidationError(false)
            console.error('Username Already Exists')
            setSignupForm({
                ...signupForm, 
                username: ''
            })
            return Promise.reject('Username Already Exists')
        } else if(res.status === 400){
            setUserExists(false)
            setValidationError(true)
            console.error('Username and Password must be present and age must be 16 years or older')
            return Promise.reject('Username and Password must be present and age must be 16 years or older')
        }
    })
    .then((data) => {
        setUser(data);
        userToDisplay(data)
        navigate('/')
    })
    .catch((error) => console.error('Error', error));
}

const warningStyles = {
  color: "red",
  marginTop: "-10px",
  marginBottom: "10px",
  textAlign: "center"
}

const warningStyles2 = {
  color: "red",
  marginTop: "-10px",
  marginBottom: "10px",
  width: "90%",
  textAlign: "center"
}

  const signupDiv = <div className="signup-form-container">
                        <form className="signup-form" onSubmit={handleSignupSubmit}>
                            <input type="text" autocomplete='off' placeholder="Username" onChange={handleSignupChange} name='username' value ={signupForm.username}  />
                            {userExists ? <p style={warningStyles}>Username already exists, please try again!</p> : null}
                            <input type="password" autocomplete='off' placeholder="Password" onChange={handleSignupChange} name='password' value={signupForm.password} />
                            <input type="text" autocomplete='off' placeholder="Age 16+" onChange={handleSignupChange}  name='age' value={signupForm.age} />
                            {validationError ? <p style={warningStyles2}>Username and Password must be present and age must be 16 years or older, please try again!</p> : null}
                            <button className="login-signup-submit">Sign Up</button>
                        </form>
                        <div className="login-signup-toggle" onClick={() => {navigate('/')}}>Login</div>
                    </div>
  
  
    return(
      <div className="login-signup-page">
        <div className="greeting-div">
        </div>
        {signupDiv}
      </div>
    )
  }
  
  export default Signup;