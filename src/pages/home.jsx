import Foot from "../components/footer";
import { Nav1 } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { Hamburger } from "../components/hamburger";

export const Home = () => {



    return (
        <>
            <Nav1 />
            <Sidebar />
          

            <div className="relative mt-[4rem] h-screen w-screen bg-cover bg-no-repeat bg-center bg-[url('https://scontent.fpag2-1.fna.fbcdn.net/v/t31.18172-8/25394837_1952642861725179_2019313069768530910_o.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFoi2sxh0U8f2jnQtrhDfEiZ1usYv-A2PNnW6xi_4DY8wn47TXKepL7fLS5e-X3iLZXGX7GMkDeK5vzLabdfV-v&_nc_ohc=xbdJtBH2ctYAX_hVhIN&_nc_ht=scontent.fpag2-1.fna&oh=00_AfBkYSi8oq2eXEX6x9mi4FDRGyHTBwOWB6OaHON6SkHJJw&oe=66129B39')]">

            
            <Hamburger />
    
            </div>
        </>

    );
}
