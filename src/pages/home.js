import Foot from "../components/footer";
import Navbar from "../components/navBar";
import { FaFacebookF } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { SiCodewars } from "react-icons/si";
import { SiFrontendmentor } from "react-icons/si";

import { Tooltip } from 'flowbite-react';
import { Invite, Toaster } from "../components/flowbite_components";


const Home = () => {

    return (
        <div className="relative h-screen w-screen bg-cover bg-no-repeat bg-center bg-[url('https://img.freepik.com/fotos-premium/noite-estrelada-no-lago_68067-618.jpg')]">

            <Navbar></Navbar>
            <main className="h-[calc(100vh-5rem)] w-screen flex flex-col gap-y-5 items-center justify-center">
                <h1 className="text-white text-[3rem] font-semibold">Lorem Dolor</h1>
                <p className="text-white">Lorem, ipsum dolor.</p>
                <div className="flex gap-x-[1.5rem]">

                    <Tooltip content="Facebook">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-[50%] border-2 border-white flex items-center justify-center hover:bg-white">
                            <FaFacebookF className="text-blue-600 h-[1.5rem] w-[1.5rem]" />
                        </div>
                    </Tooltip>

                    <Tooltip content="Youtube">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-[50%] border-2 border-white flex items-center justify-center hover:bg-white">
                            <TbBrandYoutubeFilled className="text-red-600 h-[1.5rem] w-[1.5rem]" />
                        </div>
                    </Tooltip>

                    <Tooltip content="CodeWars">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-[50%] border-2 border-white flex items-center justify-center hover:bg-white">
                            <SiCodewars className="text-orange-600 h-[1.2rem] w-[1.2rem]" />
                        </div>
                    </Tooltip>

                    <Tooltip content="Frotend Mentor">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-[50%] border-2 border-white flex items-center justify-center hover:bg-white">
                            <SiFrontendmentor className="text-blue-700 h-[1.5rem] w-[1.5rem]" />
                        </div>
                    </Tooltip>

                </div>

                <Toaster></Toaster>
                <Invite></Invite>


            </main>
            <Foot></Foot>
        </div>


    );
}

export default Home;