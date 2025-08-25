import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import { validateEmail } from '../../Utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../Utils/axiosinstance';
import { API_PATHS } from '../../Utils/apiPath';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';





const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);


    const {updateUser} = useContext(UserContext);

    const navigate = useNavigate();

    // handle signup form submit
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            setError("Please enter your full name.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter your password.");
            return;
        }

        setError(" ");
        
        // sign up api call
        try {
            // Upload image if present
            let profileImageURL = "";
            if (profilePic) {
                const imgUploadRes = await uploadImage(profilePic);
                profileImageURL = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageURL, // Pass image URL to backend if needed
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
    };

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Join us today by entering your details below.</p>
                 
                       <form
  onSubmit={handleSignUp}
  className="w-full max-w-md mx-auto px-4 py-8 flex flex-col gap-6 ml-[0px]"
>
  {/* Wrap ProfilePhotoSelector with ml-0 */}
  <div className="ml-80">
    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
  </div>

                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="text"
                        />

                        <div className="col-span-2">
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="Min. 8 characters"
                                type="password"
                            />
                            
                       </div>
                  

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        Sign Up
                    </button>
                    

                    <p className="text-[13px] text-slate-800 mt-0">
                        Already have an account? <Link to="/login" className="text-primary underline">Sign In</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;

async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axiosInstance.post(API_PATHS.UPLOAD_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}
