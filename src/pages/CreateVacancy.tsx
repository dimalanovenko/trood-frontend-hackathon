import PageContainer from "../components/ui/PageContainer.tsx";
import Title from "../components/ui/Title.tsx";
import Text from "../components/ui/Text.tsx";
import Input from "../components/ui/Input.tsx";
import {ChangeEvent, useState} from "react";
import Selector from "../components/ui/Selector.tsx";
import TextArea from "../components/ui/TextArea.tsx";
import Button from "../components/ui/Button.tsx";
import {useGetVacanciesQuery, usePostVacancyMutation} from "../services/api.ts";
import {useNavigate, useParams} from "react-router";

const CreateVacancy = () => {

    const {id} = useParams();
    const [postVacancy] = usePostVacancyMutation();
    const {refetch} = useGetVacanciesQuery(Number(id));
    const navigate = useNavigate();

    // Local state for form values
    const [value, setValue] = useState({
        country: "",
        description: "",
        experience: "",
        field: "",
        id: 0,
        name: "",
        project_id: 0
    });

    // Validation state for form fields
    const [isValid, setIsValid] = useState({
        name: false,
        experience: false,
        deadline: false, // Unused in the form, but kept in validation state
        description: false,
        country: false,
    });
    // Overall form validity
    const isFormValid: boolean = Object.values(isValid).every(Boolean);

    return (
        <PageContainer className='fixed h-screen'>
            {/* Page title */}
            <Title text="Creating vacancy" className='mb-8'/>
            <div className='bg-white rounded-3xl pl-14.75 pr-19.25 pt-13.75 h-full'>
                {/* Grid container for input fields */}
                <div className="grid grid-cols-2 grid-rows-3 items-start gap-9.25 mb-29.75 h-105.5">
                    {/* Name input */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Name'/>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                const nameValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    name: nameValue
                                });

                                // Validation: 3-15 characters
                                if (nameValue.length < 3 || nameValue.length > 15) {
                                    setIsValid({...isValid, name: false});
                                } else {
                                    setIsValid({...isValid, name: true});
                                }
                            }}
                            value={value.name}
                            className='pl-5.5'
                        />
                        <span className={`${isValid.name ? 'hidden' : 'block'} text-red-500`}>
                            Write down a valid name
                        </span>
                    </div>

                    {/* Field selector */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Field'/>
                        <Selector
                            onChange={(e: ChangeEvent<HTMLSelectElement>): void =>
                                setValue({...value, field: e.target.value})
                            }
                            value={value.field}
                            classCaret='right-4'
                            classSelect='pl-5'
                        >
                            {/* Available options */}
                            <option value="Design">Design</option>
                            <option value="Development">Development</option>
                            <option value="Marketing">Marketing</option>
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

                                // Validation: 6-15 characters and must include a digit
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

                    {/* Country input */}
                    <div className="flex flex-col gap-2.5">
                        <Text text='Country'/>
                        <Input
                            onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                                const countryValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    country: countryValue
                                });

                                // Validation: 2-15 characters
                                if (countryValue.length < 2 || countryValue.length > 15) {
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

                    {/* Description textarea */}
                    <div className="flex flex-col gap-2.5 col-span-2">
                        <Text text='Descriprion'/>
                        <TextArea
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
                                const descriptionValue: string = e.target.value;

                                setValue({
                                    ...value,
                                    description: descriptionValue
                                });

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

                {/* Submit button */}
                <Button
                    text='Create vacancy'
                    disabled={!isFormValid}
                    className="disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={async (): Promise<void> => {
                        // Send the new vacancy data to the server
                        await postVacancy({
                            id: Number(id),
                            vacancy: {...value}
                        });
                        await refetch(); // Refresh the list
                        await navigate(`/projects/${id}`); // Navigate back to the project page
                    }}
                />
            </div>
        </PageContainer>
    )
}

export default CreateVacancy;
