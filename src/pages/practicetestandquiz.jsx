

import { Hamburger } from "../components/hamburger";
import { useSelector } from 'react-redux';
import { themeHolderTemp } from "../feature/themeSlice";
import { ToggleQuizExam } from "../components/togglequizexam";
import { ToggleQuizExamIcon } from "../components/togglequizexamicon";
import { whatIsClickToggleQuizExamTemp } from "../feature/opentogglequizexamSlice";

export const PracticeTestAndQuiz = () => {

    const themeHolder = useSelector(themeHolderTemp);
    const whatIsClickToggleQuizExam = useSelector(whatIsClickToggleQuizExamTemp);

    var containerQuizExam = '';
    if (whatIsClickToggleQuizExam === 'FoundationofEducationExam1') containerQuizExam = 'FoundationofEducationExam1';
    else if (whatIsClickToggleQuizExam === 'FoundationofEducationQuiz1')  containerQuizExam = 'FoundationofEducationQuiz1';
    else if (whatIsClickToggleQuizExam === 'PrinciplesofTeachingExam1')  containerQuizExam = 'PrinciplesofTeachingExam1';
    else if (whatIsClickToggleQuizExam === 'PrinciplesofTeachingQuiz1')  containerQuizExam = 'PrinciplesofTeachingQuiz1';
    else if (whatIsClickToggleQuizExam === 'ChildandAdolescentDevelopmentExam1')  containerQuizExam = 'ChildandAdolescentDevelopmentExam1';
    else if (whatIsClickToggleQuizExam === 'ChildandAdolescentDevelopmentQuiz1')  containerQuizExam = 'ChildandAdolescentDevelopmentQuiz1';
    else if (whatIsClickToggleQuizExam === 'FacilitatingLearningExam1')  containerQuizExam = 'FacilitatingLearningExam1';
    else if (whatIsClickToggleQuizExam === 'FacilitatingLearningQuiz1')  containerQuizExam = 'FacilitatingLearningQuiz1';
    else if (whatIsClickToggleQuizExam === 'AssessmentofStudentLearningExam1')  containerQuizExam = 'AssessmentofStudentLearningExam1';
    else if (whatIsClickToggleQuizExam === 'AssessmentofStudentLearningQuiz1')  containerQuizExam = 'AssessmentofStudentLearningQuiz1';
    else if (whatIsClickToggleQuizExam === 'DevelopmentallyAppropriatePracticesinTeachingExam1')  containerQuizExam = 'DevelopmentallyAppropriatePracticesinTeachingExam1';
    else if (whatIsClickToggleQuizExam === 'DevelopmentallyAppropriatePracticesinTeachingQuiz1')  containerQuizExam = 'DevelopmentallyAppropriatePracticesinTeachingQuiz1';
    else if (whatIsClickToggleQuizExam === 'CurriculumDevelopmentExam1')  containerQuizExam = 'CurriculumDevelopmentExam1';
    else if (whatIsClickToggleQuizExam === 'CurriculumDevelopmentQuiz1')  containerQuizExam = 'CurriculumDevelopmentQuiz1';
    else if (whatIsClickToggleQuizExam === 'FieldStudyandPracticeExam1')  containerQuizExam = 'FieldStudyandPracticeExam1';
    else if (whatIsClickToggleQuizExam === 'FieldStudyandPracticeQuiz1')  containerQuizExam = 'FieldStudyandPracticeQuiz1';


    return (
        <>
            <div className={`${themeHolder.colorbg3} relative bg-gray-700 mt-[4rem] py-4 h-screen w-screen flex items-center justify-center`}>
                <Hamburger />
                <ToggleQuizExam />
                <ToggleQuizExamIcon />

                <section className="bg-green-500 h-[90%] w-[69rem] max-w-[95%] flex items-center justify-center mobile:justify-center gap-4 overflow-scroll noScrollbar">
                 
                 {containerQuizExam}
                  
                </section>
                

            </div>
        </>

    );
}
