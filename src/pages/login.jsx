import { Card, FloatingLabel, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShowToast, CustomToastContainer } from '../components/toaster';

import { loginCookieTemp } from '../feature/loginRegistration/loginSlice';
import { getUserData } from '../feature/data/userdataSlice';
import { LoginThunk } from '../feature/loginRegistration/loginSlice';
import { clearState } from '../feature/loginRegistration/loginSlice';

export const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginCookie = useSelector(loginCookieTemp);
    
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

        dispatch(LoginThunk({
            username: inputValue.username,
            password: inputValue.password,
        }));    
    };


    useEffect(() => {
        if (loginCookie === true) {
            ShowToast('login successfully', 'success');
            navigate("/home");
            dispatch(getUserData({
                username: inputValue.username,
                password: inputValue.password,
            }));      
        }
    
        if (loginCookie === false){
            ShowToast('login failed', 'error');
            setInputValue({
                username: '',
                password: '',
            })   
            dispatch(clearState());
            
        }
      }, [loginCookie]);

    console.log(loginCookie);
  

    return (
     
            <div className="h-screen w-screen bg-gray-700 flex items-center justify-center">
    
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
