import Joker from "../components/joker";
import Navbar from "../components/navBar";
import Foot from "../components/footer";
import { FaHtml5 } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";

import { Progress } from 'flowbite-react';

const About = () => {
    return (
        <div className="bg-gray-700 h-full w-full">
            <Navbar newStyle="sticky"></Navbar>
            <main className="p-[5rem] tablet:p-10 mobile:p-5">

                <Joker></Joker>

                <section>
                    <h1 className="text-white font-bold text-[3.5rem]">Skills</h1>

                    <div className="h-full w-full flex flex-wrap justify-center gap-10 [&>div]:h-[14rem] [&>div]:w-[22rem] ">
                        <div className="bg-gray-800 p-6 flex flex-col items-center justify-between">
                            <FaHtml5 className="text-orange-600 h-[7rem] w-[7rem]" />
                            <h2 className="text-white text-2xl font-bold">HTML</h2>                       
                           
                           <div className="w-full">
                           <Progress size="md" progress={80} />   
                           </div>
                           
                        </div>

                        <div className="bg-gray-800 p-6 flex flex-col items-center justify-between">
                            <SiTailwindcss className="text-blue-400 h-[7rem] w-[7rem]" />
                            <h2 className="text-white text-2xl font-bold">Tailwind</h2>

                            <div className="w-full">
                           <Progress size="md" progress={90} />   
                           </div>

                        </div>

                        <div className="bg-gray-800 p-6 flex flex-col items-center justify-between">
                            <IoLogoJavascript className="text-yellow-400 h-[7rem] w-[7rem]" />
                            <h2 className="text-white text-2xl font-bold">Javascrcipt</h2>
                          
                            <div className="w-full">
                           <Progress size="md" progress={50} />   
                           </div>

                        </div>

                    </div>
                </section>

            </main>
            <Foot newStyle={'bg-gray-800'}></Foot>
        </div>
    );
}

export default About;