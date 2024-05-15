

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FileInput, Button, Modal } from 'flowbite-react';
import { ShowToast } from './toaster';
import { clearLoginState } from '../feature/account/loginSlice';
import { userdataTemp, clearRegisterState, getUserDataThunk } from '../feature/data/userdataSlice';
import { DeleteAccountThunk, isAccountDeletedTemp, clearDeleteAccountState } from '../feature/account/deleteaccountSlice';
import { EditUserThunk, isUserEditedTemp, clearEditDataState } from '../feature/account/editaccountSlice';
import { clearIsSidebarOpenState, clearWhatIsClickedState } from '../feature/opensidebarSlice';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { themeHolderTemp } from '../feature/themeSlice';
import { DeleteAllNoteThunk } from '../feature/noteSlice';
import { CgProfile } from "react-icons/cg";
import { RiEditBoxLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import { isSystemNameUpdatedTemp } from '../feature/systemsettingSlice';
import { GetSettingDataThunk } from '../feature/systemsettingSlice';
import { clearIsSystemNameUpdatedState } from '../feature/systemsettingSlice';
import { EditSettingDataThunk } from '../feature/systemsettingSlice';
import { DeleteSettingDataThunk } from '../feature/systemsettingSlice';
import { systemDataTemp } from '../feature/systemsettingSlice';
import { DeleteAllFlashCardDataThunk } from '../feature/flashcardSlice';
import { DeleteAllFlashCardItemThunk } from '../feature/flashcardSlice';
import { UpdateNoteUserThunk } from '../feature/noteSlice';
import { UpdateFlashcardUserThunk } from '../feature/flashcardSlice';
import { UpdateFlashcardItemUserThunk } from '../feature/flashcardSlice';
import { UpdateSettingUsernameThunk } from '../feature/systemsettingSlice';
import { LogoutInProfileDropdown } from './logoutbutton';
import { clearMinimizeSidebarState } from '../feature/opensidebarSlice';
import { clearToggleThemeState } from '../feature/themeSlice';
import { clearWhatIsClickToggleQuizExamState } from '../feature/opentogglequizexamSlice';
import { UpdateQuizUserThunk } from '../feature/quizSlice';
import { DeleteQuizThunk } from '../feature/quizSlice';

export const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const themeHolder = useSelector(themeHolderTemp);

    const userdata = useSelector(userdataTemp);
    if (Object.keys(userdata).length != 0) {
        var userID = userdata.ID;
        var name = userdata.username;
        var password = userdata.password;
        var email = userdata.email;
        var userImgUrl = userdata.userimage;
    }

    const [openUserDataModal, setOpenUserDataModal] = useState(false);
    const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [openEditSystemSettingModal, setOpenEditSystemSettingModal] = useState(false);

    const ShowProfileDropdownFunc = () => setShowUserProfileDropdown(!showUserProfileDropdown);
    const ShowProfileDropdownMouseLeaveFunc = () => setShowUserProfileDropdown(!showUserProfileDropdown);
    const [showUserProfileDropdown, setShowUserProfileDropdown] = useState(false);

    const handleDeleteAccount = () => {
        dispatch(DeleteAccountThunk({
            username: name,
            email: email,
            userimage: userImgUrl,
        }));
    }

    const isAccountDeleted = useSelector(isAccountDeletedTemp);

    useEffect(() => {

        if (isAccountDeleted == true) {
            ShowToast('successfully deleted', 'success');
            dispatch(clearLoginState());
            dispatch(clearRegisterState());
            dispatch(clearDeleteAccountState());
            dispatch(clearIsSidebarOpenState());
            dispatch(clearMinimizeSidebarState());
            dispatch(clearWhatIsClickToggleQuizExamState());
            dispatch(clearToggleThemeState());
            dispatch(clearWhatIsClickedState());
            dispatch(DeleteAllNoteThunk(name));
            dispatch(DeleteSettingDataThunk(name));
            dispatch(DeleteAllFlashCardDataThunk(name));
            dispatch(DeleteAllFlashCardItemThunk(name));
            dispatch(DeleteQuizThunk(name));     
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
            id: userID,
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
        if (isUserEdited === true) {
            ShowToast('updated successfully', 'success')
            setOpenEditUserModal(false);
            
            setEditInput({
                username: '',
                password: '',
                email: '',
            })

            dispatch(getUserDataThunk({
                userid: userID,
            }));

            dispatch(clearEditDataState());
        }

        if (isUserEdited === false) {
            ShowToast('failed to update', 'error')

            dispatch(clearEditDataState());
        }
    }, [isUserEdited])


    // ----------------------------------------------------
    // this useEffect will run once the username change after an edit
    // it also changes the foraeign key of the other tables
    useEffect(() => {
        const datatobeupdated = {
            userID: userID,
            user: name,
            password: password,
         }
         dispatch(UpdateNoteUserThunk({datatobeupdated}));
         dispatch(UpdateFlashcardUserThunk({datatobeupdated}));
         dispatch(UpdateFlashcardItemUserThunk({datatobeupdated}));
         dispatch(UpdateSettingUsernameThunk({datatobeupdated}));
         dispatch(UpdateQuizUserThunk({datatobeupdated}));
         
    }, [name])
         
    // -----------------------------------------------------
    const [editSystem, setEditSystem] = useState({
        systemname: '',
    })

    const handleEditSystemChange = (e) => {
        const { name, value } = e.target;
        setEditSystem({ ...editSystem, [name]: value });
    };

    const systemSettingTemp = {
        systemsettinguser: name,
        systemname: editSystem.systemname,
    }

    const handleChangeSystemSetting = () => {
        dispatch(EditSettingDataThunk({ systemSettingTemp }));
    }

    const isSystemNameUpdated = useSelector(isSystemNameUpdatedTemp);

    useEffect(() => {
        if (isSystemNameUpdated === true) {
            setOpenEditSystemSettingModal(false);
            dispatch(GetSettingDataThunk(name));
            dispatch(clearIsSystemNameUpdatedState());
        }
        if (isSystemNameUpdated === false) {
            dispatch(clearIsSystemNameUpdatedState());
        }
    }, [isSystemNameUpdated]);

    console.log(isSystemNameUpdated)



    //------------------------------------------------
    const systemData = useSelector(systemDataTemp);
    if (Object.keys(systemData).length != 0) {
        var systemName = systemData.systemsettingname;
    }

    return (
        <>
            <nav className={`${themeHolder.colorbg1} h-[4rem] px-12 mobile:px-4 w-screen backdrop-blur absolute top-0  z-10 backdrop-brightness-75 flex items-center justify-between  `}>

                {/* <img className="animate-spin spin h-[2rem] w-[2rem]" src="../../asset/icon/logo192.png" alt="" /> */}
                <div className={`text-gray-300 text-xl flex items-center gap-x-1 mobile:text-sm`}>

                     <p>{systemName}</p>
                    <RxDividerVertical className='text-[2rem] text-yellow-500' />
                    <p>Welcome, <span>{name}</span></p>

                </div>

                <div className={`relative`}>
                    <img onClick={ShowProfileDropdownFunc} className="h-[2.5rem] w-[2.5rem] mobile:h-[1.9rem] mobile:w-[1.9rem] rounded-[50%]" src={`../../asset/userprofile/${userImgUrl}`} alt="" />

                    <div onMouseLeave={ShowProfileDropdownMouseLeaveFunc} className={`${showUserProfileDropdown ? 'h-[16rem] p-3' : ''} ${themeHolder.colorbg2} ${themeHolder.colortxt1} h-0 w-fit text-nowrap absolute right-0 mt-3 flex flex-col items-start gap-y-1 overflow-hidden`}>
                        <strong>{name}</strong>
                        <strong>{email}</strong>
                        <hr className='w-full my-2' />
                        <p className='hover:text-yellow-500 cursor-pointer flex items-center gap-x-2' onClick={() => setOpenUserDataModal(true)}>
                            <CgProfile className='text-xl' />
                            View Profile
                        </p>
                        <p className='hover:text-yellow-500 cursor-pointer flex items-center gap-x-2' onClick={() => { setOpenEditUserModal(true); }}>
                            <RiEditBoxLine className='text-xl' />
                            Edit Profile
                        </p>
                        <hr className='w-full my-2' />
                        <p className='hover:text-yellow-500 cursor-pointer flex items-center gap-x-2' onClick={() => { setOpenEditSystemSettingModal(true); }}>
                            <IoSettingsOutline className='text-xl' />
                            System Setting
                        </p>
                        <hr className='w-full my-2' />
                       <LogoutInProfileDropdown />
                    </div>
                </div>

            </nav>

            {/* edit system setting */}
            <Modal size="md" dismissible show={openEditSystemSettingModal} onClose={() => setOpenEditSystemSettingModal(false)}>
                <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5 `}>
                    <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Edit System Setting</h3>

                    <div className="flex flex-col items-start gap-y-8">
                        <div>
                            <label htmlFor="systemname" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>enter a new system name:</label>
                            <input type="text" name="systemname" id="systemname" onChange={handleEditSystemChange} value={editSystem.systemname} className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `} />
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-3'>
                        <Button onClick={handleChangeSystemSetting} className='w-fit rounded-md' gradientMonochrome="cyan">submit</Button>

                        <Button className='w-fit rounded-md' onClick={() => setOpenEditSystemSettingModal(false)} gradientMonochrome="success">close</Button>
                    </div>
                </div>
            </Modal>

            {/* view profile modal */}

            <Modal dismissible show={openUserDataModal} onClose={() => setOpenUserDataModal(false)}>
                <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5 `}>
                    <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Your Profile</h3>

                    <div className={`flex flex-col items-start gap-y-2`}>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">

                            <img className="h-[6rem] w-[6rem] mobile:h-[2.2rem] mobile:w-[2.2rem]" src={`../../asset/userprofile/${userImgUrl}`} alt="" />

                        </p>

                        <p className={`${themeHolder.colortxt1} text-xl text-gray-300`}>
                            Name : {name}
                        </p>
                        <p className={`${themeHolder.colortxt1} text-xl text-gray-300`}>
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
                <div className={`${themeHolder.colorbg3} bg-gray-700 rounded-lg flex flex-col items-center gap-y-7 p-5`}>
                    <HiOutlineExclamationCircle className={`${themeHolder.colortxt1} text-[6rem] text-gray-300 `} />
                    <h3 className={`${themeHolder.colortxt1} text-gray-300 font-semibold text-md`}>
                        Are you sure you want to delete this account?
                    </h3>
                    <div className=" flex flex-row items-center justify-center gap-x-4">

                        <Button className='w-fit rounded-md' onClick={() => { setOpenDeleteUserModal(false); handleDeleteAccount(); }} gradientMonochrome="failure">Yes, I'm sure</Button>

                        <Button className='w-fit rounded-md' onClick={() => setOpenDeleteUserModal(false)} gradientMonochrome="success">close</Button>
                    </div>
                </div>
            </Modal>

            {/* edit profile modal */}
            <Modal show={openEditUserModal} size="md" onClose={() => setOpenEditUserModal(false)} popup>
                <div className={`${themeHolder.colorbg3}  bg-gray-700 p-4 rounded-lg`}>
                    <div className="space-y-8">
                        <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Edit Account</h3>
                        <div className='flex flex-col justify-start gap-y-5'>

                            <div>
                                <label htmlFor="username" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>enter a new username:</label>
                                <input type="text" name="username" id="username" onChange={handleEditChange} value={editInput.username} className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `} />
                            </div>

                            <div>
                                <label htmlFor="password" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>enter a new password:</label>
                                <input type="text" name="password" id="password" onChange={handleEditChange} value={editInput.password} className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `} />
                            </div>

                            <div>
                                <label htmlFor="email" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>enter a new email:</label>
                                <input type="email" name="email" id="email" onChange={handleEditChange} value={editInput.email} className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `} />
                            </div>

                            <div>
                                <FileInput className='text-gray-300' onChange={handleEditImageUploadChange} id="large-file-upload" sizing="lg" />
                            </div>

                            <div className='flex flex-row gap-x-3'>
                                <Button onClick={handleEditSubmit} className='w-fit rounded-md' gradientMonochrome="cyan">submit</Button>
                                <Button className='w-fit rounded-md' onClick={() => setOpenEditUserModal(false)} gradientMonochrome="success">close</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>

        </>

    );
}
