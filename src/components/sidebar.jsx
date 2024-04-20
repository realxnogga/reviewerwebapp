

import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineQuiz } from "react-icons/md";
import { GrResources } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import { BsBookshelf } from "react-icons/bs";
import { LiaEyeSlash } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { isSidebarOpenState, whatIsClickedState, isSideBarOpenTemp, whatIsClickedTemp } from "../feature/opensidebarSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { themeHolderTemp } from "../feature/themeSlice";

export const Sidebar = () => {

    const themeHolder = useSelector(themeHolderTemp);   

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
        <aside className={`${hideSidebarString} ${themeHolder.colorbg2} bg-gray-800 h-screen w-fit top-[4rem] absolute left-0 z-10 overflow-hidden border-r border-r-yellow-500`}>

            <ul className='flex flex-col text-md '>

                {
                    
                    (
                        hideTextLink === true ?
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

                <li onClick={() => { dispatch(whatIsClickedState('dashboard')) }} className={`${whatIsClicked === 'dashboard' ? themeHolder.colorbg1 : ''} p-4 flex flex-row items-center gap-x-3 cursor-pointer`}>
                    <span><MdOutlineSpaceDashboard className="text-yellow-500 text-[1.6rem] " /></span>
                    <span className={`${hideTextLinkString} ${themeHolder.colortxt1} text-gray-300 `}>Dashboard</span>
                </li>

                     

                <li onClick={() => { dispatch(whatIsClickedState('practicetestandquiz')) }} className={`${whatIsClicked === 'practicetestandquiz' ? themeHolder.colorbg1 : ''} p-4 flex flex-row items-center gap-x-3 cursor-pointer`} >
                    <span><MdOutlineQuiz className={`text-yellow-500 text-[1.6rem]`}/></span>
                    <span className={`${hideTextLinkString} ${themeHolder.colortxt1} text-gray-300 `}>Practice Test & Quizzes</span>
                </li>

    

                <li onClick={() => { dispatch(whatIsClickedState('learningresources')) }} className={`${whatIsClicked === 'learningresources' ? themeHolder.colorbg1 : ''} p-4 flex flex-row items-center gap-x-3 cursor-pointer`} >
                    <span><GrResources className="text-yellow-500 text-[1.6rem]" /></span>
                    <span className={`${hideTextLinkString} ${themeHolder.colortxt1} text-gray-300 `}>Learning Resources</span>
                </li>

          

                <li onClick={() => { dispatch(whatIsClickedState('learningmaterial')) }} className={`${whatIsClicked === 'learningmaterial' ? themeHolder.colorbg1 : ''} p-4 flex flex-row items-center gap-x-3 cursor-pointer`} >
                    <span><BsBookshelf className="text-yellow-500 text-[1.6rem]" /></span>
                    <span className={`${hideTextLinkString} ${themeHolder.colortxt1} text-gray-300 `}>Learning Material</span>
                </li>

            </ul>

        </aside>
    )
}