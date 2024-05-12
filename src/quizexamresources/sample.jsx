

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { whatIsClickToggleQuizExamTemp } from "../feature/opentogglequizexamSlice";
import { Quiz1, Quiz2 } from './quiz';

export const Quiz = () => {

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

    if (whatIsClickToggleQuizExam === 'FoundationofEducationQuiz1'){
        questions = Quiz1; 
        quizTitle = 'Quiz1 in Foundation of Education';    
    }    
    else if (whatIsClickToggleQuizExam === 'PrinciplesofTeachingQuiz1'){
        questions = Quiz2; 
        quizTitle = 'Quiz1 in Principle of Teaching';     
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
           !startQuiz ? 
           (
            <>
             <p>{ quizTitle }</p>
              <button onClick={() => {setStartQuiz(true)}}>start quiz</button>
            </>   
           )
           :
           (
            Array.isArray(questions) && questions.length > 0 ?
                (
                    <div>
                        <div>
                            {showScore ? (
                                <div>
                                    <h2>Quiz Complete!</h2>
                                    <h3>Your Score: {score}</h3>
                                    <button onClick={() => {setShowScore(false); setIndexofQuestion(0); setAnswers([])}}>try again</button>
                                </div>
                            ) : (
                                <div>
                                    {questions.map((question, index) => (
                                        <div key={index}>
                                            <h3>{index + 1}. {question.question}</h3>
        
                                            {question.type === 'radio' && (
                                                <ul>             
                                                    {question.options.map((option, optionIndex) => (
                                                        <li key={optionIndex}>
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
                                    ))}
        
                                    {questions.length === (indexofQuestion + 1) && (
                                        <button onClick={handleFinishQuiz}>Submit</button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )
                :
            (
                ''
            )     
            
           )
        }

           
        </>
    );
}    