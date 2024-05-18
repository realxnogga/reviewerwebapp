
import { useDispatch, useSelector } from 'react-redux';
import { isSidebarOpenState } from "../feature/opensidebarSlice";
import { themeHolderTemp } from "../feature/themeSlice";
import { TfiMenu } from "react-icons/tfi";
export const Hamburger = () => {

    const themeHolder = useSelector(themeHolderTemp);
    const dispatch = useDispatch();

    return (      
            <TfiMenu onMouseOver={() => {dispatch(isSidebarOpenState());}} className={`${themeHolder.colortxt1} absolute top-4 left-4 text-2xl text-gray-300`} />     
    )
}