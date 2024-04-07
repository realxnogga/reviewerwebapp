

import Foot from "../components/footer";
import { Nav1 } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { Hamburger } from "../components/hamburger";

export const ReviewModule = () => {



    return (
        <>
             <Nav1 />
            <Sidebar />
          

            <div className="relative mt-[4rem] h-screen w-screen flex items-center justify-center">       
            <Hamburger />
              
              <p className="text-2xl font-semibold ">review module</p>
    
            </div>
        </>

    );
}
