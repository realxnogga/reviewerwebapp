
import { useDispatch, useSelector } from 'react-redux';
import { isSideBarOpenTemp } from "../feature/opensidebarSlice";
import { isSidebarOpenState } from "../feature/opensidebarSlice";
import { themeHolderTemp } from "../feature/themeSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImMenu } from "react-icons/im";
import { TfiMenu } from "react-icons/tfi";
export const Hamburger = () => {

    const themeHolder = useSelector(themeHolderTemp);

    const dispatch = useDispatch();
    const isSideBarOpen = useSelector(isSideBarOpenTemp);

    const hideSidebarFunc = () => {
        dispatch(isSidebarOpenState());
    }

    var hideSidebarString = '';
    if (isSideBarOpen === true) {
        hideSidebarString = 'hidden';
    }
    if (isSideBarOpen === false) {
        hideSidebarString = '';
    }

    return (      
            <TfiMenu onClick={hideSidebarFunc} className={`${themeHolder.colortxt1} absolute top-4 left-4 text-2xl text-gray-300`} />     
    )
}