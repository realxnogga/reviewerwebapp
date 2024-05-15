import { Card, FloatingLabel, Button } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShowToast } from '../components/toaster';
import { loginCookieTemp } from '../feature/account/loginSlice';
import { getUserDataThunk } from '../feature/data/userdataSlice';
import { LoginThunk } from '../feature/account/loginSlice';
import { clearLoginState } from '../feature/account/loginSlice';
import { useridTemp } from '../feature/account/loginSlice';
import { changeThemeState } from '../feature/themeSlice';
import { GetResourceDataThunk } from '../feature/insertresourcedataSlice';
import { GetNoteThunk } from '../feature/noteSlice';
import { GetSettingDataThunk } from '../feature/systemsettingSlice';
import { GetFlashcardThunk } from '../feature/flashcardSlice';
import { GetQuizThunk } from '../feature/quizSlice';
import { GetResourceCountThunk } from '../feature/insertresourcedataSlice';

export const Login = () => {

    // imoport username to determine which note to fetch


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

    const handleLoginSubmit = (e) => {
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

            navigate("/mainpage");

            setInputValue({
                username: '',
                password: '',
            })

            dispatch(getUserDataThunk(
                { userid: userid, }
            ));

            dispatch(changeThemeState('firstColor')); // if login is successfull, themestate will dispatch
            dispatch(GetResourceDataThunk()) // if login is successfull, resourcedata will dispatch
            dispatch(GetNoteThunk(inputValue.username)) // if login is successfull, note will dispatch
            dispatch(GetFlashcardThunk(inputValue.username));  
            dispatch(GetSettingDataThunk(inputValue.username));
            dispatch(GetQuizThunk(inputValue.username));
            dispatch(GetResourceCountThunk());
    
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

    const [showPassword, setShowPassword] = useState(false)

    const showpassword = () => {
        setShowPassword(!showPassword);
    }

    return (

        <div class="h-screen w-screen flex flex-col gap-y-8 items-center justify-center bg-no-repeat bg-cover bg-center bg-[url('../../asset/loginregisterbg/bg.jpg')]">

            <h3 className='text-5xl font-semibold text-gray-300 '>Login</h3>

            <Card className="shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:border-none h-fit w-fit max-w-[90%] bg-black bg-opacity-20 backdrop-blur-md border-none text-white">

                    <FloatingLabel className='text-white' value={inputValue.username} onChange={handleChange} name="username" variant="standard" label="Enter Username" />
                    <div>
                        <FloatingLabel className='text-white' type={`${showPassword ? 'text' : 'password'}`} value={inputValue.password} onChange={handleChange} name="password" variant="standard" label="Enter Password" />
                        <div className='flex items-center gap-x-2'>
                            <input onClick={showpassword} type="checkbox" />
                            <p className='text-[.8rem] text-gray-400'>show password</p>
                        </div>
                    </div>

                    <Button onClick={handleLoginSubmit} gradientDuoTone="purpleToBlue" className='rounded-[50px]'>Login</Button>
                    <p className='text-white'>Don't have an account yet? <span className='underline hover:text-blue-600'><NavLink to={'/register'}>Register</NavLink></span></p>
               
            </Card>
        </div>


    );
}
