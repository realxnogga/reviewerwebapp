
import { themeHolderTemp } from "../feature/themeSlice";
import { useEffect, useState } from "react";
import { Button, Modal } from 'flowbite-react';
import { userdataTemp } from "../feature/data/userdataSlice";
import { InsertNoteThunk } from "../feature/noteSlice";
import { useSelector, useDispatch } from 'react-redux';
import { isNoteDataInsertedTemp, isNoteDataDeletedTemp } from "../feature/noteSlice";
import { ShowToast } from "./toaster";
import { ClearIsNoteDataInsertedState, ClearIsNoteDataDeletedState } from "../feature/noteSlice";
import { GetNoteThunk } from "../feature/noteSlice";
import { noteDataTemp } from "../feature/noteSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import { DeleteNoteThunk } from "../feature/noteSlice";
import { motion } from "framer-motion";
import { useRef } from "react";
import { NoteNavbarItem } from "./notenavbaritem";

export const Note = () => {

    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);

    const constraintsRef = useRef(null)

    const [openInsertNoteModal, setOpenInsertNoteModal] = useState(false);

    const userdata = useSelector(userdataTemp);
    if (Object.keys(userdata).length != 0) {
        var userID = userdata.ID;
        var username = userdata.username;
    }

    const [noteData, setNoteData] = useState({
        noteSubject: 'english',
        noteTitle: '',
        note: '',
    })

    const handleNoteDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setNoteData({ ...noteData, [name]: value });
    };

    const date = new Date();
    const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const fullDate = date.toDateString() + ' / ' + time;;

    const handleNoteSubmit = (e) => {
        e.preventDefault();

        const noteDataTemp = {
            userID: userID,
            noteuser: username,
            noteSubject: noteData.noteSubject,
            noteTitle: noteData.noteTitle,
            note: noteData.note,
            notedate: fullDate,
        }

        dispatch(InsertNoteThunk({ noteDataTemp }));
    }

    const isNoteDataInserted = useSelector(isNoteDataInsertedTemp);


    useEffect(() => {
        if (isNoteDataInserted === true) {
            ShowToast('Note has been added', 'success');

            setNoteData({ // clear input fields
                noteSubject: 'english',
                noteTitle: '',
                note: '',
            });

            setOpenInsertNoteModal(false); // to close the modal
            dispatch(ClearIsNoteDataInsertedState());

            dispatch(GetNoteThunk(username)); // passed username to get only the note with name column

        }
        if (isNoteDataInserted === false) {
            ShowToast('Note failed to added', 'error');
            dispatch(ClearIsNoteDataInsertedState());
        }

    }, [isNoteDataInserted]);

    const DeleteNoteFunc = (noteID) => {
        dispatch(DeleteNoteThunk(noteID)); //passed id to determine which note to delete
    }

    const isNoteDataDeleted = useSelector(isNoteDataDeletedTemp);

    console.log(isNoteDataDeleted);

    useEffect(() => {
        if (isNoteDataDeleted === true) {

            dispatch(GetNoteThunk(username));
            dispatch(ClearIsNoteDataDeletedState());
        }
        if (isNoteDataDeleted === false) {
            ShowToast('note failed deleted', 'error');
            dispatch(ClearIsNoteDataDeletedState());
        }

    }, [isNoteDataDeleted])

    //---------------------------------------------------------------------------


    const NoteColorFunc = (usernote) => {
        if (usernote === 'english') return 'bg-blue-300';
        if (usernote === 'filipino') return 'bg-violet-300';
        if (usernote === 'mathematics') return 'bg-green-300';
        if (usernote === 'social science') return 'bg-pink-300';
        if (usernote === 'humanities') return 'bg-yellow-300';
        if (usernote === 'communication skills') return 'bg-orange-300';
        if (usernote === 'ict') return 'bg-red-300';
    }

    const [whatIsClickedInNoteTab, setWhatIsClickedInNoteTab] = useState('all');
    const [subjectFilter, setSubjectFilter] = useState('all');

    const gotNoteData = useSelector(noteDataTemp);

    function GetNoteCount(str) {
        return str === 'all' ? Object.keys(gotNoteData).length : gotNoteData.filter(item => item.notesubject === str).length;
    }

    const filteredNoteData = gotNoteData.filter(item => {
        const allSubjectFilter = subjectFilter === 'all' || item.notesubject.toLowerCase() === subjectFilter.toLowerCase();

        return allSubjectFilter;
    });

    return (
        <div className="relative h-[90%] w-[69rem] max-w-[95%]">
           
           <section className={`${themeHolder.colorbg2} overflow-hidden rounded-md h-[9%] w-full flex items-center justify-between`}>
            <div className={` h-full w-full overflow-scroll noScrollbar`}>
                <ul className={`flex h-full text-sm text-gray-300 text-nowrap`}>

                    <NoteNavbarItem click={() => { setSubjectFilter('all'); setWhatIsClickedInNoteTab('all') }} whatclick={whatIsClickedInNoteTab} subject={'all'} count={GetNoteCount('all')} />

                    <NoteNavbarItem click={() => { setSubjectFilter('english'); setWhatIsClickedInNoteTab('english') }} whatclick={whatIsClickedInNoteTab} subject={'english'} count={GetNoteCount('english')} />

                    <NoteNavbarItem click={() => { setSubjectFilter('filipino'); setWhatIsClickedInNoteTab('filipino') }} whatclick={whatIsClickedInNoteTab} subject={'filipino'} count={GetNoteCount('filipino')} />

                    <NoteNavbarItem click={() => { setSubjectFilter('mathematics'); setWhatIsClickedInNoteTab('mathematics') }} whatclick={whatIsClickedInNoteTab} subject={'mathematics'} count={GetNoteCount('mathematics')} />

                    <NoteNavbarItem click={() => { setSubjectFilter('science'); setWhatIsClickedInNoteTab('science') }} whatclick={whatIsClickedInNoteTab} subject={'science'} count={GetNoteCount('science')} />

                    <NoteNavbarItem click={() => { setSubjectFilter('social science'); setWhatIsClickedInNoteTab('social science') }} whatclick={whatIsClickedInNoteTab} subject={'social science'} count={GetNoteCount('social science')} />

                    <NoteNavbarItem click={() => { setSubjectFilter('humanities'); setWhatIsClickedInNoteTab('humanities') }} whatclick={whatIsClickedInNoteTab} subject={'humanities'} count={GetNoteCount('humanities')} />

                    <NoteNavbarItem click={() => { setSubjectFilter('communication skills'); setWhatIsClickedInNoteTab('communication skills') }} whatclick={whatIsClickedInNoteTab} subject={'communication skills'} count={GetNoteCount('communication skills')} />

                    <NoteNavbarItem click={() => { setSubjectFilter('ict'); setWhatIsClickedInNoteTab('ict') }} whatclick={whatIsClickedInNoteTab} subject={'ict'} count={GetNoteCount('ict')} />
                </ul>
            </div>

            <button /*onClick={() => { setOpenInsertNoteModal(true) }}*/ className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[85%] w-[5rem] m-1 rounded-md text-white">
                add
            </button>
        </section>

            {
                filteredNoteData.length === 0 ?
                    (
                        <section className="h-[91%] w-full flex items-center justify-center flex-col gap-y-2.5 text-center">
                            <img className="h-[17rem] mobile:h-[13rem]"
                                src="../../asset/emptyImg/emptyImg.png" alt="" />
                            <h3 className={`text-gray-400 text-[3rem] font-bold mobile:text-[2rem] `}>
                                Nothing to show </h3>
                            <span className="text-gray-400">It's empty here, you can create a note by clicking the add button.</span>
                        </section>
                    )
                    :
                    (
                        <motion.section ref={constraintsRef} className="h-[91%] w-full pt-3 overflow-scroll noScrollbar flex flex-wrap content-start gap-4 mobile:justify-center">

                            {

                                filteredNoteData.map((item) => (

                                    <motion.div drag dragConstraints={constraintsRef} key={item.noteID} className={`${NoteColorFunc(item.notesubject)} relative h-[13rem] w-[13rem] overflow-scroll noScrollbar  rounded-lg p-2 mobile:h-[20rem] mobile:w-[20rem]`}>
                                        <div >
                                            <p className="text-gray-600 text-sm">{item.notedate}</p>
                                        </div>


                                        <FaRegTrashAlt onClick={() => DeleteNoteFunc(item.noteID)} className="absolute top-2 right-2 flex flex-col text-md gap-y-2 text-red-500 hover:bg-white cursor-pointer" />


                                        <div>
                                            <p className="text-gray-800 text-2xl font-semibold ">{item.notetitle}</p>

                                            <p className="text-gray-800 text-md">{item.actualnote}</p>
                                        </div>

                                    </motion.div>

                                ))


                            }
                        </motion.section>
                    )
            }

            {/* modal section */}
            <Modal size="md" dismissible show={openInsertNoteModal} onClose={() => setOpenInsertNoteModal(false)}>
                <form onSubmit={handleNoteSubmit} action="">
                    <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5`}>
                        <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Create Note</h3>

                        <div className="flex flex-col items-start gap-y-2">

                            <div className="w-full">
                                <label htmlFor="subject" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Choose a subject: <span className='text-red-500'>*</span></label>
                                <select
                                    onChange={handleNoteDataChangeFunc}
                                    value={noteData.noteSubject}
                                    id="noteSubject"
                                    name="noteSubject"
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
                                <label htmlFor="title" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>Enter note title: <span className='text-red-500'>*</span></label>
                                <input onChange={handleNoteDataChangeFunc} value={noteData.noteTitle} type="text" name="noteTitle" id="noteTitle" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md`} placeholder="Note Title:" />
                            </div>

                            <div className="w-full flex flex-col">
                                <textarea onChange={handleNoteDataChangeFunc} value={noteData.note}
                                    name="note" id="note" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} h-[8rem] w-full bg-gray-600 rounded-sm outline-none p-2 text-gray-300 text-md`} placeholder="Enter your thought..."></textarea>
                            </div>

                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <Button className='w-fit rounded-md' type='submit' gradientMonochrome="cyan">submit</Button>

                            <Button className='w-fit rounded-md' onClick={() => setOpenInsertNoteModal(false)} gradientMonochrome="success">close</Button>
                        </div>
                    </div>
                </form>
            </Modal>

        </div>
    )
}