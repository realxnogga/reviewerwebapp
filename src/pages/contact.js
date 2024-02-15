
import Navbar from "../components/navBar";
import { Button } from 'flowbite-react';
import Foot from "../components/footer";
import { useState, useEffect } from "react";

const Contact = () => {

  const [user, setUser] = useState([]);

  useEffect(() => {

    const accessKey = 'nxdO7pFC8xkgKQVRyeygzkaqy0ehj1QSvMTZbqr41k8';

    fetch(`https://api.unsplash.com/photos?per_page=50&client_id=${accessKey}`)
      .then((response) => { return response.json() })
      .then(data => setUser(data))
  }, [])

  return (
    <>
      <Navbar newStyle="bg-gray-900"></Navbar>
      <main className="flex justify-center">
        <div className="h-fit w-[40rem] p-5 flex flex-wrap gap-5 justify-between">
        {
          (() => {
            if (user.length > 0) {
                  const arr = [];
                  user.map((img) => {
                    arr.push(<img className="h-[11rem] w-[11rem]" src={img.urls.regular} alt={img.urls.alt_description} />); 
                  })
                  console.log(arr);
               return arr;
            }
          })()
        }
        </div>
       

      </main>
      <Foot newStyle="bg-gray-900 flex flex-col items-center"></Foot>
    </>

  );
}

export default Contact;