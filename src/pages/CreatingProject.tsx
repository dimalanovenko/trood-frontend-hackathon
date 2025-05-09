import {ChangeEvent, useState} from "react";
import {useGetProjectsQuery, usePostProjectsMutation} from "../services/api.ts";
import PageContainer from "../components/ui/PageContainer.tsx";
import Button from "../components/ui/Button.tsx";
import Input from "../components/ui/Input.tsx";
import Text from "../components/ui/Text.tsx";
import Selector from "../components/ui/Selector.tsx";
import TextArea from "../components/ui/TextArea.tsx";
import Title from "../components/ui/Title.tsx";
import {NavigateFunction, useNavigate} from "react-router";
import {Project} from "../app/types.ts";

const CreatingProject = () => {
    const navigate: NavigateFunction = useNavigate();

    // Hook to send POST request for creating a project
    const [postProject] = usePostProjectsMutation();
    // Hook to fetch and refetch the list of projects
    const {refetch} = useGetProjectsQuery();

    // State for selected project field (Design, Development, Marketing)
    const [option, setOption] = useState('Design');
    // State for form values
    const [value, setValue] = useState({
        id: 0,
        name: '',
        deadline: '',
        description: '',
        experience: ''
    });
    // State for form validation status
    const [isValid, setIsValid] = useState({
        name: false,
        experience: false,
        deadline: false,
        description: false,
    });
    // Boolean indicating if the entire form is valid
    const isFormValid: boolean = Object.values(isValid).every(Boolean);

    return (
        <PageContainer className='fixed h-screen'>
            <Title text="Creating project" className='mb-8'/>
            <div className='bg-white rounded-3xl pl-14.75 pr-19.25 pt-13.75 h-full'>
                <div className="grid grid-cols-2 grid-rows-3 items-start gap-9.25 mb-29.75 h-105.5">
                    {/* Input field for project name */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Name'/>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                const nameValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    name: nameValue
                                });

                                // Validation: name length should be between 3 and 15 characters
                                if (nameValue.length < 3 || nameValue.length > 15) {
                                    setIsValid({...isValid, name: false});
                                } else {
                                    setIsValid({...isValid, name: true});
                                }
                            }}
                            value={value.name}
                            className='pl-5.5'
                        />
                        {/* Error message for invalid name */}
                        <span className={`${isValid.name ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid name
                        </span>
                    </div>

                    {/* Selector for choosing the project field */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Field'/>
                        <Selector
                            onChange={(e: ChangeEvent<HTMLSelectElement>): void => setOption(e.target.value)}
                            value={option}
                            classCaret='right-4'
                            classSelect='pl-5'
                        >
                            <option value="Design">Design</option>
                            <option value="Development">Development</option>
                            <option value="Marketing">Marketing</option>
                        </Selector>
                    </div>

                    {/* Input field for experience */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Experience'/>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                const experienceValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    experience: experienceValue
                                });

                                // Validation: experience should be 6-15 characters long and contain a number
                                if (experienceValue.length < 6 || experienceValue.length > 15 || !/\d/.test(experienceValue)) {
                                    setIsValid({...isValid, experience: false});
                                } else {
                                    setIsValid({...isValid, experience: true});
                                }
                            }}
                            value={value.experience}
                            className='pl-5.5'
                        />
                        {/* Error message for invalid experience */}
                        <span className={`${isValid.experience ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid experience
                        </span>
                    </div>

                    {/* Input field for project deadline */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Deadline'/>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                const deadlineValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    deadline: deadlineValue
                                });

                                // Validation: deadline must match format DD.MM.YYYY
                                if (!/^\d{2}\.\d{2}\.\d{4}$/.test(deadlineValue)) {
                                    setIsValid({ ...isValid, deadline: false });
                                } else {
                                    setIsValid({ ...isValid, deadline: true });
                                }
                            }}
                            value={value.deadline}
                            className='pl-5.5'
                        />
                        {/* Error message for invalid deadline */}
                        <span className={`${isValid.deadline ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid deadline
                        </span>
                    </div>

                    {/* Text area for project description */}
                    <div className="flex flex-col gap-2.5 col-span-2">
                        <Text text='Descriprion'/>
                        <TextArea
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
                                const descriptionValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    description: descriptionValue
                                });

                                // Validation: description should be between 6 and 1000 characters
                                if (descriptionValue.length < 6 || descriptionValue.length > 1000) {
                                    setIsValid({ ...isValid, description: false });
                                } else {
                                    setIsValid({ ...isValid, description: true });
                                }
                            }}
                            value={value.description}
                            className='pl-5.5 pt-5'
                        />
                        {/* Error message for invalid description */}
                        <span className={`${isValid.description ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid description
                        </span>
                    </div>
                </div>

                {/* Button to create a new project */}
                <Button
                    text='Create project'
                    disabled={!isFormValid}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={async (): Promise<void> => {
                        try {
                            // Prepare the payload to send
                            const payload = {
                                name: value.name,
                                deadline: value.deadline,
                                description: value.description,
                                experience: value.experience,
                                field: option,
                                id: value.id,
                            };

                            // Send POST request to create the project
                            const response: Project = await postProject(payload).unwrap();

                            // Save the selected field in localStorage by project id
                            localStorage.setItem(`field-${response.id}`, payload.field);

                            // Refetch the list of projects after creation
                            await refetch();

                            // Reset the form values
                            setValue({
                                name: "",
                                deadline: '',
                                description: '',
                                experience: '',
                                id: 0
                            });
                            setOption("");

                            // Redirect to the newly created project's page
                            navigate(`/projects/${response.id}`);

                        } catch (e) {
                            console.error("error:", e);
                        }
                    }}
                />
            </div>
        </PageContainer>
    )
}

export default CreatingProject
