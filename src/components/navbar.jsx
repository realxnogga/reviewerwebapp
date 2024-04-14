

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Navbar, FileInput, Button, Modal } from 'flowbite-react';
import { ShowToast } from './toaster';
import { clearLoginState } from '../feature/account/loginSlice';
import { userdataTemp, clearRegisterState, getUserData } from '../feature/data/userdataSlice';
import { DeleteAccountThunk, isAccountDeletedTemp, clearDeleteAccountState } from '../feature/account/deleteaccountSlice';
import { EditUserThunk, isUserEditedTemp, clearEditDataState } from '../feature/account/editaccountSlice';
import { clearIsSidebarOpenState, clearWhatIsClickedState } from '../feature/opensidebarSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Theme } from './theme';
import { themeHolderTemp } from '../feature/themeSlice'; 
import { clearIsToggleNoteFlashCardOpenState } from '../feature/opentogglenoteflashcardSlice';
import { clearWhatIsClickToggleNoteflashCardState } from '../feature/opentogglenoteflashcardSlice';
import { ClearWhatIsClickedInNoteTabState } from '../feature/noteSlice';

export const Nav1 = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const themeHolder = useSelector(themeHolderTemp);

    const userdata = useSelector(userdataTemp);
    if (Object.keys(userdata).length != 0) {
        var id = userdata.ID;
        var name = userdata.username;
        var password = userdata.password;
        var email = userdata.email;
        var userImgUrl = userdata.userimage;
    }

    const [openUserDataModal, setOpenUserDataModal] = useState(false);
    const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);

    const handleLogout = () => {
        dispatch(clearLoginState());
        dispatch(clearRegisterState());
        dispatch(clearIsSidebarOpenState());
        dispatch(clearWhatIsClickedState());
        dispatch(clearIsToggleNoteFlashCardOpenState());
        dispatch(clearWhatIsClickToggleNoteflashCardState());
        dispatch(ClearWhatIsClickedInNoteTabState());
        navigate('/');
    }

    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [temp, setTemp] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            prevScrollPos > currentScrollPos ? setTemp('top-0') : setTemp('top-[-4rem]');

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);


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
            dispatch(clearIsSidebarOpenState());
            dispatch(clearWhatIsClickedState());
            dispatch(ClearWhatIsClickedInNoteTabState());
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

    useEffect(() => {
        if (Object.keys(userdata).length !== 0) {
            setEditInput({
                username: userdata.username,
                password: userdata.password,
                email: userdata.email,
            });
        }
    }, [userdata]);

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
            username: editInput.username,
            password: editInput.password,
            email: editInput.email,
            userimage: userImgUrl,
        }

        dispatch(EditUserThunk(
            { editdata, editfile }
        ))
    }

    const isUserEdited = useSelector(isUserEditedTemp);

    useEffect(() => {
        if (isUserEdited == true) {
            ShowToast('updated successfully', 'success')
            setOpenEditUserModal(false);
            setEditInput({
                username: '',
                password: '',
                email: '',
            })

            dispatch(getUserData({
                userid: id,
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

                    <Navbar fluid className={`${temp} ${themeHolder.colorbg1} h-[4rem] bg-gray-900 text-gray-400 px-12 w-screen backdrop-blur absolute top-0  z-10 backdrop-brightness-75`}>

                        <Navbar.Brand>         
                            <img className="animate-spin spin h-[2rem] w-[2rem]" src="../../asset/icon/logo192.png" alt="" />
                        </Navbar.Brand>

                        <div className='gap-x-5 flex items-center '>
                        <section>
                          <Theme />
                        </section>
                        <section className='flex gap-x-5'>
                            <Dropdown
                                className='bg-gray-800 border-none'
                                arrowIcon={false}
                                inline
                                label={
                                    <img className="h-[2.5rem] w-[2.5rem] mobile:h-[1.9rem] mobile:w-[1.9rem] rounded-[50%]" src={`../../asset/userprofile/${userImgUrl}`} alt="" />

                                }>
                                <Dropdown.Header>
                                    <span className="block text-gray-400 text-sm">{name}</span>
                                    <span className="block text-gray-400 truncate text-sm font-medium">{email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item onClick={() => setOpenUserDataModal(true)} className='text-gray-400'>View Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => { setOpenEditUserModal(true); }} className='text-gray-400'>Edit Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className='text-gray-400' onClick={handleLogout} >Log out</Dropdown.Item>
                            </Dropdown>

                        </section>
                        </div>
                    </Navbar >

                    {/* view profile modal */}

                    <Modal dismissible show={openUserDataModal} onClose={() => setOpenUserDataModal(false)}>
                        <div className='space-y-8 bg-gray-700 rounded-lg p-5 '>
                            <h3 className="text-xl font-medium text-gray-300 dark:text-white">Your Profile</h3>

                            <div className="flex flex-col items-start gap-y-2">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">

                                    <img className="h-[6rem] w-[6rem] mobile:h-[2.2rem] mobile:w-[2.2rem]" src={`../../asset/userprofile/${userImgUrl}`} alt="" />

                                </p>

                                <p className="text-xl text-gray-300">
                                    Name : {name}
                                </p>
                                <p className="text-xl text-gray-300">
                                    Email : {email}
                                </p>

                            </div>
                            <div className='flex flex-row gap-x-3'>
                                <Button className='w-fit rounded-md' onClick={() => { setOpenDeleteUserModal(true); setOpenUserDataModal(false) }} gradientMonochrome="failure">delete account</Button>
                                <Button className='w-fit rounded-md' onClick={() => setOpenUserDataModal(false)} gradientMonochrome="success">close</Button>
                            </div>
                        </div>
                    </Modal>

                    {/* confirm delete account modal */}

                    <Modal show={openDeleteUserModal} size="md" onClose={() => setOpenDeleteUserModal(false)} popup>
                        {/* <Modal.Header />
                        <Modal.Body> */}

                        <div className="bg-gray-700 rounded-lg flex flex-col items-center gap-y-7 p-5">
                            <HiOutlineExclamationCircle className='text-[6rem] text-gray-300 ' />
                            <h3 className='text-gray-300 font-semibold text-md'>
                                Are you sure you want to delete this account?
                            </h3>
                            <div className=" flex flex-row items-center justify-center gap-x-4">

                                <Button className='w-fit rounded-md' onClick={() => { setOpenDeleteUserModal(false); handleDeleteAccount(); }} gradientMonochrome="failure">Yes, I'm sure</Button>

                                <Button className='w-fit rounded-md' onClick={() => setOpenDeleteUserModal(false)} gradientMonochrome="success">close</Button>
                            </div>
                        </div>
                        {/* </Modal.Body> */}
                    </Modal>

                    {/* edit profile modal */}

                    <Modal show={openEditUserModal} size="md" onClose={() => setOpenEditUserModal(false)} popup>
                        {/* <Modal.Header className='bg-gray-700'/> */}
                        {/* <Modal.Body> */}
                        <div className='bg-gray-700 p-4 rounded-lg'>
                            <div className="space-y-8">
                                <h3 className="text-xl font-medium text-gray-300 dark:text-white">Edit Account</h3>
                                <form onSubmit={handleEditSubmit} action="" className='flex flex-col justify-start gap-y-5'>

                                    <div>
                                        <label htmlFor="username" className="text-lg text-gray-300">enter a new username:</label>
                                        <input type="text" name="username" id="username" onChange={handleEditChange} value={editInput.username} className="bg-gray-600 rounded-sm w-full outline-none border-none p-2 text-gray-300 text-md " />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="text-lg text-gray-300">enter a new password:</label>
                                        <input type="text" name="password" id="password" onChange={handleEditChange} value={editInput.password} className="bg-gray-600 rounded-sm w-full outline-none border-none p-2 text-gray-300 text-md " />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="text-lg text-gray-300">enter a new email:</label>
                                        <input type="email" name="email" id="email" onChange={handleEditChange} value={editInput.email} className="bg-gray-600 rounded-sm w-full outline-none border-none p-2 text-gray-300 text-md " />
                                    </div>

                                    <div>
                                        <FileInput className='text-gray-300' onChange={handleEditImageUploadChange} id="large-file-upload" sizing="lg" />
                                    </div>

                                    <div className='flex flex-row gap-x-3'>

                                        <Button className='w-fit rounded-md' type='submit' gradientMonochrome="cyan">submit</Button>
                                        <Button className='w-fit rounded-md' onClick={() => setOpenEditUserModal(false)} gradientMonochrome="success">close</Button>

                                    </div>


                                </form>
                            </div>
                        </div>
                        {/* </Modal.Body> */}
                    </Modal>

                </>
            )
            :
            (
                ''
            )

    );
}
