

import { Hamburger } from "../components/hamburger";
import { useSelector } from 'react-redux';
import { themeHolderTemp } from "../feature/themeSlice";
import { ToggleQuizExam } from "../components/togglequizexam";
import { ToggleQuizExamIcon } from "../components/togglequizexamicon";
import { Quiz } from "../quizexamresources/quiz";

export const PracticeTestAndQuiz = () => {

    const themeHolder = useSelector(themeHolderTemp);


    return (
        <>
            <div className={`${themeHolder.colorbg3} relative bg-gray-700 mt-[4rem] py-4 h-screen w-screen flex items-center justify-center`}>
                <Hamburger />
                <ToggleQuizExam />
                <ToggleQuizExamIcon />

                <section className="relative h-[90%] w-[69rem] max-w-[95%] flex items-center justify-center overflow-scroll noScrollbar">
                    <Quiz />
                </section>

            </div>
        </>

    );
}
