import {usePostProjectsMutation} from "../services/api.ts";

const CreatingProject = () => {

    const [postProject] = usePostProjectsMutation();

    const handleSubmit = async () => {
        const newProject = {
            deadline: '2025-06-01',
            description: 'Новый проект',
            experience: '2 года',
            id: 99,
            name: 'Project X',
        };

        try {
            await postProject(newProject).unwrap();
        } catch (e) {
            console.error('Ошибка при создании проекта:', e);
        }
    };

    return (
        <>
            <button onClick={(): void => {
                handleSubmit()
            }}>
                create project
            </button>
        </>
    )
}

export default CreatingProject
