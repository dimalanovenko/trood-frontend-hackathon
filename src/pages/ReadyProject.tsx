import { NavigateFunction, useNavigate, useParams } from "react-router";
import {
    useDeleteProjectMutation,
    useGetProjectQuery,
    useGetVacanciesQuery,
    usePutProjectMutation
} from "../services/api";
import Title from "../components/ui/Title";
import Text from "../components/ui/Text";
import PageContainer from "../components/ui/PageContainer";
import Input from "../components/ui/Input.tsx";
import TextArea from "../components/ui/TextArea.tsx";
import Button from "../components/ui/Button.tsx";
import { ChangeEvent, useState } from "react";
import Selector from "../components/ui/Selector.tsx";
import { Project, Vacancy } from "../app/types.ts";
import Subtitle from "../components/ui/Subtitle.tsx";

const ReadyProject = () => {
    const { id } = useParams();

    // Fetching project and vacancies data from the server
    const { data: project, isLoading, isError, refetch } = useGetProjectQuery(Number(id));
    const [deleteProject] = useDeleteProjectMutation();
    const [putProject] = usePutProjectMutation();
    const { data: vacancies } = useGetVacanciesQuery(Number(id));

    // Load project data from localStorage if available
    const storageProjects: string = localStorage.getItem("projects") ?? '[]';
    const projectsArr: Project[] = JSON.parse(storageProjects);
    const storageProject: Project = (projectsArr.find((p: Project): boolean => p.id === project?.id) || project)!;

    const [value, setValue] = useState({ ...project });
    const [isEdited, setIsEdited] = useState(false);

    // Form validation states
    const [isValid, setIsValid] = useState({
        experience: true,
        deadline: true,
        description: true,
    });
    const isFormValid: boolean = Object.values(isValid).every(Boolean);

    const navigate: NavigateFunction = useNavigate();

    // Display loading or error messages
    if (isLoading) return <p>Project loading...</p>;
    if (isError) return <p className="text-red-500">Project loading error</p>;

    // Handle project deletion
    const handleDelete: () => Promise<void> = async (): Promise<void> => {
        const confirmed: boolean = window.confirm('Are you sure you want to delete this project?');
        if (!confirmed) return;

        try {
            await deleteProject(project?.id).unwrap();
            await navigate('/projects');
            await refetch();
        } catch (e) {
            console.error("error:", e);
        }
    }

    const allOptions: string[] = ['Design', 'Development', 'Marketing'];

    return (
        <PageContainer className='relative'>
            <div className='flex items-center justify-between mb-8'>
                <Title text={project?.name}/>
                {isEdited ? (
                    <Button
                        disabled={!isFormValid}
                        className="disabled:opacity-50 disabled:cursor-not-allowed"
                        text='Change Project'
                        // Handle project update
                        onClick={async (): Promise<void> => {
                            await putProject({
                                id: project?.id,
                                project: {
                                    experience: value.experience ?? project?.experience,
                                    deadline: value.deadline ?? project?.deadline,
                                    description: value.description ?? project?.description,
                                    name: project?.name,
                                }
                            });
                            await refetch();
                            setIsEdited(false);
                        }}
                    />
                ) : (
                    <Button text='Delete project' onClick={handleDelete}/>
                )
                }
            </div>
            <div className='bg-white rounded-3xl pl-14.75 pr-19.25 pt-13.75 h-full'>
                <div className="grid grid-cols-3 grid-rows-3 items-start gap-6 h-76.75 mb-10">
                    {/* Field selector */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Field'/>
                        <Selector
                            onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                                const updatedField = e.target.value;

                                const updatedProject = {
                                    ...storageProject,
                                    field: updatedField
                                };

                                // Save updated field to localStorage
                                localStorage.setItem(`field-${updatedProject?.id}`, updatedField);
                                setValue(prev => ({
                                    ...prev,
                                    field: updatedField
                                }));

                                setIsEdited(true);
                            }}
                            value={String(localStorage.getItem(`field-${storageProject.id}`)) || ''}
                            classCaret='right-4'
                            classSelect='pl-5'
                        >
                            <option value={value.field}>{value.field}</option>
                            {allOptions
                                .filter(opt => opt !== value.field)
                                .map(opt => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                        </Selector>
                    </div>

                    {/* Experience input */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Experience'/>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                const experienceValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    experience: experienceValue
                                });
                                setIsEdited(true);

                                // Validate experience field
                                if (experienceValue.length < 6 || experienceValue.length > 15 || !/\d/.test(experienceValue)) {
                                    setIsValid({ ...isValid, experience: false });
                                } else {
                                    setIsValid({ ...isValid, experience: true });
                                }
                            }}
                            value={value.experience ?? project?.experience}
                            className='pl-5.5'
                        />
                        <span className={`${isValid.experience ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid experience
                        </span>
                    </div>

                    {/* Deadline input */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Deadline'/>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                const deadlineValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    deadline: deadlineValue
                                });
                                setIsEdited(true);

                                // Validate deadline field
                                if (!/^\d{2}\.\d{2}\.\d{4}$/.test(deadlineValue)) {
                                    setIsValid({ ...isValid, deadline: false });
                                } else {
                                    setIsValid({ ...isValid, deadline: true });
                                }
                            }}
                            value={value.deadline ?? project?.deadline}
                            className='pl-5.5'
                        />
                        <span className={`${isValid.deadline ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid deadline
                        </span>
                    </div>

                    {/* Description input */}
                    <div className="flex flex-col gap-2.5 col-span-3">
                        <Text text='Description'/>
                        <TextArea
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
                                const descriptionValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    description: descriptionValue
                                });
                                setIsEdited(true);

                                // Validate description field
                                if (descriptionValue.length < 6 || descriptionValue.length > 1000) {
                                    setIsValid({ ...isValid, description: false });
                                } else {
                                    setIsValid({ ...isValid, description: true });
                                }
                            }}
                            value={value.description ?? project?.description}
                            className='pl-5.5 pt-5'
                        />
                        <span className={`${isValid.description ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid description
                        </span>
                    </div>
                </div>

                {/* Add vacancy button */}
                <Button
                    text='Add vacancy'
                    onClick={() => navigate(`/projects/${project?.id}/create-vacancy`)}
                />

                {/* List of hired people */}
                <Title text='Hired people' className='mt-9.5'/>
                <ul>
                    {vacancies?.length !== 0 ? vacancies?.map((vacancy: Vacancy) => (
                        <li
                            className='pl-0 pr-12 pt-6 pb-7.5 flex items-center justify-between'
                            key={vacancy?.id}>
                            <div className='flex flex-col gap-2.5'>
                                <Subtitle text={vacancy?.name}/>
                                <Text text={vacancy?.field}/>
                            </div>
                            <Text text={vacancy?.experience}/>
                            <div className='bg-bg w-14.75 h-10 rounded-2xl flex items-center justify-center'>
                                <span className='text-lg font-bold'>9/10</span>
                            </div>
                            {/* Button to navigate to vacancy edit page */}
                            <button onClick={() => navigate(`/projects/${project?.id}/change-vacancy/${vacancy.id}`)}>
                                <Text text='More&nbsp;&nbsp;→' className='cursor-pointer'/>
                            </button>
                        </li>
                    )) : (
                        // Message when there are no vacancies
                        <div className='h-28 flex items-center'>
                            <Text text='There are any vacancies.'/>
                        </div>
                    )}
                </ul>
            </div>
        </PageContainer>
    );
};

export default ReadyProject;
