
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

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

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

            navigate('/');
        }
    }, [alreadyExist]);

    return (
        <div 
        class="h-screen w-screen flex items-center justify-center bg-no-repeat bg-cover bg-center bg-[url('../../asset/loginregisterbg/bg.jpg')]">

          

            <Card className="h-fit w-fit max-w-[90%] bg-black bg-opacity-20 backdrop-blur-md border border-yellow-500 text-white">
                <form onSubmit={handleRegisterSubmit} action="" className='flex flex-col justify-start gap-y-5'>
                    <FloatingLabel className='text-white' name="username" onChange={handleChange} value={registerInput.username} variant="standard" label="Enter your Username" />
                    <FloatingLabel className='text-white' name="password" onChange={handleChange} value={registerInput.password} variant="standard" label="Enter your password" />
                    <FloatingLabel className='text-white' name="email" onChange={handleChange} value={registerInput.email} variant="standard" label="Enter your Email" />

                    <div>
                        <FileInput onChange={handleImageUploadChange} id="large-file-upload" sizing="lg" />
                    </div>

                    <Button type='submit' gradientDuoTone="purpleToBlue" className='rounded-[50px]'>Register Now</Button>
                    <p className='text-white'>Already have an account? <span className='underline hover:text-blue-600'><NavLink to={'/'}>Login</NavLink></span> </p>
                </form>
            </Card>
        </div>
    );
}