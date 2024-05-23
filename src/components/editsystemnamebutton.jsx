
import { IoSettingsOutline } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { themeHolderTemp } from "../feature/themeSlice";
import { useSelector } from "react-redux";
import { EditSystemSettingNameThunk } from "../feature/sytemsettingSlice";
import { useDispatch } from "react-redux";
import { userdataTemp } from '../feature/data/userdataSlice';
import { isSystemNameUpdatedTemp } from "../feature/sytemsettingSlice";
import { clearIsSystemNameUpdatedState } from "../feature/sytemsettingSlice";
import { ShowToast } from "./toaster";
import { GetSystemSettingNameThunk } from "../feature/sytemsettingSlice";

export const EditSystemNameButton = () => {

    const dispatch = useDispatch();
    const themeHolder = useSelector(themeHolderTemp);

    const userdata = useSelector(userdataTemp);
    if (Object.keys(userdata).length != 0) {
        var name = userdata.username;
    }

    const [openEditSystemSettingModal, setOpenEditSystemSettingModal] = useState(false);

    const [systemSettingInputValue, setSystemSettingInputValue] = useState('');
    
    const handleSystemSettingSubmitFunc = () => {
        const systemSettingDataTemp = {
            systemsettinguser: name,
            systemsettingname: systemSettingInputValue,
        }
        dispatch(EditSystemSettingNameThunk({ systemSettingDataTemp })) 
    }

    const isSystemNameUpdated = useSelector(isSystemNameUpdatedTemp);
    useEffect(() => {
        if (isSystemNameUpdated === true) {
            setOpenEditSystemSettingModal(false);
            dispatch(GetSystemSettingNameThunk(name)); 
            dispatch(clearIsSystemNameUpdatedState());
        }
        if (isSystemNameUpdated === false) {
            setSystemSettingInputValue('');
            ShowToast('failed to update system name', 'error');
            dispatch(clearIsSystemNameUpdatedState());
        }
    }, [isSystemNameUpdated])


    return (
        <>
            <p onClick={() => {setOpenEditSystemSettingModal(true)}} className='hover:text-yellow-500 cursor-pointer flex items-center gap-x-2'>
                <IoSettingsOutline className='text-xl' />
                System Setting
            </p>


            {/* system setting modal */}
            <Modal size="md" dismissible show={openEditSystemSettingModal} onClose={() => setOpenEditSystemSettingModal(false)}>
                <div className={`${themeHolder.colorbg3} space-y-8 bg-gray-700 rounded-lg p-5 `}>
                    <h3 className={`${themeHolder.colortxt1} text-xl font-medium text-gray-300 dark:text-white`}>Edit System Setting</h3>

                    <div className="flex flex-col items-start gap-y-8">
                        <div>
                            <label htmlFor="systemname" className={`${themeHolder.colortxt1} text-lg text-gray-300`}>enter a new system name:</label>
                            <input onChange={(e) => {setSystemSettingInputValue(e.target.value)}} value={systemSettingInputValue} type="text" name="systemname" id="systemname" className={`${themeHolder.colorbg3} ${themeHolder.border} ${themeHolder.colortxt1} bg-gray-600 rounded-sm w-full outline-none p-2 text-gray-300 text-md `} />
                        </div>
                    </div>
                    <div className='flex flex-row gap-x-3'>
                        <Button onClick={handleSystemSettingSubmitFunc} className='w-fit rounded-md' gradientMonochrome="cyan">submit</Button>

                        <Button className='w-fit rounded-md' onClick={() => setOpenEditSystemSettingModal(false)} gradientMonochrome="success">close</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

