
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = ({newStyle}) => {

    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
    const [temp, setTemp] = useState('');
  
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollPos = window.scrollY;

        prevScrollPos > currentScrollPos ? setTemp('top-0') : setTemp('top-[-5rem]');

        setPrevScrollPos(currentScrollPos);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [prevScrollPos]);

    return (
        <>
            <header  className={`${newStyle} ${temp} sticky transition-[1s] h-[5rem] w-screen flex items-center justify-between px-[5rem] tablet:px-10 mobile:px-5`}>
                <div>
                    <img className="h-[3rem] w-[3rem]" src={`${require('../assets/icon/logo192.png')}`} alt="" />
                </div>
                <nav>
                    <ul className="flex gap-x-10 text-white font-semibold text-xl">
                        <li className="hover:text-gray-400"><NavLink className={({isActive}) => isActive ? 'border-b-[.2rem] border-white pb-1' : ''} to='/'>Home</NavLink></li>
                        <li className="hover:text-gray-400"><NavLink className={({isActive}) => isActive ? 'border-b-[.2rem] border-white pb-1' : ''} to='/about'>About</NavLink></li>
                        <li className="hover:text-gray-400"><NavLink className={({isActive}) => isActive ? 'border-b-[.2rem] border-white pb-1' : ''} to='/contact'>Contact</NavLink></li>
                    </ul>
                </nav>
            </header>
        </>

    );
}

export default Navbar;
