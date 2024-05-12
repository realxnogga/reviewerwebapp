
import { Card } from 'flowbite-react';
import { FloatingLabel } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FileInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { ShowToast } from '../components/toaster';
import { NavLink, useNavigate } from 'react-router-dom';
import { RegistrationThunk } from '../feature/account/registrationSlice';
import { isUserAlreadyExistTemp } from '../feature/account/registrationSlice';
import { clearRegistrationState } from '../feature/account/registrationSlice';
import { InsertSettingDataThunk } from '../feature/systemsettingSlice';
import { IoMdArrowDropup } from "react-icons/io";

export const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerInput, setRegisterInput] = useState({
        username: '',
        password: '',
        email: '',
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterInput({ ...registerInput, [name]: value });
    };

    const handleImageUploadChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleRegisterSubmit = () => {


        if (registerInput.username == '' && registerInput.password == '' && registerInput.email == '') {
            ShowToast('fields must not be empty', 'warning');
        }
        else if (registerInput.username == '' && registerInput.password == '') {
            ShowToast('username and password must not be empty', 'warning');
        }
        else if (registerInput.password == '' && registerInput.email == '') {
            ShowToast('password and email must not be empty', 'warning');
        }
        else if (registerInput.username == '') {
            ShowToast('username must not be empty', 'warning');
        }
        else if (registerInput.password == '') {
            ShowToast('password must not be empty', 'warning');
        }
        else if (registerInput.email == '') {
            ShowToast('email must not be empty', 'warning');
        }
        else if (registerInput.username != '' && registerInput.password != '' && registerInput.email != '') {

            const userdata = {
                username: registerInput.username,
                password: registerInput.password,
                email: registerInput.email,
            }

            dispatch(RegistrationThunk(
                { userdata, file }
            ));


        }

    };

    const alreadyExist = useSelector(isUserAlreadyExistTemp);
    console.log(alreadyExist);

    useEffect(() => {
        if (alreadyExist === true) {
            ShowToast('user already exist', 'error');

            setRegisterInput({
                username: '',
                password: '',
                email: '',
            })
            dispatch(clearRegistrationState());
        }

        if (alreadyExist === false) {
            ShowToast('account is created', 'success');

            setRegisterInput({
                username: '',
                password: '',
                email: '',
            })

            dispatch(clearRegistrationState());

            const systemsettingdatatemp = {
                username: registerInput.username,
                userpassword: registerInput.password,
            }
            dispatch(InsertSettingDataThunk({ systemsettingdatatemp }));

            navigate('/');
        }
    }, [alreadyExist]);
    // --------------------------------------------------------------------
    const [showgeneratepasswordmadal, setshowgeneratepasswordmadal] = useState(false);

    const [passwordLength, setPasswordLength] = useState(8);
    const [useSymbols, setUseSymbols] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useUpperCase, setUseUpperCase] = useState(true);

    const ShowGeneratePasswordModalfunc = () => {
        setshowgeneratepasswordmadal(!showgeneratepasswordmadal);
    };

    const GeneratePasswordfunc = () => {
        let charset = "";
        let newPassword = "";

        if (useSymbols) charset += "!@#$%^&*()";
        if (useNumbers) charset += "0123456789";
        if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setRegisterInput(prevState => ({ ...prevState, password: newPassword }));
    };

    return (
        <div
            class="h-screen w-screen flex flex-col gap-y-8 items-center justify-center bg-no-repeat bg-cover bg-center bg-[url('../../asset/loginregisterbg/bg.jpg')]">

            <h3 className='text-5xl font-semibold text-gray-300 '>Register</h3>

            <Card className="shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] hover:border-none h-fit w-fit max-w-[90%] bg-black bg-opacity-20 backdrop-blur-md border-none text-white">

                <FloatingLabel className='text-white' name="username" onChange={handleChange} value={registerInput.username} variant="standard" label="Enter your Username" />

                <FloatingLabel className='text-white' name="email" onChange={handleChange} value={registerInput.email} variant="standard" label="Enter your Email" />

                <div>
                    <FloatingLabel className='text-white' name="password" onChange={handleChange} value={registerInput.password} variant="standard" label="Enter your password" />

                    <div className='relative'>
                        <div className='flex items-center gap-x-2'>
                            <p className='text-[.8rem] text-gray-400'>generate password</p>

                            <IoMdArrowDropup className={`${showgeneratepasswordmadal ? 'rotate-180' : ''} duration-200 text-2xl`} onClick={() => { ShowGeneratePasswordModalfunc(); }} />
                        </div>
                        <div className={`${showgeneratepasswordmadal ? 'h-[9.9rem] p-2 mt-2 border border-yellow-500' : 'h-0'} absolute duration-200 bg-gray-900 w-full flex items-end justify-between overflow-hidden z-10`}>
                            <div className='flex flex-col gap-y-2 text-gray-300'>
                                <div className='flex items-center gap-x-2 text-sm'>
                                    <input
                                        type="number"
                                        min="8"
                                        max="32"
                                        value={passwordLength}
                                        onChange={(e) => { setPasswordLength(e.target.value); }}
                                        className='h-[1.5rem] w-[5rem] bg-gray-900 rounded-sm outline-none p-2 text-gray-300 text-md'
                                    />
                                    <p>Length</p>
                                </div>

                                <div className='flex items-center gap-x-2 text-sm'>
                                    <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
                                    <p>Include Symbols</p>
                                </div>


                                <div className='flex items-center gap-x-2 text-sm'>
                                    <input type="checkbox" checked={useNumbers} onChange={() => { setUseNumbers(!useNumbers); }} />
                                    <p>Include Numbers</p>
                                </div>

                                <div className='flex items-center gap-x-2 text-sm'>
                                    <input type="checkbox" checked={useUpperCase} onChange={() => { setUseUpperCase(!useUpperCase); }} />
                                    <p>Include Uppercase</p>
                                </div>

                                <div className='flex items-center gap-x-2 text-sm'>
                                    <input type="checkbox" checked={useLowerCase} onChange={() => { setUseLowerCase(!useLowerCase); }} />
                                    <p>Include Lowercase</p>
                                </div>
                            </div>

                            <button onClick={() => { GeneratePasswordfunc(); setshowgeneratepasswordmadal(false) }} className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-fit px-3 py-2 rounded-md text-white text-sm">
                                Generate
                            </button>

                        </div>
                    </div>
                </div>

                <div>
                    <FileInput onChange={handleImageUploadChange} id="large-file-upload" sizing="lg" />
                </div>

                <Button onClick={handleRegisterSubmit} gradientDuoTone="purpleToBlue" className='rounded-[50px]'>Register Now</Button>
                <p className='text-white'>Already have an account? <span className='underline hover:text-blue-600'><NavLink to={'/'}>Login</NavLink></span> </p>

            </Card>
        </div>
    );
}