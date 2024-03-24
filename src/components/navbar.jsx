

import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Tooltip, Avatar, Dropdown, Navbar } from 'flowbite-react';
import { GiHamburgerMenu } from "react-icons/gi";
import { ListGroup } from 'flowbite-react';
import { HiCloudDownload, HiInbox, HiOutlineAdjustments } from 'react-icons/hi';
import { ShowToast } from './toaster';
import { clearLoginState } from '../feature/accountslice/loginSlice';
import { userdataTemp } from '../feature/data/userdataSlice';
import { clearRegisterState } from '../feature/data/userdataSlice';
import { FloatingLabel } from 'flowbite-react';
import { FileInput, } from 'flowbite-react';

import { Checkbox, Label, TextInput } from 'flowbite-react';
import { getUserData } from '../feature/data/userdataSlice';
import { DeleteAccountThunk } from '../feature/accountslice/deleteaccountSlice';
import { isAccountDeletedTemp } from '../feature/accountslice/deleteaccountSlice';
import { clearDeleteAccountState } from '../feature/accountslice/deleteaccountSlice';

import { EditUserThunk } from '../feature/accountslice/editaccountSlice';
import { isUserEditedTemp } from '../feature/accountslice/editaccountSlice';
import { clearEditDataState } from '../feature/accountslice/editaccountSlice';

import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export const Nav1 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userdata = useSelector(userdataTemp);
    console.log(userdata)

    if (Object.keys(userdata).length != 0) {
        var id = userdata.ID;
        var name = userdata.username;
        var password = userdata.password;
        var email = userdata.email;
        var userImgUrl = userdata.userimage;
    }

    const [openUserData, setOpenUserData] = useState(false);
    const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);

    const handleLogout = () => {
        dispatch(clearLoginState());
        dispatch(clearRegisterState());
        navigate('/');
    }

    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [temp, setTemp] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            prevScrollPos > currentScrollPos ? setTemp('top-0') : setTemp('top-[-5rem]');

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const [menuhover, setMenuHover] = useState(false);

    const menuMouseOver = () => {
        setMenuHover(true);
    }

    const menuMouseLeave = () => {
        setMenuHover(false);
    }

    const handleDeleteAccount = () => {
        dispatch(DeleteAccountThunk({
            username: name,
            email: email,
            userimage: userImgUrl,
        }));
    }

    const isAccountDeleted = useSelector(isAccountDeletedTemp);
    console.log(isAccountDeleted);

    useEffect(() => {

        if (isAccountDeleted == true) {
            ShowToast('successfully deleted', 'success');
            dispatch(clearLoginState());
            dispatch(clearRegisterState());
            dispatch(clearDeleteAccountState());
            navigate('/');
        }
        if (isAccountDeleted == false) {
            ShowToast('deletion failed', 'error');
        }

    }, [isAccountDeleted])

    // ----------------------------------------
    const [editfile, setEditFile] = useState(null)
        const [editInput, setEditInput] = useState({
            username: '',
            password: '',
            email: '',
        });

        console.log(editInput.username);
    
    console.log(name)

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditInput({ ...editInput, [name]: value });
    };

    const handleEditImageUploadChange = (e) => {
        setEditFile(e.target.files[0]);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();  
        
        const editdata = {
            id: id,
            username : editInput.username,
            password : editInput.password,
            email : editInput.email,
            userimage : userImgUrl,
        }

        dispatch(EditUserThunk(
            {editdata, editfile}     
        ))
    }

    const isUserEdited = useSelector(isUserEditedTemp);

    useEffect(() => {
        if (isUserEdited == true) {
            ShowToast('updated successfully', 'success')

            setEditInput({
                username: '',
                password: '',
                email: '',
            })

            dispatch(getUserData({
                username: editInput.username,
                password: editInput.password,
            }));

            dispatch(clearEditDataState());
        }

        if (isUserEdited == false) {
            ShowToast('failed to update', 'error')

            dispatch(clearEditDataState());
        }
    }, [isUserEdited])

    console.log(isUserEdited);

    return (
        Object.keys(userdata).length != 0 ?
            (
                <>

                    {/* edit profile modal */}

                    <Modal show={openEditUserModal} size="md" onClose={() => setOpenEditUserModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Account</h3>
                                <form onSubmit={handleEditSubmit} action="" className='flex flex-col justify-start gap-y-5'>
                                    <FloatingLabel onChange={handleEditChange} value={editInput.username} name="username" variant="standard" label="Enter new Username" />
                                    <FloatingLabel onChange={handleEditChange} value={editInput.password} name="password" variant="standard" label="Enter new Password" />
                                    <FloatingLabel onChange={handleEditChange} value={editInput.email} name="email" variant="standard" label="Enter new Email" />

                                    <div>
                                        <FileInput onChange={handleEditImageUploadChange} id="large-file-upload" sizing="lg" />
                                    </div>

                                    <Button className='w-fit' type='submit'>submit</Button>

                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>

                    {/* ------------------------- */}


                    <Navbar fluid rounded className={`${temp} absolute text-gray-400 bg-gray-700 px-12 h-fit w-screen backdrop-blur backdrop-brightness-75 transition-[1s]`}>

                        <Navbar.Brand>
                            <img className="animate-spin spin h-[3rem] w-[3rem]" src={`${require('../assets/icon/logo192.png')}`} alt="" />
                        </Navbar.Brand>

                        <section className='flex gap-x-5'>
                            <Dropdown
                                className='bg-gray-700'
                                arrowIcon={false}
                                inline
                                label={
                                    <img className="h-[2.5rem] w-[2.5rem] mobile:h-[1.9rem] mobile:w-[1.9rem] rounded-[50%]" src={`${require(`../assets/userProfile/${userImgUrl}`)}`} />
                                                                 
                                }>
                                <Dropdown.Header>
                                    <span className="block text-gray-400 text-sm">{name}</span>
                                    <span className="block text-gray-400 truncate text-sm font-medium">{email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item onClick={() => setOpenUserData(true)} className='text-gray-400'>View Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => setOpenEditUserModal(true)} className='text-gray-400'>Edit Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className='text-gray-400' onClick={handleLogout} >Sign out</Dropdown.Item>
                            </Dropdown>
                            <Tooltip content={'Menu'}>
                                <GiHamburgerMenu
                                    onMouseOver={menuMouseOver}
                                    className='h-full w-full' />
                            </Tooltip>
                        </section>
                        {
                            menuhover ?
                                (
                                    <section onMouseLeave={menuMouseLeave} className='w-full list-none rounded-none'>
                                        <ListGroup.Item icon={HiOutlineAdjustments}>Practice Tests and Quizzes</ListGroup.Item>
                                        <ListGroup.Item icon={HiInbox}>Progress</ListGroup.Item>
                                        <ListGroup.Item icon={HiCloudDownload}>Exam Simulation</ListGroup.Item>
                                    </section>
                                ) :
                                (
                                    null
                                )
                        }

                    </Navbar >

                    {/* view profile modal */}

                    <Modal dismissible show={openUserData} onClose={() => setOpenUserData(false)}>
                        <Modal.Header>User Profile</Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    <img className="h-[4rem] w-[4rem] mobile:h-[2.2rem] mobile:w-[2.2rem] rounded-[50%]" src={`${require(`../assets/userProfile/${userImgUrl}`)}`} />
                                </p>

                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Name : {name}
                                </p>
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                    Email : {email}
                                </p>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => setOpenUserData(false)}>ok</Button>
                            <Button onClick={() => { setOpenDeleteUserModal(true); setOpenUserData(false) }} color='failure'>delete account</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* confirm delete account modal */}

                    <Modal show={openDeleteUserModal} size="md" onClose={() => setOpenDeleteUserModal(false)} popup>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    Are you sure you want to delete this account?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button color="failure" onClick={() => { setOpenDeleteUserModal(false); handleDeleteAccount(); }}>
                                        {"Yes, I'm sure"}
                                    </Button>
                                    <Button color="gray" onClick={() => setOpenDeleteUserModal(false)}>
                                        No, cancel
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>

                </>
            )
            :
            (
                ''
            )

    );
}
