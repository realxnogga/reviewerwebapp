
import { Hamburger } from "../components/hamburger";
import { useSelector} from 'react-redux';
import { themeHolderTemp } from "../feature/themeSlice";

export const DashBoard = () => {

    const themeHolder = useSelector(themeHolderTemp);


    return (
        <>        
            <div className={`${themeHolder.colorbg3} relative mt-[4rem] h-screen w-screen flex items-center justify-center`}>       
             <Hamburger />
              
              <p className="text-2xl font-semibold ">dashboard</p>
    
            </div>
        </>

    );
}
