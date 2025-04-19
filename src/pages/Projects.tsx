import {useDeleteProjectMutation, useGetProjectsQuery} from "../services/api.ts";
import {Project} from "../services/api.ts";

const Projects = () => {

    const {data: projects, isLoading, isError, error} = useGetProjectsQuery();
    const [deleteProject] = useDeleteProjectMutation()

    if (isLoading) return <p>Загрузка проектов...</p>;
    if (isError) {
        console.error('Ошибка запроса:', error);
        return <p className="text-red-500">Ошибка загрузки проектов</p>;
    }

    return (
        <>
            <button
                className="text-white p-2 m-2 bg-blue-500 rounded-lg"
                onClick={(): void => {
                }}>
                projects
            </button>
            <ul>
                {projects?.map((project: Project) => (
                    <li key={project.id}>
                        {project.name}
                        {project.id}
                        <button
                            className="text-white p-2 m-2 bg-blue-500 rounded-lg"
                            onClick={(): void => {
                                deleteProject(project.id);
                            }}>
                            delete
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Projects
