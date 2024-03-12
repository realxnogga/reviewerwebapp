import Foot from "../components/footer";
import { FaFacebookF } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { SiCodewars } from "react-icons/si";
import { SiFrontendmentor } from "react-icons/si";
import { Tooltip } from 'flowbite-react';
import { Invite, Toaster } from "../components/flowbite_components";
import { Nav1 } from "../components/nav1";

const Home = () => {

    return (
        <div className="bg-cover bg-no-repeat bg-center bg-[url('https://scontent.fpag2-1.fna.fbcdn.net/v/t31.18172-8/25394837_1952642861725179_2019313069768530910_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFoi2sxh0U8f2jnQtrhDfEiZ1usYv-A2PNnW6xi_4DY8wn47TXKepL7fLS5e-X3iLZXGX7GMkDeK5vzLabdfV-v&_nc_ohc=xbdJtBH2ctYAX_hVhIN&_nc_ht=scontent.fpag2-1.fna&oh=00_AfBkYSi8oq2eXEX6x9mi4FDRGyHTBwOWB6OaHON6SkHJJw&oe=66129B39')]">

            <Nav1/>
            <main className="h-[calc(100vh-5rem)] w-screen flex flex-col gap-y-5 items-center justify-center">
                <h1 className="text-white text-[3rem] font-semibold">Lorem Dolor</h1>
                <p className="text-white">Lorem, ipsum dolor.</p>
                <div className="flex gap-x-[1.5rem]">
                    
                    <Tooltip content="Facebook">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-[50%] border border-white flex items-center justify-center hover:bg-white">
                            <FaFacebookF className="text-blue-600 h-[1.5rem] w-[1.5rem]" />
                        </div>
                    </Tooltip>

                    <Tooltip content="Youtube">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-[50%] border border-white flex items-center justify-center hover:bg-white">
                            <TbBrandYoutubeFilled className="text-red-600 h-[1.5rem] w-[1.5rem]" />
                        </div>
                    </Tooltip>

                    <Tooltip content="CodeWars">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-[50%] border border-white flex items-center justify-center hover:bg-white">
                            <SiCodewars className="text-orange-600 h-[1.2rem] w-[1.2rem]" />
                        </div>
                    </Tooltip>

                    <Tooltip content="Frotend Mentor">
                        <div className="h-[2.5rem] w-[2.5rem] rounded-[50%] border border-white flex items-center justify-center hover:bg-white">
                            <SiFrontendmentor className="text-blue-700 h-[1.5rem] w-[1.5rem]" />
                        </div>
                    </Tooltip>

                </div>

                <Toaster></Toaster>
                <Invite></Invite>
            </main>
            <Foot/>
        </div>


    );
}

export default Home;