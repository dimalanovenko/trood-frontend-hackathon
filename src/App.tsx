import {Navigate, Route, Routes} from "react-router";
import Projects from "./pages/Projects.tsx";
import CreatingProject from "./pages/CreatingProject.tsx";
import ReadyProject from "./pages/ReadyProject.tsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path='/projects' element={<Projects />}/>
            <Route path='/creating-project' element={<CreatingProject />}/>
            <Route path='/ready-project' element={<ReadyProject />}/>
        </Routes>
    )
}

export default App
