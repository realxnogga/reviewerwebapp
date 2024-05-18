


import { themeHolderTemp } from "../feature/themeSlice";
import { useSelector, useDispatch } from 'react-redux';
import { RxSwitch } from "react-icons/rx";
import { IoMdSwitch } from "react-icons/io";
import { isToggleQuizExamOpenState } from "../feature/opentogglequizexamSlice";

export const ToggleQuizExamIcon = () => {
    const themeHolder = useSelector(themeHolderTemp);
    const dispatch = useDispatch();
    
    return (
        <IoMdSwitch onMouseOver={() => {dispatch(isToggleQuizExamOpenState())}} className={`${themeHolder.colortxt1} 
        absolute top-4 right-4 text-gray-300 text-[2rem] rounded-sm`}/>
    )
}