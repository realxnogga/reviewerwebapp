import { Hamburger } from "../components/hamburger";
import { useSelector } from 'react-redux';
import { themeHolderTemp } from "../feature/themeSlice";
import { quizDataTemp } from "../feature/quizSlice";
import { resourceCountTemp } from "../feature/insertresourcedataSlice";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from "react";

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

    console.log(dateNow);   

    const [dateValue, setDateValue] = useState(dateNow);
    const [filteredQuizData, setFilteredQuizData] = useState([]);

    const handleDateChangeFunc = (e) => {
        setDateValue(e.target.value);
    };

    useEffect(() => {
        const filteredData = quizData.filter(item => item.quizdatetaken === dateValue);
        setFilteredQuizData(filteredData);
    }, [dateValue, quizData])


    const quizScores = filteredQuizData.map(item => item.quizscore);
    const quizLabels = filteredQuizData.map(item => item.quizsubject);

    const data = {
        labels: quizLabels,
        datasets: [
            {
                label: 'Quiz Scores',
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
                text: `Quiz Scores Overview (${dateValue})`,
            },
        },
    };

    return (
        <div className={`${themeHolder.colorbg3} relative mt-[4rem] h-screen w-screen flex items-center justify-center`}>
            <Hamburger />

            <section className="relative h-[90%] w-[69rem] mt-5 max-w-[95%] overflow-scroll noScrollbar">
                <section className="w-full flex flex-wrap gap-y-5 mobile:justify-center justify-between">
                    <div className="border-2 border-green-600 h-[14rem] w-[22rem] rounded-2xl p-4">
                        <p className={`${themeHolder.colortxt1} text-[3rem] font-semibold `}>Over</p>
                        <span className="text-[5rem] font-extrabold text-yellow-500 leading-10">{resourceCount - 1}+</span>
                        <p className={`${themeHolder.colortxt1} text-[2rem] `}>Learning resources</p>
                    </div>
                    <div className="border-2 border-red-600 h-[14rem] w-[22rem] rounded-2xl p-4">
                        <p className={`${themeHolder.colortxt1} text-[3rem] font-semibold `}>Over</p>
                        <span className="text-[5rem] font-extrabold text-yellow-500 leading-10">7+</span>
                        <p className={`${themeHolder.colortxt1} text-[2rem] `}>Free Quiz Reviewer</p>
                    </div>
                    <div className="border-2 border-blue-600 h-[14rem] w-[22rem] rounded-2xl p-4">
                        <p className={`${themeHolder.colortxt1} text-[3rem] font-semibold `}>Over</p>
                        <span className="text-[5rem] font-extrabold text-yellow-500 leading-10">7+</span>
                        <p className={`${themeHolder.colortxt1} text-[2rem] `}>Free Exam Reviewer</p>
                    </div>
                </section>

                <section className="mt-20  flex flex-col gap-y-8 items-end">
                    <input className={`${themeHolder.colortxt1} bg-transparent rounded-md border border-gray-400`} value={dateValue} onChange={handleDateChangeFunc} type="date"/>


                    <div className="w-full h-[30rem] mobile:h-[15rem] flex items-center justify-center">
                        <Bar data={data} options={options} />
                    </div>
                </section>

            </section>
        </div>
    );
};
