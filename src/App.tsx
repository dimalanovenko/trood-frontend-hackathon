import { Navigate, Route, Routes } from "react-router"; // Import routing components from React Router
import Projects from "./pages/Projects.tsx";
import CreatingProject from "./pages/CreatingProject.tsx";
import ReadyProject from "./pages/ReadyProject.tsx";
import Header from "./components/Header.tsx";
import Nav from "./components/Nav.tsx";
import CreateVacancy from "./pages/CreateVacancy.tsx";
import ChangeVacancy from "./pages/ChangeVacancy.tsx";

function App() {

    return (
        <>
            <Header />
            <Nav />
            <Routes>
                {/* Default route: Redirect from '/' to '/projects' */}
                <Route path="/" element={<Navigate to="/projects" replace />} />

                {/* Route to the Projects page */}
                <Route path='/projects' element={<Projects />} />

                {/* Route to the ReadyProject page, passing the project id as a parameter */}
                <Route path="/projects/:id" element={<ReadyProject />} />

                {/* Route for creating a new project */}
                <Route path='/projects/creating-project' element={<CreatingProject />} />

                {/* Route for creating a new vacancy within a specific project */}
                <Route path='/projects/:id/create-vacancy' element={<CreateVacancy />} />

                {/* Route for changing an existing vacancy within a specific project */}
                <Route path='/projects/:id/change-vacancy/:vacancyId' element={<ChangeVacancy />} />
            </Routes>
        </>
    );
}

export default App;
