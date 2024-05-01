

import { themeHolderTemp } from "../feature/themeSlice";
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineNoteAlt } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { isToggleNoteFlashcardOpenTemp } from "../feature/opentogglenoteflashcardSlice";
import { clearIsToggleNoteFlashCardOpenState } from "../feature/opentogglenoteflashcardSlice";
import { whatIsClickToggleNoteflashCardState } from "../feature/opentogglenoteflashcardSlice";
import { whatIsClickToggleNoteflashCardTemp } from "../feature/opentogglenoteflashcardSlice";


export const ToggleNoteFlashcard = () => {

    const themeHolder = useSelector(themeHolderTemp);
    const dispatch = useDispatch();

    const isToggleNoteFlashCardOpen = useSelector(isToggleNoteFlashcardOpenTemp);

    const CloseToggleNoteFlashcardFunc = () => {
        dispatch(clearIsToggleNoteFlashCardOpenState());
    }

    const whatIsClickToggleNoteflashCard = useSelector(whatIsClickToggleNoteflashCardTemp);

    return (
        <aside className={`${themeHolder.colorbg2} ${isToggleNoteFlashCardOpen ? 'w-[8rem]  ' : ''} absolute  top-0 right-0 bg-gray-800 h-full w-0 overflow-hidden z-10`}>


            <ul className="flex flex-col">
                <li className="py-3 px-4">
                    <IoMdClose onClick={CloseToggleNoteFlashcardFunc} className={`${themeHolder.colortxt1} text-gray-300 text-2xl hover:bg-red-500`} />
                </li>

                <li 
                onClick={() => dispatch(whatIsClickToggleNoteflashCardState('note'))} 
                className={`hover:${themeHolder.colorbg1} 
                ${whatIsClickToggleNoteflashCard == 'note' ? themeHolder.colorbg1 : ''} flex items-center justify-start gap-x-3 py-3 px-4 cursor-pointer`}>
                    <MdOutlineNoteAlt className="text-[2rem] text-yellow-500" />
                    <span className={`${themeHolder.colortxt1} text-gray-300 text-xl`}>Note</span>
                </li>

                <li 
                onClick={() => dispatch(whatIsClickToggleNoteflashCardState('flashcard'))} 
                className={`hover:${themeHolder.colorbg1} 
                ${whatIsClickToggleNoteflashCard == 'flashcard' ? themeHolder.colorbg1 : ''} flex items-center justify-start gap-x-3 py-3 px-4 cursor-pointer`}>
                    <IoFlashOutline className="text-[2rem] text-yellow-500 " />
                    <span className={`${themeHolder.colortxt1} text-gray-300 text-xl`}>Flash</span>
                </li>

            </ul>

        </aside>
    )
}