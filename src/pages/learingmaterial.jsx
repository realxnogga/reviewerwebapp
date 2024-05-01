
import { Hamburger } from "../components/hamburger";
import { themeHolderTemp } from "../feature/themeSlice";
import { useSelector } from 'react-redux';
import { Note } from "../components/note";
import { ToggleNoteFlashcard } from "../components/togglenoteflashcard";
import { ToggleNoteFlashcardIcon } from "../components/togglenoteflashcardicon";
import { FlashCard } from "../components/flashcard";
import { whatIsClickToggleNoteflashCardTemp } from "../feature/opentogglenoteflashcardSlice";

export const LearningMaterial = () => {

    const themeHolder = useSelector(themeHolderTemp);
    const whatIsClickToggleNoteflashCard = useSelector(whatIsClickToggleNoteflashCardTemp);

    var container = '';
    if (whatIsClickToggleNoteflashCard === 'note') container = <Note />;
    if (whatIsClickToggleNoteflashCard === 'flashcard') container = <FlashCard />;
    
    return (
        <>
            <div className={`${themeHolder.colorbg3} relative bg-gray-700 mt-[4rem] py-4 h-screen w-screen flex items-center justify-center`}>
                <Hamburger />
                <ToggleNoteFlashcardIcon />
                <ToggleNoteFlashcard />
      
                    {container}        
             
            </div>
        </>

    );
}
