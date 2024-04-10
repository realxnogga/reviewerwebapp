
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { isSideBarOpenTemp } from "../feature/opensidebar/opensidebarSlice";
import { isSidebarOpenState } from "../feature/opensidebar/opensidebarSlice";

export const Hamburger = () => {

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
            <GiHamburgerMenu onClick={hideSidebarFunc} className="absolute top-4 left-4 text-2xl text-gray-300 " />     
    )
}