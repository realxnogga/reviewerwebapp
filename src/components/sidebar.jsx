
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { LiaEyeSlash } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { isSidebarOpenState, whatIsClickedState, isSideBarOpenTemp, whatIsClickedTemp } from "../feature/opensidebar/opensidebarSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

export const Sidebar = () => {

    const dispatch = useDispatch();

    const whatIsClicked = useSelector(whatIsClickedTemp);

    const [hideTextLink, setHideTextLink] = useState(false);

    const hideTextLinkFunc = () => {
        setHideTextLink(!hideTextLink);
    }
    var hideTextLinkString = hideTextLink === true ? 'hidden' : '';
   

    const hideSidebarFunc = () => {
        dispatch(isSidebarOpenState());
    }
    const isSideBarOpen = useSelector(isSideBarOpenTemp);
    var hideSidebarString = isSideBarOpen === true ? 'hidden' : '';
   

    return (
        <aside className={`${hideSidebarString} bg-gray-800 h-screen w-fit top-[4rem] absolute left-0 z-10 overflow-hidden p-4`}>

            <ul className='flex flex-col gap-y-6 text-md text-gray-400'>

                {

                    (
                        hideTextLink === true ?
                            (
                                <div>
                                    <LiaEyeSlash onClick={hideTextLinkFunc} className="text-2xl text-gray-400" />
                                </div>
                            )
                            :
                            (
                                <div className="flex flex-row justify-between">
                                    <LiaEyeSolid onClick={hideTextLinkFunc} className="text-2xl text-gray-400" />

                                    <IoCloseSharp onClick={hideSidebarFunc} className="text-2xl text-gray-400 hover:bg-white" />
                                </div>
                            )
                    )
                }

                <hr />

                <li onClick={() => { dispatch(whatIsClickedState('dashboard')) }} className='flex flex-row items-center gap-x-3 cursor-pointer'>
                    <span className='text-[1.6rem] '><MdOutlineSpaceDashboard className="text-blue-500" /></span>
                    <span className={`${hideTextLinkString} ${whatIsClicked === 'dashboard' ? 'text-blue-500' : ''}`}>Dashboard (progress tracking)</span>
                </li>

                <hr />

                <li onClick={() => { dispatch(whatIsClickedState('reviewmodule')) }} className='flex flex-row items-center gap-x-3 cursor-pointer' >
                    <span className='text-[1.6rem] '><MdOutlineRateReview className="text-blue-500" /></span>
                    <span className={`${hideTextLinkString} ${whatIsClicked === 'reviewmodule' ? 'text-blue-500' : ''}`}>Review Modules</span>
                </li>

                <hr />

                <li onClick={() => { dispatch(whatIsClickedState('practicetestandquiz')) }} className='flex flex-row items-center gap-x-3 cursor-pointer' >
                    <span className='text-[1.6rem] '><MdOutlineQuiz className="text-blue-500" /></span>
                    <span className={`${hideTextLinkString} ${whatIsClicked === 'practicetestandquiz' ? 'text-blue-500' : ''} `}>Practice Test and Quizzes</span>
                </li>

                <hr />

                <li onClick={() => { dispatch(whatIsClickedState('learningresources')) }} className='flex flex-row items-center gap-x-3 cursor-pointer' >
                    <span className='text-[1.6rem] '><GrResources className="text-blue-500" /></span>
                    <span className={`${hideTextLinkString} ${whatIsClicked === 'learningresources' ? 'text-blue-500' : ''}`}>Learning Resources</span>
                </li>





            </ul>

        </aside>
    )
}