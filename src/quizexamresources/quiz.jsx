

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { whatIsClickToggleQuizExamTemp } from "../feature/opentogglequizexamSlice";
import { themeHolderTemp } from '../feature/themeSlice';
import { FoundationOfEducationQuiz1JSON } from './foundationofeducationquiz1JSON';
import { PrincipleOfTeachingQuiz1JSON } from './principleofteachingquiz1JSON';
import { ChildAndAdolescentDevelopmentQuiz1JSON } from './child&adolescentdevelopmentquiz1JSON';
export const Quiz = () => {
    const themeHolder = useSelector(themeHolderTemp);
    const whatIsClickToggleQuizExam = useSelector(whatIsClickToggleQuizExamTemp);

    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    const [indexofQuestion, setIndexofQuestion] = useState(0);


    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        setIndexofQuestion(questionIndex); // to access the index of answered question outside of this function
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = selectedAnswer;
        setAnswers(updatedAnswers);
    };

    const handleFinishQuiz = () => {
        let totalScore = 0;
        answers.forEach((selectedAnswer, index) => {
            if (
                selectedAnswer === questions[index].answer
            ) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setShowScore(true);
    };

    const [startQuiz, setStartQuiz] = useState(false);
    let questions = '';
    let quizTitle = '';

    if (whatIsClickToggleQuizExam === 'FoundationofEducationQuiz1') {
        questions = FoundationOfEducationQuiz1JSON;
        quizTitle = 'Quiz1 in Foundation of Education';
    }
    else if (whatIsClickToggleQuizExam === 'PrinciplesofTeachingQuiz1') {
        questions = PrincipleOfTeachingQuiz1JSON;
        quizTitle = 'Quiz1 in Principle of Teaching';
    }
    else if (whatIsClickToggleQuizExam === 'ChildandAdolescentDevelopmentQuiz1') {
        questions = ChildAndAdolescentDevelopmentQuiz1JSON;
        quizTitle = 'Quiz1 in Child and Adolescent Development';
    }

    // reset if change tab
    useEffect(() => {
        setStartQuiz(false);
        setShowScore(false);
        setIndexofQuestion(0);
        setAnswers([]);
    }, [whatIsClickToggleQuizExam])

    return (
        <>

            {
                whatIsClickToggleQuizExam === 'none' ? // checks if the user clicks on any subject tab
                    (
                        <section className="h-[91%] w-full flex items-center justify-center flex-col gap-y-2.5 text-center">
                            <img className="h-[17rem] mobile:h-[13rem]"
                                src="../../asset/emptyImg/emptyImg.png" alt="empty image" />
                            <h3 className={`text-gray-400 text-[3rem] font-bold mobile:text-[2rem] `}>
                                No Selected Reviewer </h3>
                            <span className="text-gray-400">You can select at the right sidebar.</span>
                        </section>
                    )
                    :
                    (
                        // checks if question is typeof array and is empty or not
                        Array.isArray(questions) && questions.length > 0 ?
                            (

                                !startQuiz ? // checks if the user clicks on start quiz button
                                    (
                                        <div className='flex flex-col items-center gap-y-8 text-center'>
                                            <p className={`${themeHolder.colortxt1} text-4xl font-semibold mobile:text-2xl`}>{quizTitle}</p>

                                            <button onClick={() => { setStartQuiz(true) }} className="h-[4rem] w-[8rem] mobile:h-[3rem] mobile:w-[6.5rem] mobile:gap-x-2 mobile:text-lg flex items-center justify-center gap-x-4 bg-yellow-500 border-none rounded-lg text-xl text-white font-semibold">
                                                Start Quiz
                                            </button>
                                        </div>                 
                                    )
                                    :
                                    (
                                        <div>
                                            <div>
                                                {showScore ? (
                                                   <div className={`${themeHolder.colortxt1} flex flex-col items-center justify-center gap-y-5 `}>
                                                   <h2 className='text-5xl font-semibold mobile:text-4xl'>Quiz Completed!</h2>
                                                   <h3 className='text-3xl mobile:text-2xl'>Your Score: {score}</h3>
                                                  
                                                   <button onClick={() => { setShowScore(false); setIndexofQuestion(0); setAnswers([]) }} className="h-[3rem] w-[6rem] mobile:h-[3rem] mobile:w-[6.5rem] mobile:gap-x-2 mobile:text-lg flex items-center justify-center gap-x-4 border-none bg-yellow-500 rounded-lg text-lg font-semibold">
                                                       Try again
                                                    </button>
                                               </div>
                                                )
                                                    :
                                                    (

                                                        <div className='absolute w-[40rem] max-w-[95%] translate-x-[-50%] top-0'>
                                                            <p className={`${themeHolder.colortxt1} text-3xl font-semibold pb-5 mobile:text-2xl`}>{quizTitle}</p>
                                                            {questions.map((question, index) => (
                                                                <div key={index} className='w-full border border-gray-4 00 rounded-lg overflow-hidden mb-5'>
                                                                    <p className={`${themeHolder.colorbg2} text-gray-300 font-bold h-[2rem] w-full flex items-center pl-4 `}>Question {index + 1}</p>
                                                                    <div className={`${themeHolder.colortxt1} p-2`}>
                                                                        <h3 className='font-semibold'>{question.question}</h3>
                                                                        {question.type === 'radio' && (
                                                                            <ul>
                                                                                {question.options.map((option, optionIndex) => (
                                                                                    <li key={optionIndex} className='py-0.5'>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name={`question${index}`}
                                                                                            value={option}
                                                                                            onChange={() =>
                                                                                                handleAnswerSelection(index, option)
                                                                                            }
                                                                                        />
                                                                                        {option}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {questions.length === (indexofQuestion + 1) && (
                                                                <button onClick={handleFinishQuiz} className="h-[3rem] w-[6rem] mobile:h-[3rem] mobile:w-[6.5rem] mobile:gap-x-2 mobile:text-lg flex items-center justify-center gap-x-4 bg-yellow-500 border-none rounded-lg text-lg text-white font-semibold">
                                                                    Submit
                                                                </button>

                                                            )}
                                                        </div>


                                                    )}
                                            </div>
                                        </div>
                                    )


                            )
                            :
                            (
                                <section className="h-[91%] w-full flex items-center justify-center flex-col gap-y-2.5 text-center">
                                    <img className="h-[17rem] mobile:h-[13rem]"
                                        src="../../asset/emptyImg/emptyImg.png" alt="" />
                                    <h3 className={`text-gray-400 text-[3rem] font-bold mobile:text-[2rem] `}>
                                        Nothing to See Here </h3>
                                    <span className="text-gray-400">This subject is empty. You can choose another subject for the meantime.</span>
                                </section>
                            )


                    )
            }

        </>
    );
}    