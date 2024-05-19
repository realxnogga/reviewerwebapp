

import { FaMagnifyingGlass } from "react-icons/fa6";
import { Button } from 'flowbite-react';
import { useEffect, useState } from "react";
import { themeHolderTemp } from "../feature/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { CheckUserPerformanceExistThunk, isUserPerformanceExistTemp } from "../feature/quizSlice";
import { ClearIsUserPerformanceExist } from "../feature/quizSlice";
import { GetUserPerformanceThunk } from "../feature/quizSlice";
import { userPerformanceQuizDataTemp } from "../feature/quizSlice";
import { userPerformanceInfoTemp } from "../feature/quizSlice";
import { FiSearch } from "react-icons/fi";
import { IoMdRemove } from "react-icons/io";
import { Tooltip } from "flowbite-react";

export const UserPerformance = () => {

    const dispatch = useDispatch();

    const userPerformanceInfo = useSelector(userPerformanceInfoTemp);
    if (Object.keys(userPerformanceInfo).length != 0) {
        var userPerformanceInfoName = userPerformanceInfo[0].username;
        var userPerformanceInfoUserImage = userPerformanceInfo[0].userimage;
    }

    const themeHolder = useSelector(themeHolderTemp);
    const isUserPerformanceExist = useSelector(isUserPerformanceExistTemp);
    const userPerformanceQuizData = useSelector(userPerformanceQuizDataTemp);
    const [quizTakerSearch, setQuizTakerSearch] = useState('');

    //----------------------------------------------------------------
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateNow = `${year}-${month}-${day}`;

    const [dateValue, setDateValue] = useState(dateNow);
    const [typeValue, setTypeValue] = useState('all');
    const [rangeType, setRangeType] = useState('day'); // New state for range type
    const [filteredQuizData, setFilteredQuizData] = useState([]);

    //for exam
    const [numberOfTimesExamTaken, setNumberOfTimesExamTaken] = useState(0);
    const [highestScoreInExam, setHighestScoreInExam] = useState(0);
    const [LowestScoreInExam, setLowestScoreInExam] = useState(0);
    //for quiz
    const [numberOfTimesQuizTaken, setNumberOfTimesQuizTaken] = useState(0);
    const [highestScoreInQuiz, setHighestScoreInQuiz] = useState(0);
    const [LowestScoreInQuiz, setLowestScoreInQuiz] = useState(0);


    const handleSearchSubmitFunc = () => {
        dispatch(CheckUserPerformanceExistThunk(quizTakerSearch));
    }

    const handleSearchUserTakerFunc = (e) => {
        setQuizTakerSearch(e.target.value)
    }

    const handleRangeTypeChangeFunc = (e) => {
        setRangeType(e.target.value);
    };

    const handleClearSearchUserFunc = () => {
        setFilteredQuizData([]);
        dispatch(ClearIsUserPerformanceExist());
        setQuizTakerSearch('')
    }

    useEffect(() => {
        setFilteredQuizData([]);
        dispatch(ClearIsUserPerformanceExist());
    }, [quizTakerSearch])

    const stringToDisplay = quizTakerSearch === '' ? 'Search User' : 'No User Found'


    useEffect(() => {
        if (isUserPerformanceExist === true) {
            dispatch(GetUserPerformanceThunk(quizTakerSearch));
        }
    }, [isUserPerformanceExist])


    const handleDateChangeFunc = (e) => {
        setDateValue(e.target.value);
    };

    const handleTypeChangeFunc = (e) => {
        setTypeValue(e.target.value);
    };

    //
    useEffect(() => {
        const filterByDateRange = (data, rangeType, dateValue) => {
            const currentDate = new Date(dateValue);
            let startDate, endDate;

            if (rangeType === 'week') {
                const dayOfWeek = currentDate.getDay();
                const firstDayOfWeek = new Date(currentDate);
                firstDayOfWeek.setDate(currentDate.getDate() - (dayOfWeek - 1));
                startDate = new Date(firstDayOfWeek);
                endDate = new Date(firstDayOfWeek);
                endDate.setDate(firstDayOfWeek.getDate() + 6);
            } else if (rangeType === 'month') {
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            } else {
                startDate = currentDate;
                endDate = currentDate;
            }

            return data.filter(item => {
                const itemDate = new Date(item.quizdatetaken);
                return itemDate >= startDate && itemDate <= endDate && (typeValue === 'all' || item.quiztype === typeValue);
            });
        };

        const filteredData = filterByDateRange(userPerformanceQuizData, rangeType, dateValue);
        setFilteredQuizData(filteredData);
    }, [dateValue, typeValue, rangeType, userPerformanceQuizData]);


    useEffect(() => {

        const examObject = filteredQuizData.filter(item => item.quiztype === 'exam');
        const quizObject = filteredQuizData.filter(item => item.quiztype === 'quiz');

        if (examObject.length > 0) {
            setNumberOfTimesExamTaken(examObject.length);
            setHighestScoreInExam(Math.max(...examObject.map(obj => obj.quizscore)));
            setLowestScoreInExam(Math.min(...examObject.map(obj => obj.quizscore)));
        }
        else {
            setNumberOfTimesExamTaken(0);
            setHighestScoreInExam(0);
            setLowestScoreInExam(0);
        }
        if (quizObject.length > 0) {
            setNumberOfTimesQuizTaken(quizObject.length);
            setHighestScoreInQuiz(Math.max(...quizObject.map(obj => obj.quizscore)));
            setLowestScoreInQuiz(Math.min(...quizObject.map(obj => obj.quizscore)));
        }
        else {
            setNumberOfTimesQuizTaken(0);
            setHighestScoreInQuiz(0);
            setLowestScoreInQuiz(0);
        }

    }, [filteredQuizData])


    return (
        <section className={`${themeHolder.colorbg2} flex flex-col gap-y-2 h-fit p-5 rounded-lg w-full`}>


            <section className={`gap-y-3 mobile:justify-end flex items-end flex-wrap-reverse justify-between gap-x-8 h-fit rounded-lg w-full`}>
                {/* <div className="flex gap-x-3 mobile:gap-x-2 mobile:justify-between mobile:pt-10"> */}
                <div className={`${themeHolder.colortxt1}bg-red-500 tablet:w-full flex gap-x-2`}>
                    <div className="flex h-[2.5rem] bg-green-500 w-full ">
                        <div className={`${themeHolder.colorbg2} ${themeHolder.colortxt1} border border-gray-500 border-r-transparent h-[2.5rem] w-[2.5rem] flex items-center justify-center`}>
                            <FaMagnifyingGlass className="text-xl" />
                        </div>

                        <input value={quizTakerSearch} onChange={handleSearchUserTakerFunc} type="text" name="systemname" id="systemname" placeholder="search users here..." className={`${themeHolder.colorbg2} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none border-l-transparent focus:border-gray-500 focus:border-l-transparent focus:ring-0 p-2 text-gray-300 text-md `} />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <Tooltip style="light" content={'search'}>
                            <FiSearch onClick={handleSearchSubmitFunc} className="text-3xl p-1 border border-yellow-500 " />
                        </Tooltip>
                        <Tooltip style="light" content={'clear'} color="yellow">
                            <IoMdRemove onClick={handleClearSearchUserFunc} className="text-3xl p-1 border border-yellow-500 " />
                        </Tooltip>
                    </div>

                </div>


                <div className="flex flex-wrap mobile:gap-y-4 mobile:flex-col-reverse items-start justify-between gap-x-5 mobile:overflow-scroll noScrollbar">
                    <div className="flex items-end gap-x-5 mobile:gap-x-3">
                        <select
                            value={typeValue}
                            onChange={handleTypeChangeFunc}
                            className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-400 rounded-md outline-none p-2 text-gray-300 text-md mobile:p-1 mobile:pl-2`}>
                            <option value="all">All</option>
                            <option value="exam">Exam</option>
                            <option value="quiz">Quiz</option>
                        </select>

                        <select
                            value={rangeType}
                            onChange={handleRangeTypeChangeFunc}
                            className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-400 rounded-md outline-none p-2 text-gray-300 text-md mobile:p-1 mobile:pl-2`}>
                            <option value="day">This Day</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                        </select>

                        <div>
                            <input className={`${themeHolder.colorbg3} ${themeHolder.colortxt1} ${themeHolder.border} rounded-md outline-none mobile:p-1 mobile:pl-2`} value={dateValue} onChange={handleDateChangeFunc} type="date" />
                        </div>
                    </div>
                </div>
            </section>


            {
                isUserPerformanceExist === true ?
                    (
                        <>
                            <img className="h-[3rem] w-[3rem] mobile:h-[1.9rem] mobile:w-[1.9rem] rounded-[50%]" src={`../../asset/userprofile/${userPerformanceInfoUserImage}`} alt="" />
                            <p className={`${themeHolder.colortxt1} `}>{userPerformanceInfoName}</p>


                            <div className={`${themeHolder.colortxt1} flex flex-wrap gap-y-4 gap-x-5`}>

                                <div className={`mobile:flex-grow border border-gray-500 p-2 rounded-md`}>
                                    <p>Number of times you take an exam : {numberOfTimesExamTaken}</p>
                                    <p>Highest score in Exam : {highestScoreInExam}</p>
                                    <p>Lowest score in Exam : {LowestScoreInExam}</p>
                                </div>

                                <div className={`mobile:flex-grow border border-gray-500 p-2 rounded-md`}>
                                    <p>Number of times you take a quiz : {numberOfTimesQuizTaken}</p>
                                    <p>Highest score in quiz : {highestScoreInQuiz}</p>
                                    <p>Lowest score in quiz : {LowestScoreInQuiz}</p>
                                </div>
                            </div>
                        </>
                    )
                    :
                    (
                        <p className={`${themeHolder.colortxt1} text-2xl text-center pt-[4rem] `}> {stringToDisplay} </p>
                    )
            }

        </section >
    )
}