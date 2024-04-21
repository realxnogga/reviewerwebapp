
import { Button, Modal } from "flowbite-react";

import { ShowToast } from "../../components/toaster";
import React, { useEffect, useState } from "react";
import { themeHolderTemp } from "../../feature/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import { userdataTemp } from "../../feature/data/userdataSlice";
import { InsertFlashcardThunk } from "../../feature/flashcardSlice";
import { clearIsFlashcardDataInserted } from "../../feature/flashcardSlice";
import { isFlashcardDataInsertedTemp } from "../../feature/flashcardSlice";
import { GetFlashcardThunk } from "../../feature/flashcardSlice";
import { flashcardDataTemp } from "../../feature/flashcardSlice";
import { InsertFlashCardItemThunk } from "../../feature/flashcardSlice";
import { isFlashcardItemInsertedTemp } from "../../feature/flashcardSlice";
import { clearIsFlashcardItemInserted } from "../../feature/flashcardSlice";
import { GetFlashcardItemThunk } from "../../feature/flashcardSlice";
import { flashcardItemTemp } from "../../feature/flashcardSlice";

export const FlashCard = () => {

    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);
    const [openAddFlashcardModal, setOpenAddFlashcardModal] = useState(false);
    const [openAddFlashcardItemModal, setOpenAddFlashcardItemModal] = useState(false);


    const userdata = useSelector(userdataTemp);
    if (Object.keys(userdata).length != 0) {
        var username = userdata.username;
    }

    const [flashcardData, setFlashcardData] = useState({
        flashcardSubject: 'english',
        flashcardTitle: '',
    });

    const handleFlashcardDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setFlashcardData({ ...flashcardData, [name]: value });
    };

    const handleFlashcardSubmit = (e) => {
        e.preventDefault();

        const flashcardDataTemp = {
            flashcardUser: username,
            flashcardSubject: flashcardData.flashcardSubject,
            flashcardTitle: flashcardData.flashcardTitle,
        }

        dispatch(InsertFlashcardThunk({ flashcardDataTemp }))
    }
    const isFlashcardDataInserted = useSelector(isFlashcardDataInsertedTemp);

    useEffect(() => {
        if (isFlashcardDataInserted === true) {
            ShowToast('flashcard has been added', 'success');
            dispatch(GetFlashcardThunk(username));
            setOpenAddFlashcardModal(false);
            dispatch(clearIsFlashcardDataInserted());
        }
        if (isFlashcardDataInserted === false) {
            ShowToast('failed to insert flashcard', 'error');
            dispatch(clearIsFlashcardDataInserted());
        }

    }, [isFlashcardDataInserted])
    // -------------------------------------------------------------------

    const actualFlashcard = useSelector(flashcardDataTemp);

    const [flashcardItem, setFlashcardItem] = useState({
        flashcardItemFront: '',
        flashcardItemBack: '',
    })

    const [flashcardItemID, setFlashcardItemID] = useState(null);

    const handleFlashcardItemChangeFunc = (e) => {
        const { name, value } = e.target;
        setFlashcardItem({ ...flashcardItem, [name]: value });
    };

    const handleFlashcardItemSubmit = (e) => {
        e.preventDefault();

        const flashcardItemTemp = {
            flashcardItemID: flashcardItemID,
            flashcardItemFront: flashcardItem.flashcardItemFront,
            flashcardItemBack: flashcardItem.flashcardItemBack,
        }
        dispatch(InsertFlashCardItemThunk({ flashcardItemTemp }))
    }

    const isFlashcardItemInserted = useSelector(isFlashcardItemInsertedTemp);

    useEffect(() => {
        if (isFlashcardItemInserted === true) {
            setFlashcardItem({
                flashcardItemFront: '',
                flashcardItemBack: '',
            })
            dispatch(clearIsFlashcardItemInserted());
        }
        if (isFlashcardItemInserted === false) {

            ShowToast('failed to add flashcard item', 'error');
            dispatch(clearIsFlashcardItemInserted());
        }

    }, [isFlashcardItemInserted])
    // ---------------------------------------------------

    const actualFlashcardItem = useSelector(flashcardItemTemp);

    const [copiedFlashcard, setCopiedFlashcard] = useState([]);

    const handleStudyBtnFunc = (flashcardID) => {
        dispatch(GetFlashcardItemThunk(flashcardID));
        setShowContainer(true);
    }

    useEffect(() => {
        setCopiedFlashcard(prevArray => {
            const newArray = [...actualFlashcardItem];
            shuffleCoppiedObject(newArray);
            return newArray;
        });
    }, [actualFlashcardItem])


    // Function to shuffle flashcard
    const shuffleCoppiedObject = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    var [flashcardIndex, setFlashcardIndex] = useState(0);
    if (flashcardIndex === copiedFlashcard.length) {
        flashcardIndex = 0;
    }

    if (flashcardIndex < 0) {
        flashcardIndex = copiedFlashcard.length - 1;
    }

    const RemoveFlashcardFunc = () => {
        copiedFlashcard.splice(flashcardIndex, 1);
        setFlashcardIndex(flashcardIndex = 0);
    }


    const [showAnswer, setShowAnswer] = useState(false);
    const [backanswer, setBackAnswer] = useState('');

    useEffect(() => {
        if (showAnswer === true) {
            setBackAnswer(copiedFlashcard[flashcardIndex].flashcarditemback);
        }
        if (showAnswer === false) {
            setBackAnswer('');
        }
    }, [showAnswer])
    console.log(copiedFlashcard);

    // ----------------------------------------------
    const [showContainer, setShowContainer] = useState(false)

    const showContainerString = showContainer ? '' : 'hidden';



    return (
        <div className="relative h-[90%] w-[69rem] max-w-[95%]">
            <section className={`overflow-hidden rounded-md h-[9%] w-full justify-end flex items-center`}>

                <Button onClick={() => { setOpenAddFlashcardModal(true) }} gradientDuoTone="purpleToBlue" className=" m-1 rounded-md ">
                    add
                </Button>

                {/* add flashcard item modal */}

                <section className={`${themeHolder.colorbg3} ${showContainerString} ${themeHolder.colortxt1} absolute top-0 h-full w-full
                flex flex-col items-center justify-center gap-y-20 text-[2rem] font-semibold`}>


                    {/* this check if copied array is empty or not */}
                    {copiedFlashcard.length > 0 ?
                        <section className="h-[12rem] w-[90%] flex flex-col items-center justify-between">
                            <p>{copiedFlashcard[flashcardIndex].flashcarditemfront}</p>
                            <p>{backanswer}</p>
                        </section>
                        :
                        ''
                    }

                    <div className='flex flex-row gap-x-3'>
                        <Button onClick={() => { RemoveFlashcardFunc(); setShowAnswer(false) }} className='w-fit rounded-md' gradientMonochrome="cyan">remove</Button>

                        <Button onClick={() => { setShowAnswer(true) }} className='w-fit rounded-md' gradientMonochrome="cyan">show answer</ Button>

                        <Button onClick={() => { setFlashcardIndex(flashcardIndex - 1); setShowAnswer(false) }} className='w-fit rounded-md' gradientMonochrome="cyan">prev</Button>

                        <Button className='w-fit rounded-md' onClick={() => { setFlashcardIndex(flashcardIndex + 1); setShowAnswer(false) }} gradientMonochrome="success">next</Button>

                        <Button className='w-fit rounded-md' onClick={() => { setShowContainer(false) }} gradientMonochrome="success">close</Button>
                    </div>

                </section>


            </section>

            <section className="h-[91%] w-full pt-3 overflow-scroll noScrollbar flex flex-wrap content-start gap-4">
                {

                    actualFlashcard.map((item) => (
                        <div key={item.flashcardID} className={`${themeHolder.border} bg-yellow-100 h-[12rem] w-[16rem] rounded-lg p-2 flex flex-col justify-between cursor-pointer`}>
                            <p className="text-[2rem]">{item.flashcardtitle}</p>
                            <div className="flex w-full items-center justify-center gap-x-5">
                                <button onClick={() => { setOpenAddFlashcardItemModal(true); setFlashcardItemID(item.flashcardID) }} className="bg-green-500 p-2">Add Item</button>

                                <button onClick={() => { handleStudyBtnFunc(item.flashcardID) }} className="bg-violet-500 p-2">Study</button>
                            </div>


                        </div>
                    ))


                }
            </section>








            {/* add flashcard item modal */}
            <Modal size="md" dismissible show={openAddFlashcardItemModal} onClose={() => setOpenAddFlashcardItemModal(false)}>
                <form onSubmit={handleFlashcardItemSubmit} action="">
                    <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5`}>
                        <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Add Item</h3>

                        <div className="flex flex-col items-start gap-y-2">

                            <div className="w-full">
                                <label htmlFor="flashcardItemFront" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Enter Front:</label>

                                <textarea
                                    onChange={handleFlashcardItemChangeFunc}
                                    value={flashcardItem.flashcardItemFront}
                                    name="flashcardItemFront" id="flashcardItemFront" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} h-[6rem] w-full bg-gray-600 rounded-sm outline-none p-2 text-gray-300 text-md`} placeholder="Enter a question..."></textarea>
                            </div>

                            <div className="w-full">
                                <label htmlFor="flashcardItemBack" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Enter Back:</label>

                                <textarea
                                    onChange={handleFlashcardItemChangeFunc}
                                    value={flashcardItem.flashcardItemBack}
                                    name="flashcardItemBack" id="flashcardItemBack" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} h-[6rem] w-full bg-gray-600 rounded-sm outline-none p-2 text-gray-300 text-md`} placeholder="Enter a answer..."></textarea>
                            </div>



                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <Button className='w-fit rounded-md' type='submit' gradientMonochrome="cyan">add</Button>

                            <Button className='w-fit rounded-md' onClick={() => setOpenAddFlashcardItemModal(false)} gradientMonochrome="success">close</Button>
                        </div>
                    </div>
                </form>
            </Modal>

            {/* add flashcard modal */}
            <Modal size="md" dismissible show={openAddFlashcardModal} onClose={() => setOpenAddFlashcardModal(false)}>
                <form onSubmit={handleFlashcardSubmit} action="">
                    <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5`}>
                        <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Create Flashcard</h3>

                        <div className="flex flex-col items-start gap-y-2">

                            <div className="w-full">
                                <label htmlFor="flashcardSubject" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Choose a subject:</label>
                                <select
                                    onChange={handleFlashcardDataChangeFunc}
                                    value={flashcardData.flashcardSubject}
                                    id="flashcardSubject"
                                    name="flashcardSubject"
                                    className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `}>
                                    <option value="english">English</option>
                                    <option value="filipino">Filipino</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="social science">Social Science</option>
                                    <option value="humanities">Humanities</option>
                                    <option value="communication skills">Communication Skills</option>
                                    <option value="ict">ICT</option>
                                </select>
                            </div>

                            <div className="w-full">
                                <label htmlFor="flashcardTitle" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Enter flashcard title:</label>
                                <input onChange={handleFlashcardDataChangeFunc} value={flashcardData.flashcardTitle} type="text" name="flashcardTitle" id="flashcardTitle" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md`} placeholder="flashcard Title:" />
                            </div>

                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <Button className='w-fit rounded-md' type='submit' gradientMonochrome="cyan">submit</Button>

                            <Button className='w-fit rounded-md' onClick={() => setOpenAddFlashcardModal(false)} gradientMonochrome="success">close</Button>
                        </div>
                    </div>
                </form>
            </Modal>


        </div>
    );
};





