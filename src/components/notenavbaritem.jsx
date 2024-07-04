
import { useSelector } from "react-redux";
import { themeHolderTemp } from "../feature/themeSlice";

export const NoteNavbarItem = ({ click, whatclick, subject, count }) => {

    const themeHolder = useSelector(themeHolderTemp);

    return (
        <li onClick={click}
            className={`${themeHolder.colortxt1} ${whatclick === subject ? 'border-b-4 border-yellow-500' : ''} relative h-full w-fit px-5 hover:border-b-4 border-yellow-500 cursor-pointer flex items-center justify-center`}>

            {subject}

            <div className={`${count < 1 ? 'hidden' : ''} absolute bg-gray-500 h-[1.1rem] w-[1.1rem] top-0 right-0 rounded-[50%] flex items-center justify-center `}>
                <p className="text-white">{count}</p>
            </div>
        </li>
    )
}


