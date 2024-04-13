
import { Hamburger } from "../components/hamburger";
import { themeHolderTemp } from "../feature/themeSlice";
import { useSelector } from 'react-redux';
import { ToggleNoteFlashcard } from "./learningmaterialcomponent/togglenoteflashcard";
import { ToggleNoteFlashcardIcon } from "./learningmaterialcomponent/togglenoteflashcardicon";
import { Note } from "./learningmaterialcomponent/note";
import { FlashCard } from "./learningmaterialcomponent/flashcard";
import { whatIsClickToggleNoteflashCardTemp } from "../feature/opentogglenoteflashcardSlice";

export const LearningMaterial = () => {

    const themeHolder = useSelector(themeHolderTemp);
    const whatIsClickToggleNoteflashCard = useSelector(whatIsClickToggleNoteflashCardTemp);

    var container = '';
    if (whatIsClickToggleNoteflashCard === 'note') {
        container = <Note />;
    }
    if (whatIsClickToggleNoteflashCard === 'flashcard') {
        container = <FlashCard />;
    }
    
    return (
        <>
            <div className={`${themeHolder.colorbg3} relative bg-gray-700 mt-[4rem] py-4 h-screen w-screen flex items-center justify-center`}>
                <Hamburger />
                <ToggleNoteFlashcardIcon />
                <ToggleNoteFlashcard />

                <div className="h-[90%] w-[69rem]  max-w-[95%]">
      
                    {container}           

                </div>
            </div>
        </>

    );
}
