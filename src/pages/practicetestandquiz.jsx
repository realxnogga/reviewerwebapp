

import { Hamburger } from "../components/hamburger";
import { useSelector } from 'react-redux';
import { themeHolderTemp } from "../feature/themeSlice";
import { ToggleQuizExam } from "../components/togglequizexam";
import { ToggleQuizExamIcon } from "../components/togglequizexamicon";
import { Quiz } from "../quizexamresources/sample";

export const PracticeTestAndQuiz = () => {

    const themeHolder = useSelector(themeHolderTemp);
   

    return (
        <>
            <div className={`${themeHolder.colorbg3} relative bg-gray-700 mt-[4rem] py-4 h-screen w-screen flex items-center justify-center`}>
                <Hamburger />
                <ToggleQuizExam />
                <ToggleQuizExamIcon />

                <section className="bg-green-500 h-[90%] w-[69rem] max-w-[95%] flex items-center justify-center mobile:justify-center gap-4 overflow-scroll noScrollbar">
                 
                 <Quiz />
                  
                </section>
                

            </div>
        </>

    );
}
