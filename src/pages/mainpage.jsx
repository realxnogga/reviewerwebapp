import Foot from "../components/footer";
import { Nav1 } from "../components/navbar";
import { Sidebar } from "../components/sidebar";
import { DashBoard } from "./dashboard";
import { ReviewModule } from "./reviewmodule";
import { PracticeTestAndQuiz } from "./practicetestandquiz";
import { LearningResources } from "./learningresources";

import { whatIsClickedTemp } from "../feature/opensidebarSlice";
import { useSelector } from 'react-redux';

export const MainPage = () => {

    const whatIsClicked = useSelector(whatIsClickedTemp);

    var container = '';
    if (whatIsClicked == 'dashboard') container = <DashBoard />;
    if (whatIsClicked == 'reviewmodule') container = <ReviewModule />;
    if (whatIsClicked == 'practicetestandquiz') container = <PracticeTestAndQuiz />;
    if (whatIsClicked == 'learningresources') container = <LearningResources />;

    return (
        <>
            <Nav1 />
            <Sidebar />
            {container}
        </>

    );
}
