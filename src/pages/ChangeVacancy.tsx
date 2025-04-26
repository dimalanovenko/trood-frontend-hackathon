import PageContainer from "../components/ui/PageContainer.tsx";
import {NavigateFunction, useNavigate, useParams} from "react-router";
import {useDeleteVacancyMutation, useGetVacanciesQuery, usePutVacancyMutation} from "../services/api.ts";
import {Vacancy} from "../app/types.ts";
import Title from "../components/ui/Title.tsx";
import Button from "../components/ui/Button.tsx";
import Text from "../components/ui/Text.tsx";
import Selector from "../components/ui/Selector.tsx";
import {ChangeEvent, useState} from "react";
import Input from "../components/ui/Input.tsx";
import TextArea from "../components/ui/TextArea.tsx";
import Subtitle from "../components/ui/Subtitle.tsx";

const ChangeVacancy = () => {

    const {id, vacancyId} = useParams();
    const {data: vacancies, refetch} = useGetVacanciesQuery(Number(id));
    // Find the specific vacancy based on vacancyId
    const vacancy: Vacancy | undefined = vacancies?.find((v: Vacancy): boolean => v.id === Number(vacancyId));
    const [putVacancy] = usePutVacancyMutation();
    const [deleteVacancy] = useDeleteVacancyMutation();

    const [isEdited, setIsEdited] = useState(false);
    // Local copy of vacancy data for editing
    const [value, setValue] = useState({...vacancy});

    const navigate: NavigateFunction = useNavigate();

    // Function to handle deleting a vacancy
    const handleDelete: () => Promise<void> = async (): Promise<void> => {
        const confirmed: boolean = window.confirm('Are you sure you want to delete this project?');
        if (!confirmed) return;

        try {
            await deleteVacancy(vacancy?.id).unwrap();
            await navigate(`/projects/${id}`);
            await refetch();
        } catch (e) {
            console.error("error:", e);
        }
    };

    const allOptions: string[] = ['Design', 'Development', 'Marketing'];

    // Validation state for inputs
    const [isValid, setIsValid] = useState({
        name: true,
        experience: true,
        deadline: true,
        description: true,
        country: true,
    });
    const isFormValid: boolean = Object.values(isValid).every(Boolean); // Check if all fields are valid

    return (
        <PageContainer className='relative'>
            <div className='flex items-center justify-between mb-8'>
                <Title text={vacancy?.name}/>
                {isEdited ? (
                        <Button
                            text='Change vacancy'
                            disabled={!isFormValid}
                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={async (): Promise<void> => {
                                // Send updated vacancy data to the server
                                await putVacancy({
                                    id: vacancy?.id,
                                    vacancy: {
                                        country: value.country || vacancy?.country,
                                        description: value.description || vacancy?.description,
                                        experience: value.experience || vacancy?.experience,
                                        field: value.field || vacancy?.field,
                                        id: value.id || vacancy?.id,
                                        name: vacancy?.name,
                                        project_id: value.project_id || vacancy?.project_id,
                                    }
                                });
                                await refetch();
                                setIsEdited(false);
                            }}
                        />
                    )
                    : (
                        <Button text='Delete vacancy' onClick={handleDelete}/>
                    )}
            </div>
            <div className='bg-white rounded-3xl pl-14.75 pr-19.25 pt-13.75 h-full'>
                <div className="grid grid-cols-3 grid-rows-3 items-start gap-6 h-76.75 mb-10">
                    {/* Dropdown to select vacancy field */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Field'/>
                        <Selector
                            onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
                                setValue({
                                    ...value, field: e.target.value
                                });
                                setIsEdited(true);
                            }}
                            value={value.field ?? vacancy?.field}
                            classCaret='right-4'
                            classSelect='pl-5'
                        >
                            {/* Show current field as the first option */}
                            <option value={value.field}>{value.field}</option>
                            {/* List other available fields */}
                            {allOptions
                                .filter(opt => opt !== value.field)
                                .map(opt => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                        </Selector>
                    </div>

                    {/* Input for experience */}
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

                                // Validation: 6-15 characters and must contain a digit
                                if (experienceValue.length < 6 || experienceValue.length > 15 || !/\d/.test(experienceValue)) {
                                    setIsValid({...isValid, experience: false});
                                } else {
                                    setIsValid({...isValid, experience: true});
                                }
                            }}
                            value={value.experience}
                            className='pl-5.5'
                        />
                        <span className={`${isValid.experience ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid experience
                        </span>
                    </div>

                    {/* Input for country */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Country'/>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                const countryValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    country: countryValue
                                });

                                setIsEdited(true);

                                // Validation: 2-10 characters
                                if (countryValue.length < 2 || countryValue.length > 10) {
                                    setIsValid({...isValid, country: false});
                                } else {
                                    setIsValid({...isValid, country: true});
                                }
                            }}
                            value={value.country}
                            className='pl-5.5'
                        />
                        <span className={`${isValid.country ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid country
                        </span>
                    </div>

                    {/* Textarea for description */}
                    <div className="flex flex-col gap-2.5 col-span-3">
                        <Text text='Descriprion'/>
                        <TextArea
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
                                const descriptionValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    description: descriptionValue
                                });

                                setIsEdited(true);

                                // Validation: 6-1000 characters
                                if (descriptionValue.length < 6 || descriptionValue.length > 1000) {
                                    setIsValid({ ...isValid, description: false });
                                } else {
                                    setIsValid({ ...isValid, description: true });
                                }
                            }}
                            value={value.description}
                            className='pl-5.5 pt-5'
                        />
                        <span className={`${isValid.description ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid description
                        </span>
                    </div>
                </div>

                {/* List of hired people (vacancies) */}
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
                            {/* Button to navigate to edit specific vacancy */}
                            <button onClick={() => navigate(`/projects/${id}/change-vacancy/${vacancy.id}`)}>
                                <Text text='More&nbsp;&nbsp;→' className='cursor-pointer'/>
                            </button>
                        </li>
                    )) : (
                        // Message if no vacancies are available
                        <div className='h-28 flex items-center'>
                            <Text text='There are any vacancies.'/>
                        </div>
                    )}
                </ul>
            </div>
        </PageContainer>
    )
}

export default ChangeVacancy;
