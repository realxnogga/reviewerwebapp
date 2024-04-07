import { Card, FloatingLabel, Button, Checkbox } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShowToast } from '../components/toaster';

import { loginCookieTemp } from '../feature/account/loginSlice';
import { getUserData } from '../feature/data/userdataSlice';
import { LoginThunk } from '../feature/account/loginSlice';
import { clearLoginState } from '../feature/account/loginSlice';
import { useridTemp } from '../feature/account/loginSlice';

import { userdataTemp } from '../feature/data/userdataSlice';

export const Login = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginCookie = useSelector(loginCookieTemp);
    const userid = useSelector(useridTemp);

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

        if (inputValue.username == '' && inputValue.password == '') {
            ShowToast('username and password must not be empty', 'warning');
        }
        else if (inputValue.username == '') {
            ShowToast('username must not be empty', 'warning');
        }
        else if (inputValue.password == '') {
            ShowToast('password must not be empty', 'warning');
        }
        else if (inputValue.username != '' && inputValue.password != '') {
            dispatch(LoginThunk({
                username: inputValue.username,
                password: inputValue.password,
            }));
        }

    };


    useEffect(() => {
        if (loginCookie === true) {
            ShowToast('login successfully', 'success');

            navigate("/home");

            setInputValue({
                username: '',
                password: '',
            })

            dispatch(getUserData(
                { userid: userid, }         
            ));

        }

        if (loginCookie === false) {
            ShowToast('login failed', 'error');

            setInputValue({
                username: '',
                password: '',
            })

            dispatch(clearLoginState());

        }
    }, [loginCookie]);

    console.log(loginCookie);

    const [showPassword, setShowPassword] = useState(false)

    const showpassword = () => {
        setShowPassword(!showPassword);
    }

    var showPasswordString = '';
    if (showPassword) {
        showPasswordString = 'text';
    }
    if (!showPassword) {
        showPasswordString = 'password';
    }



    return (

        <div className="h-screen w-screen bg-gray-700 flex items-center justify-center">
            <Card className="h-fit w-fit max-w-[90%]">
                <form onSubmit={handleSubmit} action="" className='flex flex-col justify-start gap-y-7'>
                    <FloatingLabel value={inputValue.username} onChange={handleChange} name="username" variant="standard" label="Enter Username" />
                    <div>
                        <FloatingLabel type={showPasswordString} value={inputValue.password} onChange={handleChange} name="password" variant="standard" label="Enter password" />
                        <input onClick={showpassword} type="checkbox" />                
                    </div>

                    <Button type='submit' gradientDuoTone="purpleToBlue" className='rounded-[50px]'>Login</Button>
                    <p className='text-gray-400'>Don't have an account yet? <span className='underline hover:text-blue-600'><NavLink to={'/register'}>Register</NavLink></span></p>
                </form>
            </Card>
        </div>

    );
}
