
import { Hamburger } from "../components/hamburger";
import { FileInput, Button, Modal } from 'flowbite-react';
import { InsertResourceDataThunk } from "../feature/insertresourcedataSlice";
import { GetResourceDataThunk } from "../feature/insertresourcedataSlice";
import { ShowToast } from "../components/toaster";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import { Tooltip } from "flowbite-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { ClearIsResourceDataInsertedState } from "../feature/insertresourcedataSlice";
import { isResourceDataInsertedTemp } from "../feature/insertresourcedataSlice";
import { resourceDataTemp } from "../feature/insertresourcedataSlice";
import { themeHolderTemp } from "../feature/themeSlice";
import { GetResourceCountThunk } from '../feature/insertresourcedataSlice';

export const LearningResources = () => {

    const dispatch = useDispatch();

    const themeHolder = useSelector(themeHolderTemp);

    const [openContributeModal, setOpenContributeModal] = useState(false);
    const [openViewResourceDataModal, setOpenViewResourceDataModal] = useState(false);

    const [resourceDataActualFile, setResourceDataActualFile] = useState(null);
    const [resourceData, setResourceData] = useState({
        subject: 'english',
        type: 'pdf',
        title: '',
    })

    const handleResourceDataActualFileChangeFunc = (e) => {
        setResourceDataActualFile(e.target.files[0]);
    }

    const handleResourceDataChangeFunc = (e) => {
        const { name, value } = e.target;
        setResourceData({ ...resourceData, [name]: value });
    };

    const handleResourceDataSubmitFunc = (e) => {
        e.preventDefault();

        const resourceDataTemp = {
            subject: resourceData.subject,
            type: resourceData.type,
            title: resourceData.title,
        }

        dispatch(InsertResourceDataThunk(
            { resourceDataTemp, resourceDataActualFile }
        ));
    }

    const isResourceDataInserted = useSelector(isResourceDataInsertedTemp);

    useEffect(() => {
        if (isResourceDataInserted === true) {
            // clear input field if the insert is successfull
            setResourceData({
                subject: 'english',
                type: 'pdf',
                title: '',
            })

            ShowToast('file inserted successfully', 'success');
            dispatch(GetResourceDataThunk());
            dispatch(ClearIsResourceDataInsertedState());
            setOpenContributeModal(false);
            dispatch(GetResourceCountThunk());
        }
        if (isResourceDataInserted === false) {
            ShowToast('failed to inserted file', 'error');
            dispatch(ClearIsResourceDataInsertedState());
        }
    }, [isResourceDataInserted]);

    const gotResourceData = useSelector(resourceDataTemp);


    const [whatActualFileIsCliked, setWhatActualFileIsCliked] = useState({
        actualFile: '',
        fileTitle: '',
    });
    const WhatResourceDataClicked = (actualfilearg, filetitlearg) => {
        setWhatActualFileIsCliked({
            actualFile: actualfilearg,
            fileTitle: filetitlearg,
        });
    }

    // for search functionality
    const [searchQuery, setSearchQuery] = useState('');
    const [subjectFilter, setSubjectFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');

    const filteredData = gotResourceData.filter(item => {
        const matchesSearchQuery =
            item.filetitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.filetype.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.filesubject.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesSubjectFilter = subjectFilter === 'all' || item.filesubject.toLowerCase() === subjectFilter.toLowerCase();
        const matchesTypeFilter = typeFilter === 'all' || item.filetype.toLowerCase() === typeFilter.toLowerCase();
        return matchesSearchQuery && matchesSubjectFilter && matchesTypeFilter;
    });

    const [openFilterModal, setOpenFilterModal] = useState(false);

    return (
        <>
            <div className={`${themeHolder.colorbg3} relative bg-gray-700 mt-[4rem] h-screen w-screen flex flex-col items-center justify-center gap-y-5 p-4`}>
                <Hamburger />

                <section className="h-fit w-full flex items-center justify-end gap-x-5 mobile:gap-x-2 mobile:justify-between mobile:pt-10">
                    <Tooltip placement="left" className="bg-yellow-500" arrow={false} content={'Filter'}>
                        <IoFilter onClick={() => { setOpenFilterModal(true); }} className={`${themeHolder.colortxt1} text-gray-300 text-2xl `} />
                    </Tooltip>

                    <div className="bg-green-400 flex h-[2.5rem] w-[15rem] ">
                        <div className="bg-white h-[2.5rem] w-[2.5rem] flex items-center justify-center">
                            <FaMagnifyingGlass className="text-black text-xl" />
                        </div>

                        <input type="text" value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)} placeholder="search resources here..." className="bg-white h-full w-full text-black border-none outline-none p-0 focus:border-transparent focus:outline-none focus:ring-0" />
                    </div>

                    <Button onClick={() => { setOpenContributeModal(true) }} gradientDuoTone="purpleToBlue">contribute</Button>
                </section>


                {
                    filteredData.length === 0 ?
                        (
                            <section className="h-[91%] w-full flex items-center justify-center flex-col gap-y-2.5 text-center">
                                <img className="h-[17rem] mobile:h-[13rem]"
                                    src="../../asset/emptyImg/emptyImg.png" alt="" />
                                <h3 className={`text-gray-400 text-[3rem] font-bold mobile:text-[2rem] `}>
                                    No result found </h3>
                                <span className="text-gray-400">It's empty here, you can search for another resources or adjust the filter.</span>
                            </section>
                        )
                        :
                        (
                            <section className="h-[90%] w-[75rem] max-w-[98%] flex flex-row flex-wrap content-start mobile:justify-center gap-4 overflow-scroll noScrollbar">
                                {
                                    filteredData.map((item) => (
                                        <div key={item.fileID} className=" h-fit w-fit overflow-hidden">

                                            <iframe
                                                scrolling="no" // to hide scrollbar
                                                className="h-[10rem] w-[14rem] mobile:h-[15rem] mobile:w-[25rem] "
                                                src={`../../asset/learningresources/${item.actualfile}`}
                                            ></iframe>
                                            <div className={`${themeHolder.colortxt1} text-gray-100 text-sm pt-2`}>
                                                <p><span>Title : </span>{item.filetitle}</p>
                                                <p><span>Type : </span>{item.filetype}</p>
                                                <p><span>Subject : </span>{item.filesubject}</p>


                                                {item.filetype === 'video' && (
                                                    <p onClick={() => { WhatResourceDataClicked(item.actualfile, item.filetitle); setOpenViewResourceDataModal(true); }} className="text-blue-500 italic underline cursor-pointer">Watch Video</p>
                                                )}
                                                {item.filetype === 'pdf' && (
                                                    <p onClick={() => { WhatResourceDataClicked(item.actualfile, item.filetitle); setOpenViewResourceDataModal(true); }} className="text-blue-500 italic underline cursor-pointer">Read PDF</p>
                                                )}
                                                {item.filetype === 'image' && (
                                                    <p onClick={() => { WhatResourceDataClicked(item.actualfile, item.filetitle); setOpenViewResourceDataModal(true); }} className="text-blue-500 italic underline cursor-pointer">See Photo</p>
                                                )}
                                            </div>

                                        </div>
                                    ))
                                }

                            </section>
                        )
                }

                {/* modal to view resource data in full screen */}
                <Modal size='null' show={openViewResourceDataModal} onClose={() => setOpenViewResourceDataModal(false)}>
                    <div className="bg-white h-screen w-full overflow-scroll noScrollbar">
                        <div className=" p-2 flex items-center justify-between">
                            < p>{whatActualFileIsCliked.fileTitle}</p>
                            <IoMdClose onClick={() => { setOpenViewResourceDataModal(false) }} className="hover:bg-red-500 hover:text-white" />
                        </div>
                        <iframe className="w-full h-full"
                            src={`../../asset/learningresources/${whatActualFileIsCliked.actualFile}`}

                        ></iframe>
                    </div>
                </Modal>

                {/* for filter */}
                <Modal size="md" dismissible show={openFilterModal} onClose={() => setOpenFilterModal(false)}>

                    <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5`}>
                        <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Filter Resources</h3>

                        <div className="flex flex-col items-start gap-y-2">

                            <div className="w-full">
                                <label htmlFor="subject" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>filter by subject:</label>

                                <select
                                    onChange={(e) => setSubjectFilter(e.target.value)}
                                    value={subjectFilter}
                                    id="subject"
                                    className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `}>
                                    <option value="all">All</option>
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
                                <label htmlFor="type" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>filter by type:</label>

                                <select
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    value={typeFilter}
                                    name="type"
                                    id="type"
                                    className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md`}>
                                    <option value="all">All</option>
                                    <option value="pdf">PDF</option>
                                    <option value="video">Video</option>
                                    <option value="image">Image</option>
                                </select>
                            </div>

                        </div>

                        <div className='flex flex-row gap-x-3'>
                            <Button className='w-fit rounded-md' onClick={() => setOpenFilterModal(false)} gradientMonochrome="success">close</Button>
                        </div>
                    </div>

                </Modal>


                {/* contribution modal */}
                <Modal size="md" dismissible show={openContributeModal} onClose={() => setOpenContributeModal(false)}>

                    <form onSubmit={handleResourceDataSubmitFunc} action="">
                        <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5`}>
                            <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Make a contribution</h3>

                            <div className="flex flex-col items-start gap-y-2">

                                <div className="w-full">
                                    <label htmlFor="subject" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>choose a subject:</label>

                                    <select onChange={handleResourceDataChangeFunc} value={resourceData.subject} name="subject" id="subject" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `}>
                                        <option value="english">English</option>
                                        <option value="filipino">Filipino</option>
                                        <option value="mathematics">Mathematics</option>
                                        <option value="social science">Social Science</option>
                                        <option value="humanities">Humanities</option>
                                        <option value="communication skills">Communication Skills</option>
                                        <option value="ict">ICT</option>
                                        <option value="english">English</option>
                                    </select>
                                </div>

                                <div className="w-full">
                                    <label htmlFor="type" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>choose a type:</label>

                                    <select onChange={handleResourceDataChangeFunc} value={resourceData.type} name="type" id="type" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `}>
                                        <option value="pdf">PDF</option>
                                        <option value="video">Video</option>
                                        <option value="image">Image</option>
                                    </select>
                                </div>

                                <div className="w-full">
                                    <label htmlFor="title" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>enter title:</label>
                                    <input onChange={handleResourceDataChangeFunc} value={resourceData.title} type="text" name="title" id="title" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md`} placeholder="Title:" />
                                </div>

                                <div className="w-full">
                                    <label htmlFor="actualfile" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>choose a file:</label>
                                    <FileInput onChange={handleResourceDataActualFileChangeFunc} id="actualfile" className='text-gray-300' />
                                </div>

                            </div>
                            <div className='flex flex-row gap-x-3'>
                                <Button className='w-fit rounded-md' type='submit' gradientMonochrome="cyan">submit</Button>

                                <Button className='w-fit rounded-md' onClick={() => setOpenContributeModal(false)} gradientMonochrome="success">close</Button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
}
