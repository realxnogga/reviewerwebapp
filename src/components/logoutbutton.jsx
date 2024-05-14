

import { clearLoginState } from '../feature/account/loginSlice';
import { clearRegisterState } from '../feature/data/userdataSlice';
import { clearIsSidebarOpenState, clearWhatIsClickedState } from '../feature/opensidebarSlice';
import { clearIsToggleNoteFlashCardOpenState } from '../feature/opentogglenoteflashcardSlice';
import { clearWhatIsClickToggleNoteflashCardState } from '../feature/opentogglenoteflashcardSlice';
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { minimizeSidebarTemp } from "../feature/opensidebarSlice";
import { themeHolderTemp } from '../feature/themeSlice';
import { clearMinimizeSidebarState } from '../feature/opensidebarSlice';
import { clearToggleThemeState } from '../feature/themeSlice';
import { clearWhatIsClickToggleQuizExamState } from '../feature/opentogglequizexamSlice';


export const LogoutInProfileDropdown = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearLoginState());
        dispatch(clearRegisterState());
        dispatch(clearIsSidebarOpenState());
        dispatch(clearMinimizeSidebarState());
        dispatch(clearWhatIsClickToggleQuizExamState());
        dispatch(clearToggleThemeState());
        dispatch(clearWhatIsClickedState());
        dispatch(clearIsToggleNoteFlashCardOpenState());
        dispatch(clearWhatIsClickToggleNoteflashCardState());
        navigate('/');
    }

    return (
        <p className='hover:text-yellow-500 cursor-pointer flex items-center gap-x-2' onClick={handleLogout}>
            <RiLogoutBoxLine className='text-xl' />
            Sign out
        </p>
    )
}

export const LogoutInSidebar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const minimizeSidebar = useSelector(minimizeSidebarTemp);
    const themeHolder = useSelector(themeHolderTemp);

    const handleLogout = () => {
        dispatch(clearLoginState());
        dispatch(clearRegisterState());
        dispatch(clearIsSidebarOpenState());
        dispatch(clearMinimizeSidebarState());
        dispatch(clearWhatIsClickToggleQuizExamState());
        dispatch(clearToggleThemeState());
        dispatch(clearWhatIsClickedState());
        dispatch(clearIsToggleNoteFlashCardOpenState());
        dispatch(clearWhatIsClickToggleNoteflashCardState());
        navigate('/');
    }

    return (

        <li onClick={handleLogout} className={`hover:${themeHolder.tabidentifierhover} p-4 rounded-md flex flex-row items-center gap-x-3 cursor-pointer`} >

            <span><RiLogoutBoxLine className="text-yellow-500 text-[1.8rem]" /></span>
            <span className={`${minimizeSidebar ? 'hidden' : ''} ${themeHolder.colortxt1} text-gray-300`}>Sign out</span>

        </li>

    )
}