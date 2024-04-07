
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineRateReview } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { LiaEyeSlash } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { isSidebarOpenState, isSideBarOpenTemp } from "../feature/opensidebar/opensidebarSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";

export const Sidebar = () => {

    const dispatch = useDispatch();
    const isSideBarOpen = useSelector(isSideBarOpenTemp);

    console.log(isSideBarOpen)

    const [hideTextLink, setHideTextLink] = useState(true);

    const hideTextLinkFunc = () => {
        setHideTextLink(!hideTextLink);
    }

    var hideTextLinkString = '';
    if (hideTextLink === true) {
        hideTextLinkString = 'hidden';
    }
    if (hideTextLink === false) {
        hideTextLinkString = '';
    }

    const hideSidebarFunc = () => {
        dispatch(isSidebarOpenState());
    }

    var hideSidebarString = '';
    if (isSideBarOpen === true) {
        hideSidebarString = 'hidden';
    }
    if (isSideBarOpen === false) {
        hideSidebarString = '';
    } 

    return (
        <aside className={`${hideSidebarString} bg-gray-800 h-screen w-fit top-[4rem] absolute left-0 z-10 overflow-hidden p-4`}>

            <ul className='flex flex-col gap-y-6 text-md text-gray-400'>

                <li className="flex flex-row-reverse ">

                    {
                        hideTextLink === true ?
                            (
                             
                                    <LiaEyeSlash onClick={hideTextLinkFunc} className="text-2xl text-gray-400 hover:bg-white" />
                               
                            )
                            :
                            (
                              
                                    <LiaEyeSolid onClick={hideTextLinkFunc} className="text-2xl text-gray-400 hover:bg-white" />
                              
                            )
                    }

                </li>

                <hr />

                <li> <NavLink to={'/dashboard'} className='flex flex-row items-center gap-x-3' > <span className='text-[1.6rem] '><MdOutlineSpaceDashboard className="text-blue-500" /></span> <span className={`${hideTextLinkString}`}>Dashboard (progress tracking)</span>  </NavLink> </li>

                <hr />

                <li> <NavLink to={'/reviewmodule'} className='flex flex-row items-center gap-x-3' > <span className='text-[1.6rem] '><MdOutlineRateReview className="text-blue-500" /></span> <span className={`${hideTextLinkString}`}>Review Modules</span> </NavLink> </li>

                <hr />

                <li> <NavLink to={'/practicetestandquiz'} className='flex flex-row items-center gap-x-3' > <span className='text-[1.6rem] '><MdOutlineQuiz className="text-blue-500" /></span><span className={`${hideTextLinkString}`}>Practice Test and Quizzes</span> </NavLink> </li>

                <hr />

                <li> <NavLink to={'/learningresource'} className='flex flex-row items-center gap-x-3' > <span className='text-[1.6rem] '><GrResources className="text-blue-500" /></span><span className={`${hideTextLinkString}`}>Learning Resources</span> </NavLink> </li>

                <hr />

                <li>       
                    <IoCloseSharp onClick={hideSidebarFunc} className="text-2xl text-gray-400 hover:bg-white" />              
                </li>

            </ul>

        </aside>
    )
}