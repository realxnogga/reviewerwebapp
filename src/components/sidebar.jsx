

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { LiaEyeSlash } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { isSidebarOpenState, whatIsClickedState, isSideBarOpenTemp, whatIsClickedTemp, clearIsSidebarOpenState } from "../feature/opensidebarSlice";
import { useDispatch, useSelector } from 'react-redux';
import { themeHolderTemp } from "../feature/themeSlice";
import { FiBox } from "react-icons/fi";
import { minimizeSidebarState } from "../feature/opensidebarSlice";
import { minimizeSidebarTemp } from "../feature/opensidebarSlice";
import { LogoutInSidebar } from "./logoutbutton";
import { ThemeInSidebar } from "./theme";
import { useEffect, useState } from "react";


export const Sidebar = () => {

    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);
    const whatIsClicked = useSelector(whatIsClickedTemp);
    const minimizeSidebar = useSelector(minimizeSidebarTemp);

    const hideTextLinkFunc = () => {dispatch(minimizeSidebarState());}
    const hideSidebarFunc = () => { dispatch(isSidebarOpenState()); }

    const isSideBarOpen = useSelector(isSideBarOpenTemp);

    //onMouseLeave wont work if sidebar is minimize
    const OnmouseLeaveFunc = () => {
        if (!minimizeSidebar) {
            dispatch(clearIsSidebarOpenState());
        }
    }

    return (
        <aside onMouseLeave={OnmouseLeaveFunc} className={`${isSideBarOpen ? 'w-[16.7rem] px-2 border-r border-r-yellow-500' : 'w-0 px-0 border-none'} ${minimizeSidebar ? 'w-[4.8rem]' : ''} 
        ${themeHolder.colorbg2} absolute left-0 z-10 bg-gray-800 h-screen top-[4rem] text-nowrap overflow-hidden`}>

            <ul className='flex flex-col text-md '>
                {
                    (
                        minimizeSidebar === true ?
                            (
                                <div className="p-4">
                                    <LiaEyeSlash onClick={hideTextLinkFunc} className={`${themeHolder.colortxt1} text-2xl text-gray-400`} />
                                </div>
                            )
                            :
                            (
                                <div className="flex flex-row justify-between p-4">
                                    <LiaEyeSolid onClick={hideTextLinkFunc} className={`${themeHolder.colortxt1} text-2xl text-gray-400 `} />

                                    <IoCloseSharp onClick={hideSidebarFunc} className={`${themeHolder.colortxt1} text-2xl text-gray-400 hover:bg-red-500`} />
                                </div>
                            )
                    )
                }

                <li onClick={() => { dispatch(whatIsClickedState('dashboard')) }} className={`${whatIsClicked === 'dashboard' ? themeHolder.tabidentifier : ''} hover:${themeHolder.tabidentifierhover} p-4 rounded-md flex flex-row items-center gap-x-3 cursor-pointer`}>        
                        <span><MdOutlineSpaceDashboard className="text-yellow-500 text-[1.8rem] " /></span>
                        <span className={`${minimizeSidebar ? 'hidden' : ''} ${themeHolder.colortxt1} text-gray-300 `}>Dashboard</span>
                </li>



                <li onClick={() => { dispatch(whatIsClickedState('practicetestandquiz')) }} className={`${whatIsClicked === 'practicetestandquiz' ? themeHolder.tabidentifier : ''} hover:${themeHolder.tabidentifierhover} p-4 rounded-md flex flex-row items-center gap-x-3 cursor-pointer`} >
                    <span><MdOutlineQuiz className={`text-yellow-500 text-[1.8rem]`} /></span>
                    <span className={`${minimizeSidebar ? 'hidden' : ''} ${themeHolder.colortxt1} text-gray-300`}>
                   Practice Test and Quizzes </span>
                </li>



                <li onClick={() => { dispatch(whatIsClickedState('learningresources')) }} className={`${whatIsClicked === 'learningresources' ? themeHolder.tabidentifier : ''} hover:${themeHolder.tabidentifierhover} p-4 rounded-md flex flex-row items-center gap-x-3 cursor-pointer`} >
                    <span><GrResources className="text-yellow-500 text-[1.8rem]" /></span>
                    <span className={`${minimizeSidebar ? 'hidden' : ''} ${themeHolder.colortxt1} text-gray-300 `}>Learning Resources</span>
                </li>



                <li onClick={() => { dispatch(whatIsClickedState('learningmaterial')) }} className={`${whatIsClicked === 'learningmaterial' ? themeHolder.tabidentifier : ''} hover:${themeHolder.tabidentifierhover} p-4 rounded-md flex flex-row items-center gap-x-3 cursor-pointer`} >
                    <span><FiBox className="text-yellow-500 text-[1.8rem]" /></span>
                    <span className={`${minimizeSidebar ? 'hidden' : ''} ${themeHolder.colortxt1} text-gray-300 `}>Learning Material</span>
                </li>

                <hr className="border border-gray-400 my-4"/>

                <LogoutInSidebar />
                <ThemeInSidebar />
    
            </ul>

        </aside>
    )
}