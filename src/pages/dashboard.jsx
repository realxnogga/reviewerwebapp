

import { Hamburger } from "../components/hamburger";
import { useSelector } from 'react-redux';
import { themeHolderTemp } from "../feature/themeSlice";
import { quizDataTemp } from "../feature/quizSlice";
import { resourceCountTemp } from "../feature/insertresourcedataSlice";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";
import { UserPerformance } from "../components/userperformance";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const DashBoard = () => {
    const themeHolder = useSelector(themeHolderTemp);
    const resourceCount = useSelector(resourceCountTemp);
    const quizData = useSelector(quizDataTemp);

    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateNow = `${year}-${month}-${day}`;

    const [dateValue, setDateValue] = useState(dateNow);
    const [typeValue, setTypeValue] = useState('all');
    const [rangeType, setRangeType] = useState('day'); // New state for range type
    const [filteredQuizData, setFilteredQuizData] = useState([]);

    // For exam
    const [numberOfTimesExamTaken, setNumberOfTimesExamTaken] = useState(0);
    const [highestScoreInExam, setHighestScoreInExam] = useState(0);
    const [LowestScoreInExam, setLowestScoreInExam] = useState(0);
    // For quiz
    const [numberOfTimesQuizTaken, setNumberOfTimesQuizTaken] = useState(0);
    const [highestScoreInQuiz, setHighestScoreInQuiz] = useState(0);
    const [LowestScoreInQuiz, setLowestScoreInQuiz] = useState(0);

    const handleDateChangeFunc = (e) => {
        setDateValue(e.target.value);
    };

    const handleTypeChangeFunc = (e) => {
        setTypeValue(e.target.value);
    };

    const handleRangeTypeChangeFunc = (e) => {
        setRangeType(e.target.value);
    };

    useEffect(() => {
        const filterByDateRange = (data, rangeType, dateValue) => {
            const currentDate = new Date(dateValue);
            let startDate, endDate;

            if (rangeType === 'week') {
                const dayOfWeek = currentDate.getDay();
                const firstDayOfWeek = new Date(currentDate);
                firstDayOfWeek.setDate(currentDate.getDate() - (dayOfWeek-1));
                startDate = new Date(firstDayOfWeek);
                endDate = new Date(firstDayOfWeek);
                endDate.setDate(firstDayOfWeek.getDate() + 6);


            } else if (rangeType === 'month') {
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);  
                console.log("Start Date:", startDate);
                console.log("End Date:", endDate);    
            }
            else {
                startDate = currentDate;
                endDate = currentDate;
            }

            return data.filter(item => {
                const itemDate = new Date(item.quizdatetaken);
                return itemDate >= startDate && itemDate <= endDate && (typeValue === 'all' || item.quiztype === typeValue);
            });
        };

        const filteredData = filterByDateRange(quizData, rangeType, dateValue);
        setFilteredQuizData(filteredData);
    }, [dateValue, typeValue, rangeType, quizData]);

    useEffect(() => {
        const examObject = filteredQuizData.filter(item => item.quiztype === 'exam');
        const quizObject = filteredQuizData.filter(item => item.quiztype === 'quiz');

        if (examObject.length > 0) {
            setNumberOfTimesExamTaken(examObject.length);
            setHighestScoreInExam(Math.max(...examObject.map(obj => obj.quizscore)));
            setLowestScoreInExam(Math.min(...examObject.map(obj => obj.quizscore)));
        } else {
            setNumberOfTimesExamTaken(0);
            setHighestScoreInExam(0);
            setLowestScoreInExam(0);
        }
        if (quizObject.length > 0) {
            setNumberOfTimesQuizTaken(quizObject.length);
            setHighestScoreInQuiz(Math.max(...quizObject.map(obj => obj.quizscore)));
            setLowestScoreInQuiz(Math.min(...quizObject.map(obj => obj.quizscore)));
        } else {
            setNumberOfTimesQuizTaken(0);
            setHighestScoreInQuiz(0);
            setLowestScoreInQuiz(0);
        }
    }, [filteredQuizData]);

    const quizScores = filteredQuizData.map(item => item.quizscore);
    const quizLabels = filteredQuizData.map(item => item.quizsubject);

    const data = {
        labels: quizLabels,
        datasets: [
            {
                label: 'Quiz/Exam Scores',
                data: quizScores,
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Quiz/Exam Scores Overview (${dateValue} - ${rangeType})`,
            },
        },
    };

    return (
        <div className={`${themeHolder.colorbg3} relative mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <Hamburger />

            <section className="relative h-[90%] w-[69rem] mt-5 max-w-[95%] overflow-scroll noScrollbar">
                <section className="w-full flex flex-wrap gap-y-5 mobile:justify-center justify-between">
                    <div className="border-2 border-green-600 h-[14rem] w-[22rem] rounded-2xl p-4">
                        <p className={`${themeHolder.colortxt1} text-[3rem] font-semibold text-green-800`}>Over</p>
                        <span className="text-[5rem] font-extrabold text-yellow-500 leading-10">{resourceCount}+</span>
                        <p className={`${themeHolder.colortxt1} text-[2rem] `}>Learning resources</p>
                    </div>
                    <div className="border-2 border-red-600 h-[14rem] w-[22rem] rounded-2xl p-4">
                        <p className={`${themeHolder.colortxt1} text-[3rem] font-semibold `}>Over</p>
                        <span className="text-[5rem] font-extrabold text-yellow-500 leading-10">8+</span>
                        <p className={`${themeHolder.colortxt1} text-[2rem] `}>Free Quiz Reviewer</p>
                    </div>
                    <div className="border-2 border-blue-600 h-[14rem] w-[22rem] rounded-2xl p-4">
                        <p className={`${themeHolder.colortxt1} text-[3rem] font-semibold `}>Over</p>
                        <span className="text-[5rem] font-extrabold text-yellow-500 leading-10">8+</span>
                        <p className={`${themeHolder.colortxt1} text-[2rem] `}>Free Exam Reviewer</p>
                    </div>
                </section>

                <section className="mt-20 mobile:mt-6 flex flex-col gap-y-8 mobile:gap-y-4 items-end">
                    <div className="w-full h-[30rem] mobile:h-[10rem] flex items-center justify-center">
                        <Bar data={data} options={options} />
                    </div>

                    <div className={`${themeHolder.colorbg2} mobile:justify-end bg-red-500 flex items-end gap-x-8 flex-wrap-reverse justify-between gap-y-3 h-fit p-5 rounded-lg w-full`}>
                        <div className={`${themeHolder.colortxt1} flex flex-wrap gap-y-4 gap-x-5`}>
                            <div className={`flex-grow mobile:flex-grow border border-gray-500 p-2 rounded-md`}>
                                <p>Number of times you take an exam : {numberOfTimesExamTaken}</p>
                                <p>Highest score in Exam : {highestScoreInExam}</p>
                                <p>Lowest score in Exam : {LowestScoreInExam}</p>
                            </div>
                            <div className={`flex-grow mobile:flex-grow border border-gray-500 p-2 rounded-md`}>
                                <p>Number of times you take a quiz : {numberOfTimesQuizTaken}</p>
                                <p>Highest score in quiz : {highestScoreInQuiz}</p>
                                <p>Lowest score in quiz : {LowestScoreInQuiz}</p>
                            </div>
                        </div>

                        <div className="flex items-end gap-x-5 mobile:gap-x-3 mobile:overflow-scroll noScrollbar">
                            <select
                                value={typeValue}
                                onChange={handleTypeChangeFunc}
                                className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-400 rounded-md outline-none p-2 text-gray-300 text-md mobile:p-1 mobile:pl-2 `}>
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

                    <UserPerformance />
                </section>
            </section>
        </div>
    );
};
