import { useEffect, useState } from "react";
import { IoMdColorFill } from "react-icons/io";
import { changeThemeState } from "../feature/themeSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from "flowbite-react";
import { themeHolderTemp } from "../feature/themeSlice";
import { IoSunnySharp } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";

export const Theme = () => {

    const themeHolder = useSelector(themeHolderTemp);

    const dispatch = useDispatch();

    const [showTheme, setShowTheme] = useState(false);

    const HideThemeFunc = () => {
        setShowTheme(false);
    }

    const ShowThemeFunc = () => {
        setShowTheme(!showTheme);
    }
    var closeThemeString = '';

    if (showTheme === true) {
        closeThemeString = 'w-[8rem]';
    }

    return (

        <section className="flex items-center gap-x-4">

            
            <p onClick={ShowThemeFunc} className={`${themeHolder.colortxt1}text-gray-300 cursor-pointer`}>Theme:</p>

            <div className={`${closeThemeString} h-fit w-0 duration-200 ease-in-out flex items-center justify-between overflow-hidden`}>

             
                  <img  onClick={() => { dispatch(changeThemeState('firstColor')); HideThemeFunc() }} className="h-[2.5rem] w-[3.5rem] border cursor-pointer" src="../asset/theme/darkTheme.png" alt="" />
           
                 <img onClick={() => { dispatch(changeThemeState('secondColor')); HideThemeFunc() }} className="h-[2.5rem] w-[3.5rem] border cursor-pointer" src="../asset/theme/lightTheme.png" alt="" />
                

            </div>
        </section>

    )
}