
import { Card } from 'flowbite-react';
import { FloatingLabel } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FileInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { ShowToast } from '../components/toaster';

import { RegistrationThunk } from '../feature/loginRegistration/registrationSlice';
import { isUserAlreadyExistTemp } from '../feature/loginRegistration/registrationSlice';
import { clearRegistrationState } from '../feature/loginRegistration/registrationSlice';

export const Register = () => {

    const dispatch = useDispatch();

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

    const handleSubmit = (e) => {
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

            const udata = {
                username: registerInput.username,
                password: registerInput.password,
                email: registerInput.email,
            }
    
            dispatch(RegistrationThunk(
               {udata, file}
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
    
        if (alreadyExist === false){
            ShowToast('account is created', 'success'); 
            
            setRegisterInput({
                username: '',
                password: '',
                email: '',
            })  
            
            dispatch(clearRegistrationState());
        }
      }, [alreadyExist]);

    return (
        <div className="h-screen w-screen bg-gray-700 flex items-center justify-center">
            <Card className="h-fit w-fit max-w-[90%]">
                <form onSubmit={handleSubmit} action="" className='flex flex-col justify-start gap-y-5'>
                    <FloatingLabel name="username" onChange={handleChange} value={registerInput.username} variant="standard" label="Enter your Username" />
                    <FloatingLabel name="password" onChange={handleChange} value={registerInput.password} variant="standard" label="Enter your password" />
                    <FloatingLabel name="email" onChange={handleChange} value={registerInput.email} variant="standard" label="Enter your Email" />

                    <div>
                        <FileInput onChange={handleImageUploadChange} id="large-file-upload" sizing="lg" />
                    </div>

                    <Button type='submit' gradientDuoTone="purpleToBlue" className='rounded-[50px]'>Register Now</Button>
                    <p className='text-gray-400'>Already have an account? <span className='underline hover:text-blue-600'><NavLink to={'/'}>Login</NavLink></span> </p>
                </form>
            </Card>
        </div>
    );
}