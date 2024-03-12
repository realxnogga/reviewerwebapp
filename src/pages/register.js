
import { Card } from 'flowbite-react';
import { FloatingLabel } from 'flowbite-react';
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FileInput } from 'flowbite-react';
import { fakeCookie } from '../feature/authenticationSlice';
import { useSelector, useDispatch } from 'react-redux';
import { registration } from '../feature/authenticationSlice';

export const Register = () => {

    
  

    const dispatch = useDispatch();
    const fakeCookieTemp = useSelector(fakeCookie);

    console.log(fakeCookieTemp);

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


    console.log(file);

    const handleSubmit = (e) => {
        e.preventDefault();     

        const udata = {
            username: registerInput.username,
            password: registerInput.password,
            email: registerInput.email,
        }

        dispatch(registration(
           {udata, file}
        ));

        // dispatch(getUserPhoto(userPhotoFile));

        setRegisterInput({
            username: '',
            password: '',
            email: '',
        })

    };

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