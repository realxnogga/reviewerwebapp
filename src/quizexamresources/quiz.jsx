

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { whatIsClickToggleQuizExamTemp } from "../feature/opentogglequizexamSlice";
import { userdataTemp } from '../feature/data/userdataSlice';
import { themeHolderTemp } from '../feature/themeSlice';
import { FoundationOfEducationQuiz1JSON } from './foundationofeducationquiz1JSON';
import { PrincipleOfTeachingQuiz1JSON } from './principleofteachingquiz1JSON';
import { InsertQuizThunk } from '../feature/quizSlice';
import { FacilitatingLearningQuiz1JSON } from './facilitatinglearningquiz1JSON';
import { isQuizDataInsertedTemp } from '../feature/quizSlice';
import { ShowToast } from '../components/toaster';
import { ClearIsQuizDataInsertedState } from '../feature/quizSlice';
import { GetQuizThunk } from '../feature/quizSlice';

import { FoundationOfEducationExam1JSON } from './foundationofeducationexam1JSON';
import { PrincipleOfTeachingExam1JSON } from './principleofteachingexam1JSON';
import { ChildAndAdolescentDevelopmentExam1JSON } from './childandadolescentdevelopmentexam1JSON';
import { ChildandAdolescentDevelopmentQuiz1JSON } from './childanddolescentdevelopmentquiz1JSON';
import { FacilitatingLearningExam1JSON } from './facilitatinglearningexam1JSON';
import { AssessmentOfStudentLearningExam1JSON } from './assesmentofstudentlearningexam1JSON';
import { AssessmentOfStudentLearningQuiz1JSON } from './assesmentofstudentlearningquiz1JSON';
import { DAPTExam1JSON } from './daptexam1JSON';
import { DAPTQuiz1JSON } from './daptquiz1JSON';
import { CurriculumDevelopmentExam1JSON } from './curriculumdevelopmentexam1JSON';
import { CurriculumDevelopmentQuiz1JSON } from './curriculumdevelopmentquiz1JSON';
import { FieldStudyandPracticeExam1JSON } from './fieldstudyandpracticeexam1JSON';
import { FieldStudyandPracticeQuiz1JSON } from './fieldstudyandpracticequiz1JSON';

export const Quiz = () => {

    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);
    const whatIsClickToggleQuizExam = useSelector(whatIsClickToggleQuizExamTemp);
    const isQuizDataInserted = useSelector(isQuizDataInsertedTemp);

    const userdata = useSelector(userdataTemp);
    if (Object.keys(userdata).length != 0) {
        var userID = userdata.ID;
        var name = userdata.username;
    }

    const [quizSubject, setQuizSubject] = useState('');
    const [quizQuestion, setQuizQuestion] = useState([]);
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [showScore, setShowScore] = useState(false);
    let [indexofQuestion, setIndexofQuestion] = useState(0);
    const [type, setType] = useState('');

    const [answerCorrectness, setAnswerCorrectness] = useState([]);
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const [explanations, setExplanations] = useState([]);

    const handleAnswerSelection = (questionIndex, selectedAnswer) => {
        setIndexofQuestion(indexofQuestion + 1); // count the number of selected answer then display the submit btn if it equals to questions.length

        const updatedAnswers = [...answers];
        const updatedCorrectness = [...answerCorrectness];
        const updatedAnsweredQuestions = [...answeredQuestions];
        const updatedExplanations = [...explanations];

        updatedAnswers[questionIndex] = selectedAnswer;
        const isCorrect = selectedAnswer === quizQuestion[questionIndex].answer;
        updatedCorrectness[questionIndex] = selectedAnswer === quizQuestion[questionIndex].answer;
        updatedAnsweredQuestions[questionIndex] = true;
        updatedExplanations[questionIndex] = isCorrect ? '' : quizQuestion[questionIndex].explanation;

        setAnswers(updatedAnswers);
        setAnswerCorrectness(updatedCorrectness);
        setAnsweredQuestions(updatedAnsweredQuestions);
        setExplanations(updatedExplanations);

    };

    const handleFinishQuiz = () => {
        let totalScore = 0;
        answers.forEach((selectedAnswer, index) => {
            if (selectedAnswer === questions[index].answer) {
                totalScore++;
            }
        });
        setScore(totalScore);
        setShowScore(true);


        const dateNow = new Date();

        const year = dateNow.getFullYear();
        const month = String(dateNow.getMonth() + 1).padStart(2, '0');
        const day = String(dateNow.getDate()).padStart(2, '0');

        const fullDate = `${year}-${month}-${day}`;

        console.log(fullDate);

        const quizdatatemp = {
            quiztaker: name,
            quiztakerid: userID,
            quizsubject: quizSubject,
            quizscore: totalScore,
            quiztotalitem: quizQuestion.length,
            quiztype: type,
            quizdatetaken: fullDate,
        }
        console.log(quizdatatemp);
        dispatch(InsertQuizThunk({ quizdatatemp }));

    };

    useEffect(() => {
        if (isQuizDataInserted === true) {
            dispatch(GetQuizThunk(name));
            dispatch(ClearIsQuizDataInsertedState());
        }
        if (isQuizDataInserted === false) {
            dispatch(ClearIsQuizDataInsertedState());
        }

    }, [isQuizDataInserted])

    const [startQuiz, setStartQuiz] = useState(false);
    let subject = '';
    let questions = '';
    let quizTitle = '';
    let reviewerType = '';

    if (whatIsClickToggleQuizExam === 'FoundationofEducationExam1') {
        questions = FoundationOfEducationExam1JSON;
        quizTitle = 'Exam1 in Foundation of Education';
        subject = 'FE exam1';
        reviewerType = 'exam'
    }
    else if (whatIsClickToggleQuizExam === 'FoundationofEducationQuiz1') {
        questions = FoundationOfEducationQuiz1JSON;
        quizTitle = 'Quiz1 in Foundation of Education';
        subject = 'FE quiz1';
        reviewerType = 'quiz'
    }
    // ---------------------------------------------------------
    else if (whatIsClickToggleQuizExam === 'PrinciplesofTeachingQuiz1') {
        questions = PrincipleOfTeachingQuiz1JSON;
        quizTitle = 'Quiz1 in Principle of Teaching';
        subject = 'PT quiz1';
        reviewerType = 'quiz'
    }
    else if (whatIsClickToggleQuizExam === 'PrinciplesofTeachingExam1') {
        questions = PrincipleOfTeachingExam1JSON;
        quizTitle = 'Exam1 in Principle of Teaching';
        subject = 'PT exam1';
        reviewerType = 'exam'
    }
// ---------------------------------------------------------
    else if (whatIsClickToggleQuizExam === 'ChildandAdolescentDevelopmentExam1') {
        questions = ChildAndAdolescentDevelopmentExam1JSON;
        quizTitle = 'Exam1 in Child and Adolescent Development';
        subject = 'CAD exam1';
        reviewerType = 'exam';
    }

    else if (whatIsClickToggleQuizExam === 'ChildandAdolescentDevelopmentQuiz1') {
        questions = ChildandAdolescentDevelopmentQuiz1JSON;
        quizTitle = 'Quiz1 in Child and Adolescent Development';
        subject = 'CAD quiz1';
        reviewerType = 'quiz';
    }
    //------------------------------------------------------------------
    else if (whatIsClickToggleQuizExam === 'FacilitatingLearningExam1') {
        questions = FacilitatingLearningExam1JSON;
        quizTitle = 'Exam1 in Facilitating Learning';
        subject = 'FL exam1';
        reviewerType = 'exam';
    }

    else if (whatIsClickToggleQuizExam === 'FacilitatingLearningQuiz1') {
        questions = FacilitatingLearningQuiz1JSON;
        quizTitle = 'Quiz1 in Facilitating Learning';
        subject = 'FL quiz1';
        reviewerType = 'quiz';
    }
    //------------------------------------------------------------------
    else if (whatIsClickToggleQuizExam === 'AssessmentofStudentLearningExam1') {
        questions = AssessmentOfStudentLearningExam1JSON;
        quizTitle = 'Exam1 in Assessment of Student Learning';
        subject = 'ASL exam1';
        reviewerType = 'exam';
    }
    else if (whatIsClickToggleQuizExam === 'AssessmentofStudentLearningQuiz1') {
        questions = AssessmentOfStudentLearningQuiz1JSON;
        quizTitle = 'Quiz1 in Assessment of Student Learning';
        subject = 'ASL quiz1';
        reviewerType = 'quiz';
    }
     //------------------------------------------------------------------
    else if (whatIsClickToggleQuizExam === 'DevelopmentallyAppropriatePracticesinTeachingExam1') {
        questions = DAPTExam1JSON;
        quizTitle = 'Exam1 in Developmentally Appropriate Practices in Teaching';
        subject = 'DAPT exam1';
        reviewerType = 'exam';
    }
    else if (whatIsClickToggleQuizExam === 'DevelopmentallyAppropriatePracticesinTeachingQuiz1') {
        questions = DAPTQuiz1JSON;
        quizTitle = 'Quiz1 in Developmentally Appropriate Practices in Teaching';
        subject = 'DAPT quiz1';
        reviewerType = 'quiz';
    }
    //------------------------------------------------------------------
    else if (whatIsClickToggleQuizExam === 'CurriculumDevelopmentExam1') {
        questions = CurriculumDevelopmentExam1JSON;
        quizTitle = 'Exam1 in Curriculum Development';
        subject = 'CD exam1';
        reviewerType = 'exam';
    }

    else if (whatIsClickToggleQuizExam === 'CurriculumDevelopmentQuiz1') {
        questions = CurriculumDevelopmentQuiz1JSON;
        quizTitle = 'Quiz1 in Curriculum Development';
        subject = 'CD quiz1';
        reviewerType = 'quiz';
    }
      //------------------------------------------------------------------
    else if (whatIsClickToggleQuizExam === 'FieldStudyandPracticeExam1') {
        questions = FieldStudyandPracticeExam1JSON;
        quizTitle = 'Exam1 in Field Study and Practice';
        subject = 'FSP exam1';
        reviewerType = 'exam';
    }
    else if (whatIsClickToggleQuizExam === 'FieldStudyandPracticeQuiz1') {
        questions = FieldStudyandPracticeQuiz1JSON;
        quizTitle = 'Quiz1 in Field Study and Practice';
        subject = 'FSP quiz1';
        reviewerType = 'quiz';
    }
    
    

    // reset if change tab
    useEffect(() => {
        setQuizQuestion(questions);
        setQuizSubject(subject);
        setStartQuiz(false);
        setShowScore(false);
        setIndexofQuestion(0);
        setAnswers([]);
        setType(reviewerType);
        setAnswerCorrectness([]);
        setAnsweredQuestions([]);
        setExplanations([]);
    }, [whatIsClickToggleQuizExam])
    // reset if the tryagain button is clicked
    const handleTryAgain = () => {
        setQuizQuestion(questions);
        setQuizSubject(subject);
        setStartQuiz(false);
        setShowScore(false);
        setIndexofQuestion(0);
        setAnswers([]);
        setType(reviewerType);
        setAnswerCorrectness([]);
        setAnsweredQuestions([]);
        setExplanations([]);
    }

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
                                            <p className={`${themeHolder.colortxt1} text-4xl font-semibold mobile:text-1xl`}>{quizTitle}</p>
                                            <p className={`${themeHolder.colortxt1} text-2xl`}>Number of Items : {quizQuestion.length}</p>
                                            <button onClick={() => { setStartQuiz(true) }} className="h-[4rem] w-[8rem] mobile:h-[3rem] mobile:w-[6.5rem] mobile:gap-x-2 mobile:text-lg flex items-center justify-center gap-x-4 bg-yellow-500 border-none rounded-lg text-xl text-white font-semibold">
                                                Start Quiz </button>
                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            <div>
                                                {showScore ?
                                                    (
                                                        <div className={`${themeHolder.colortxt1} flex flex-col items-center justify-center gap-y-5 `}>
                                                            <h2 className='text-5xl font-semibold mobile:text-4xl'>Quiz Completed!</h2>
                                                            <h3 className='text-3xl mobile:text-2xl'>Your Score: {score}</h3>

                                                            <button onClick={handleTryAgain} className="h-[3rem] w-[6rem] mobile:h-[3rem] mobile:w-[6.5rem] mobile:gap-x-2 mobile:text-lg flex items-center justify-center gap-x-4 border-none bg-yellow-500 rounded-lg text-lg font-semibold"> Try again </button>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <>

                                                        {type === 'exam' &&
                                                        (
                                                            <div className='absolute w-[40rem] max-w-[95%] translate-x-[-50%] top-0'>
                                                                <p className={`${themeHolder.colortxt1} bg-gray-900 sticky top-0 p-2 text-3xl font-semibold mobile:text-2xl`}>{quizTitle}</p>
                                                                {questions.map((question, index) => (
                                                                    <div key={index} className='w-full border border-gray-300 rounded-lg overflow-hidden mb-5'>
                                                                        <p className={`${themeHolder.colorbg2} text-gray-300 font-bold h-[2rem] w-full flex items-center pl-4 `}>Question {index + 1}</p>


                                                                        <div className="bg-yellow-500 w-full pl-2">{explanations[index]}</div>


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
                                                                                                onChange={() => handleAnswerSelection(index, option)}
                                                                                                checked={answers[index] === option}
                                                                                                disabled={answeredQuestions[index]}
                                                                                            />

                                                                                            {option}

                                                                                            {answers[index] === option && (
                                                                                                <span>
                                                                                                    {answerCorrectness[index] ? (
                                                                                                        <span className="text-green-500"> Correct </span>
                                                                                                    ) : (
                                                                                                        <>
                                                                                                            <span className="text-red-500"> Incorrect </span>
                                                                                                        </>

                                                                                                    )}

                                                                                                </span>
                                                                                            )}

                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {questions.length === (indexofQuestion) && (
                                                                    <button onClick={handleFinishQuiz} className="h-[3rem] w-[6rem] mobile:h-[3rem] mobile:w-[6.5rem] mobile:gap-x-2 mobile:text-lg flex items-center justify-center gap-x-4 bg-yellow-500 border-none rounded-lg text-lg text-white font-semibold">
                                                                        Submit </button>
                                                                )}
                                                            </div>
                                                        )}

                                                        {type === 'quiz' &&
                                                        (
                                                            <div className='absolute w-[40rem] max-w-[95%] translate-x-[-50%] top-0'>
                                                            <p className={`${themeHolder.colortxt1} bg-gray-900 sticky top-0 p-2 text-3xl font-semibold mobile:text-2xl`}>{quizTitle}</p>
                                                            {questions.map((question, index) => (
                                                                <div key={index} className='w-full border border-gray-300 rounded-lg overflow-hidden mb-5'>
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
                                                                                            onChange={() => handleAnswerSelection(index, option)}
                                                                                            checked={answers[index] === option}
                                                                                            disabled={answeredQuestions[index]}
                                                                                        />
                                                                                        {option}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {questions.length === (indexofQuestion) && (
                                                                <button onClick={handleFinishQuiz} className="h-[3rem] w-[6rem] mobile:h-[3rem] mobile:w-[6.5rem] mobile:gap-x-2 mobile:text-lg flex items-center justify-center gap-x-4 bg-yellow-500 border-none rounded-lg text-lg text-white font-semibold">
                                                                    Submit </button>
                                                            )}
                                                        </div>
                                                        )}


                                                        </>

                                                    )
                                                }
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