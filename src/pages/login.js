import { Card } from 'flowbite-react';
import { FloatingLabel } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getUserData, isAuth, fakeCookie } from '../feature/authenticationSlice'; // Assuming your action creators 

export const Login = () => {



    const navigate = useNavigate();
    const loginCookie = useSelector(fakeCookie);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(isAuth({
            username: inputValue.username,
            password: inputValue.password,
        }));    

        setInputValue({
            username: '',
            password: '',
        })

        dispatch(getUserData({
            username: inputValue.username,
            password: inputValue.password,
        })); 

    };

    console.log(loginCookie);
    if (loginCookie === true) {
        navigate("/home");

     
    }

     

    return (
        <div className="h-screen w-screen bg-gray-700 flex items-center justify-center">
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <Card className="h-fit w-fit max-w-[90%]">
                <form onSubmit={handleSubmit} action="" className='flex flex-col justify-start gap-y-7'>
                    <FloatingLabel value={inputValue.username} onChange={handleChange} name="username" variant="standard" label="Enter Username" />
                    <FloatingLabel value={inputValue.password} onChange={handleChange} name="password" variant="standard" label="Enter password" />
                    <Button type='submit' gradientDuoTone="purpleToBlue" className='rounded-[50px]'>Login</Button>
                    <p className='text-gray-400'>Don't have an account yet? <span className='underline hover:text-blue-600'><NavLink to={'/register'}>Register</NavLink></span></p>
                </form>
            </Card>
        </div>
    );
}
