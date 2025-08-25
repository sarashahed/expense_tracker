import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../Utils/helper';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { API_PATHS } from "../../Utils/apiPath"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  

  const navigate = useNavigate();

  // handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

      if (!email && !password) {
    setError("Please enter email and password.");
    return;
  }
    
    if(!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter your password.");
      return;
    }

    setError(null);

    //Login API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <AuthLayout>
     
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h4 className="text-xl font-bold text-black mt-[5px]">Welcome Back!</h4>
        <p className="text-sm text-slate-700 mt-[5px] mb-6">Please enter your details to sign in.</p>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address" 
            placeholder="john@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min. 8 characters"
            type="password"
          />
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
          <button type="submit" className="btn-primary">
            Sign In
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signUp">SignUp</Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
