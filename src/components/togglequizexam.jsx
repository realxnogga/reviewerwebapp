
import { useDispatch, useSelector } from "react-redux"
import { themeHolderTemp } from "../feature/themeSlice"
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { clearIsToggleQuizExamOpenState } from "../feature/opentogglequizexamSlice";
import { isToggleQuizExamOpenTemp } from "../feature/opentogglequizexamSlice";
import { useState } from "react";
import { whatIsClickToggleQuizExamState } from "../feature/opentogglequizexamSlice";
import { whatIsClickToggleQuizExamTemp } from "../feature/opentogglequizexamSlice";
export const ToggleQuizExam = () => {
    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);
    const isToggleQuizExamOpen = useSelector(isToggleQuizExamOpenTemp);
    const whatIsClickToggleQuizExam = useSelector(whatIsClickToggleQuizExamTemp);

    // const closeToggleQuizExam = () => {
    //     dispatch(clearIsToggleQuizExamOpenState());
    // };

    const [isShowDrop, setIsShowDrop] = useState(
        { 'FoundationofEducationDropdown': false, 'isArrowRotateFoundationofEducation': false },
        { 'PrinciplesofTeachingDropdown': false, 'isArrowRotatePrinciplesofTeaching': false },
        { 'ChildandAdolescentDevelopmentDropdown': false, 'isArrowRotateChildandAdolescentDevelopment': false },
        { 'FacilitatingLearningDropdown': false, 'isArrowRotateFacilitatingLearning': false },
        { 'AssessmentofStudentLearningDropdown': false, 'isArrowRotateAssessmentofStudentLearning': false },
        { 'DevelopmentallyAppropriatePracticesinTeachingDropdown': false, 'isArrowRotateDevelopmentallyAppropriatePracticesinTeaching': false },
        { 'CurriculumDevelopmentDropdown': false, 'isArrowRotateCurriculumDevelopment': false },
        { 'FieldStudyandPracticeDropdown': false, 'isArrowRotateFieldStudyandPractice': false },
    );


    const FoundationofEducationDropdownFunc = () => {
        setIsShowDrop(prevState => ({
            ...prevState,
            FoundationofEducationDropdown: !prevState.FoundationofEducationDropdown,
            isArrowRotateFoundationofEducation: !prevState.isArrowRotateFoundationofEducation
        }));

    }
    const PrinciplesofTeachingDropdownFunc = () => {
        setIsShowDrop(prevState => ({
            ...prevState,
            PrinciplesofTeachingDropdown: !prevState.PrinciplesofTeachingDropdown,
            isArrowRotatePrinciplesofTeaching: !prevState.isArrowRotatePrinciplesofTeaching
        }));
    }
    const ChildandAdolescentDevelopmentDropdownFunc = () => {
        setIsShowDrop(prevState => ({
            ...prevState,
            ChildandAdolescentDevelopmentDropdown: !prevState.ChildandAdolescentDevelopmentDropdown,
            isArrowRotateChildandAdolescentDevelopment: !prevState.isArrowRotateChildandAdolescentDevelopment
        }));
    }
    const FacilitatingLearningDropdownFunc = () => {
        setIsShowDrop(prevState => ({
            ...prevState,
            FacilitatingLearningDropdown: !prevState.FacilitatingLearningDropdown,
            isArrowRotateFacilitatingLearning: !prevState.isArrowRotateFacilitatingLearning
        }));
    }

    const AssessmentofStudentLearningDropdownFunc = () => {
        setIsShowDrop(prevState => ({
            ...prevState,
            AssessmentofStudentLearningDropdown: !prevState.AssessmentofStudentLearningDropdown,
            isArrowRotateAssessmentofStudentLearning: !prevState.isArrowRotateAssessmentofStudentLearning
        }));
    }
    const DevelopmentallyAppropriatePracticesinTeachingDropdownFunc = () => {
        setIsShowDrop(prevState => ({
            ...prevState,
            DevelopmentallyAppropriatePracticesinTeachingDropdown: !prevState.DevelopmentallyAppropriatePracticesinTeachingDropdown,
            isArrowRotateDevelopmentallyAppropriatePracticesinTeaching: !prevState.isArrowRotateDevelopmentallyAppropriatePracticesinTeaching
        }));
    }
    const CurriculumDevelopmentDropdownFunc = () => {
        setIsShowDrop(prevState => ({
            ...prevState,
            CurriculumDevelopmentDropdown: !prevState.CurriculumDevelopmentDropdown,
            isArrowRotateCurriculumDevelopment: !prevState.isArrowRotateCurriculumDevelopment
        }));
    }   
    const FieldStudyandPracticeDropdownFunc = () => {
        setIsShowDrop(prevState => ({
            ...prevState,
            FieldStudyandPracticeDropdown: !prevState.FieldStudyandPracticeDropdown,
            isArrowRotateFieldStudyandPractice: !prevState.isArrowRotateFieldStudyandPractice
        }));
    }



    return (
        <aside className={`${themeHolder.colorbg2} ${isToggleQuizExamOpen ? 'w-[20rem]' : ''} absolute top-0 right-0 bg-gray-800 h-full w-0 overflow-hidden z-10`}>

            <div className="py-3 px-4">
                <IoMdClose onClick={() => { dispatch(clearIsToggleQuizExamOpenState()); }} className={`${themeHolder.colortxt1} text-gray-300 text-2xl hover:bg-red-500`} />
            </div>

            <ul className={`${themeHolder.colortxt1} h-[90%] text-nowrap flex flex-col overflow-scroll noScrollbar`}>

                <li>
                    <li
                        onClick={FoundationofEducationDropdownFunc}
                        className={`hover:${themeHolder.colorbg1} cursor-pointer flex items-center justify-between p-3`}>

                        <span>Foundation of Education</span>
                        <IoMdArrowDropright className={`${themeHolder.colortxt1} ${isShowDrop.isArrowRotateFoundationofEducation ? 'rotate-90' : ''} text-2xl`} />

                    </li>
                    <ul className={`${isShowDrop.FoundationofEducationDropdown ? `h-fit ${themeHolder.colorbg3}` : 'h-0'} overflow-hidden cursor-pointer`}>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('FoundationofEducationExam1'))} className={`${whatIsClickToggleQuizExam === ''} py-2 px-8`}>Exam 1 in FE</li>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('FoundationofEducationQuiz1'))} className={`py-2 px-8`}>Quiz 1 in FE </li>
                    </ul>
                    {/* ------------------------------------------------------------------------ */}
                    <li
                        onClick={PrinciplesofTeachingDropdownFunc}
                        className={`hover:${themeHolder.colorbg1} cursor-pointer flex items-center justify-between p-3`}>

                        <span>Principles of Teaching</span>
                        <IoMdArrowDropright className={`${themeHolder.colortxt1} ${isShowDrop.isArrowRotatePrinciplesofTeaching ? 'rotate-90' : ''} text-2xl`} />

                    </li>
                    <ul className={`${isShowDrop.PrinciplesofTeachingDropdown ? `h-fit ${themeHolder.colorbg3}` : 'h-0'} overflow-hidden cursor-pointer`}>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('PrinciplesofTeachingExam1'))} className={` py-2 px-8`}>Exam 1 in PT </li>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('PrinciplesofTeachingQuiz1'))} className={` py-2 px-8`}>Quiz 1 in PT </li>
                    </ul>
                    {/* ------------------------------------------------------------------------ */}
                    <li
                        onClick={ChildandAdolescentDevelopmentDropdownFunc}
                        className={`hover:${themeHolder.colorbg1} cursor-pointer flex items-center justify-between p-3`}>

                        <span>Child and Adolescent Development</span>
                        <IoMdArrowDropright className={`${themeHolder.colortxt1} ${isShowDrop.isArrowRotateChildandAdolescentDevelopment ? 'rotate-90' : ''} text-2xl`} />

                    </li>
                    <ul className={`${isShowDrop.ChildandAdolescentDevelopmentDropdown ? `h-fit ${themeHolder.colorbg3}` : 'h-0'} overflow-hidden cursor-pointer`}>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('ChildandAdolescentDevelopmentExam1'))} className={`py-2 px-8`}>Exam 1 in CAD </li>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('ChildandAdolescentDevelopmentQuiz1'))} className={`py-2 px-8`}>Quiz 1 in CAD </li>
                    </ul>
                    {/* ------------------------------------------------------------------------ */}
                    <li
                        onClick={FacilitatingLearningDropdownFunc}
                        className={`hover:${themeHolder.colorbg1} cursor-pointer flex items-center justify-between p-3`}>

                        <span>Facilitating Learning</span>
                        <IoMdArrowDropright className={`${themeHolder.colortxt1} ${isShowDrop.isArrowRotateFacilitatingLearning ? 'rotate-90' : ''} text-2xl`} />

                    </li>
                    <ul className={`${isShowDrop.FacilitatingLearningDropdown ? `h-fit ${themeHolder.colorbg3}` : 'h-0'} overflow-hidden cursor-pointer`}>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('FacilitatingLearningExam1'))} className={`py-2 px-8`}>Exam 1 in FL </li>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('FacilitatingLearningQuiz1'))} className={`py-2 px-8`}>Quiz 1 in FL </li>
                    </ul>
                    {/* ------------------------------------------------------------------------ */}
                    <li
                        onClick={AssessmentofStudentLearningDropdownFunc}
                        className={`hover:${themeHolder.colorbg1} cursor-pointer flex items-center justify-between p-3`}>

                        <span>Assessment of Student Learning</span>
                        <IoMdArrowDropright className={`${themeHolder.colortxt1} ${isShowDrop.isArrowRotateAssessmentofStudentLearning ? 'rotate-90' : ''} text-2xl`} />

                    </li>
                    <ul className={`${isShowDrop.AssessmentofStudentLearningDropdown ? `h-fit ${themeHolder.colorbg3}` : 'h-0'} overflow-hidden cursor-pointer`}>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('AssessmentofStudentLearningExam1'))} className={`py-2 px-8`}>Exam 1 in ASL </li>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('AssessmentofStudentLearningQuiz1'))} className={`py-2 px-8`}>Quiz 1 in ASL </li>
                    </ul>
                    {/* ------------------------------------------------------------------------ */}
                    <li
                        onClick={DevelopmentallyAppropriatePracticesinTeachingDropdownFunc}
                        className={`hover:${themeHolder.colorbg1} cursor-pointer flex items-center justify-between p-3`}>

                        <span>DAPT</span>
                        <IoMdArrowDropright className={`${themeHolder.colortxt1} ${isShowDrop.isArrowRotateDevelopmentallyAppropriatePracticesinTeaching ? 'rotate-90' : ''} text-2xl`} />

                    </li>
                    <ul className={`${isShowDrop.DevelopmentallyAppropriatePracticesinTeachingDropdown ? `h-fit ${themeHolder.colorbg3}` : 'h-0'} overflow-hidden cursor-pointer`}>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('DevelopmentallyAppropriatePracticesinTeachingExam1'))} className={`py-2 px-8`}>Exam 1 in DAPT </li>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('DevelopmentallyAppropriatePracticesinTeachingQuiz1'))} className={`py-2 px-8`}>Quiz 1 in DAPT </li>
                    </ul>
                    {/* ------------------------------------------------------------------------ */}
                    <li
                        onClick={CurriculumDevelopmentDropdownFunc}
                        className={`hover:${themeHolder.colorbg1} cursor-pointer flex items-center justify-between p-3`}>

                        <span>Curriculum Development</span>
                        <IoMdArrowDropright className={`${themeHolder.colortxt1} ${isShowDrop.isArrowRotateCurriculumDevelopment ? 'rotate-90' : ''} text-2xl`} />

                    </li>
                    <ul className={`${isShowDrop.CurriculumDevelopmentDropdown ? `h-fit ${themeHolder.colorbg3}` : 'h-0'} overflow-hidden cursor-pointer`}>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('CurriculumDevelopmentExam1'))} className={`py-2 px-8`}>Exam 1 in CD</li>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('CurriculumDevelopmentQuiz1'))} className={`py-2 px-8`}>Quiz 1 in CD </li>
                    </ul>
                    {/* ------------------------------------------------------------------------ */}
                    <li
                        onClick={FieldStudyandPracticeDropdownFunc}
                        className={`hover:${themeHolder.colorbg1} cursor-pointer flex items-center justify-between p-3`}>

                        <span> Field Study and Practice</span>
                        <IoMdArrowDropright className={`${themeHolder.colortxt1} ${isShowDrop.isArrowRotateFieldStudyandPractice ? 'rotate-90' : ''} text-2xl`} />

                    </li>
                    <ul className={`${isShowDrop.FieldStudyandPracticeDropdown ? `h-fit ${themeHolder.colorbg3}` : 'h-0'} overflow-hidden cursor-pointer`}>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('FieldStudyandPracticeExam1'))} className={`py-2 px-8`}>Exam 1 in FSP</li>
                        <li onClick={() => dispatch(whatIsClickToggleQuizExamState('FieldStudyandPracticeQuiz1'))} className={`py-2 px-8`}>Quiz 1 in FSP </li>
                    </ul>


                </li>

            </ul>

        </aside>
    )
}