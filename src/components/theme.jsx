import { useEffect, useState } from "react";
import { IoMdColorFill } from "react-icons/io";
import { changeThemeState } from "../feature/themeSlice";
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from "flowbite-react";
import { themeHolderTemp } from "../feature/themeSlice";

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
        closeThemeString = 'w-[4rem]';
    }




    return (
        <section className="flex flex-row-reverse items-center gap-x-4">

          
                <IoMdColorFill onClick={ShowThemeFunc} className="text-gray-300 text-[1.8rem] cursor-pointer" />
          

            <div className={`${closeThemeString} h-fit w-0 duration-200 ease-in-out flex items-center justify-between overflow-hidden`}>

                <div onClick={() => { dispatch(changeThemeState('firstColor')); HideThemeFunc() }} className="h-[1.5rem] w-[1.5rem] flex rounded-[50%] overflow-hidden hover:border-double hover:border-4 hover:border-indigo-500 cursor-pointer">
                    <div className="bg-gray-800 h-full w-full"></div>
                    <div className="bg-gray-700 h-full w-full"></div>
                    <div className="bg-gray-300 h-full w-full"></div>
                </div>

                <div onClick={() => { dispatch(changeThemeState('secondColor')); HideThemeFunc() }} className="h-[1.5rem] w-[1.5rem] flex rounded-[50%] overflow-hidden hover:border-double hover:border-4 hover:border-indigo-500 cursor-pointer">
                    <div className="bg-[#236277] h-full w-full"></div>
                    <div className="bg-[#47b5FF] h-full w-full"></div>
                    <div className="bg-white h-full w-full"></div>
                </div>
                {/* -------------------------- */}



            </div>
        </section>

    )
}