
import { themeHolderTemp } from "../../feature/themeSlice";
import { useSelector, useDispatch } from 'react-redux';
import { RxSwitch } from "react-icons/rx";
import { IoMdSwitch } from "react-icons/io";
import { isToggleNoteFlashCardOpenState } from "../../feature/opentogglenoteflashcardSlice";

export const ToggleNoteFlashcardIcon = () => {
    const themeHolder = useSelector(themeHolderTemp);

    const dispatch = useDispatch();
    
    const OpenToggleNoteFlashcardFunc = () => {
        dispatch(isToggleNoteFlashCardOpenState());
    }

    return (
        <IoMdSwitch onClick={OpenToggleNoteFlashcardFunc} className={`${themeHolder.colortxt1} 
        absolute top-4 right-4 text-gray-300 text-[2rem] hover:bg-yellow-500 rounded-sm`}/>
    )
}