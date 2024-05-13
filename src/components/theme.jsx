
import { changeThemeState } from "../feature/themeSlice";
import { useDispatch, useSelector } from 'react-redux';
import { themeHolderTemp } from "../feature/themeSlice";
import { minimizeSidebarTemp } from "../feature/opensidebarSlice";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import { toggleThemeState } from "../feature/themeSlice";
import { toggleThemeTemp } from "../feature/themeSlice";

export const ThemeInSidebar = () => {
    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);
    const minimizeSidebar = useSelector(minimizeSidebarTemp);
    const toggleTheme = useSelector(toggleThemeTemp);

    return (
        <li className={`${themeHolder.colorbg1} p-4 rounded-md flex justify-between items-center gap-x-3`} >
            {
                minimizeSidebar ?
                    (
                        toggleTheme ?
                            (
                                <li className={`h-full w-full flex items-center justify-center`} >
                                    <FaSun onClick={() => { dispatch(toggleThemeState()); dispatch(changeThemeState('firstColor')); }} className="text-2xl text-yellow-500" />
                                </li>
                            )
                            :
                            (
                                <li className={`h-full w-full flex items-center justify-center`} >
                                    <BsFillMoonStarsFill onClick={() => { dispatch(toggleThemeState()); dispatch(changeThemeState('secondColor')); }} className="text-2xl text-white" />
                                </li>
                            )
                    )
                    :
                    (
                        <>
                            <p className={`${minimizeSidebar ? 'hidden' : ''} text-gray-300`}>Theme</p>
                            {
                                toggleTheme ?
                                    (
                                        <div onClick={() => { dispatch(changeThemeState('firstColor')); dispatch(toggleThemeState()); }} className="h-[2rem] w-[4.6rem] pl-2.5 border border-yellow-500 rounded-[25rem] flex items-center justify-between cursor-pointer">
                                            <p className="text-gray-200 text-sm">day</p>
                                            <div className="h-[2rem] w-[2rem] border border-yellow-500 rounded-[50%] flex items-center justify-center">
                                                <FaSun className="text-[1.2rem] text-yellow-500" />
                                            </div>

                                        </div>
                                    )
                                    :
                                    (
                                        <div onClick={() => { dispatch(changeThemeState('secondColor')); dispatch(toggleThemeState()); }} className="h-[2rem] w-[4.6rem] pr-1.5 border border-yellow-500 rounded-[25rem] flex flex-row-reverse items-center justify-between cursor-pointer">
                                            <p className="text-gray-200 text-sm">night</p>
                                            <div className="h-[2rem] w-[2rem] border border-yellow-500 rounded-[50%] flex items-center justify-center">
                                                <BsFillMoonStarsFill className="text-1xl text-white" />
                                            </div>

                                        </div>
                                    )
                            }
                        </>

                    )
            }


        </li>
    )
}