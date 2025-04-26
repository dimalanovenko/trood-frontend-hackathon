import { useGetProjectsQuery } from "../services/api.ts";
import { Project, ValidDateProject } from "../app/types.ts";
import Title from "../components/ui/Title.tsx";
import PageContainer from "../components/ui/PageContainer.tsx";
import Subtitle from "../components/ui/Subtitle.tsx";
import Button from "../components/ui/Button.tsx";
import { Link, NavigateFunction, useNavigate } from "react-router";
import Text from "../components/ui/Text.tsx";
import { useEffect } from "react";

const Projects = () => {
    const navigate: NavigateFunction = useNavigate();

    // Fetch projects data from API
    const { data: projects, isLoading, isError, refetch } = useGetProjectsQuery();

    // Save projects to localStorage whenever they change
    useEffect((): void => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    // Refetch projects when component is mounted
    useEffect((): void => {
        refetch();
    }, [refetch]);

    // Convert project deadline from string to Date object
    const validDateProjects: ValidDateProject[] = projects
        ? projects.map((project: Project) => {
            const [day, month, year] = String(project.deadline).split('.').map(Number);
            const parsedDeadline = new Date(year, month - 1, day);

            return {
                ...project,
                deadline: parsedDeadline,
            };
        })
        : [];

    const today = new Date();

    // Separate active and passed projects based on deadline
    const activeProjects: ValidDateProject[] = validDateProjects?.filter(
        (project: ValidDateProject) => project.deadline >= today
    );
    const passedProjects: ValidDateProject[] = validDateProjects?.filter(
        (project: ValidDateProject) => project.deadline < today
    );

    // Show loading or error states
    if (isLoading) return <p>Loading projects...</p>;
    if (isError) return <p className="text-red-500">There is an error</p>;

    return (
        <PageContainer className="relative">
            <div className="flex flex-col gap-10">
                {/* Active projects section */}
                <div>
                    <div className="flex items-center justify-between mb-7">
                        <Title text="Active Projects" />
                        <Button
                            text="Create project"
                            onClick={(): void => {
                                navigate("/projects/creating-project");
                            }}
                        />
                    </div>
                    <ul className="grid grid-cols-2 grid-flow-row gap-6">
                        {/* If no active projects, show message */}
                        {activeProjects.length === 0 ? (
                            <Text text="There are no active projects" />
                        ) : (
                            activeProjects.map((project: ValidDateProject) => (
                                <Link
                                    to={`/projects/${project.id}`}
                                    key={project.id}
                                    className="h-81.25 bg-white rounded-3xl relative"
                                >
                                    {/* Project content */}
                                    <div className="absolute top-8 left-8">
                                        <Subtitle text={String(project.name)} />
                                        <ul className="flex flex-col gap-[13px] mt-5">
                                            <li className="flex items-center gap-[15px]">
                                                <div className="w-1 h-[25px] rounded-full bg-icons" />
                                                <Text text={String(project.description)} />
                                            </li>
                                            <li className="flex items-center gap-[15px]">
                                                <div className="w-1 h-[25px] rounded-full bg-icons" />
                                                <Text
                                                    text={`${project.deadline.getDate()}.${
                                                        project.deadline.getMonth() >= 10
                                                            ? project.deadline.getMonth()
                                                            : "0" + project.deadline.getMonth()
                                                    }.${project.deadline.getFullYear()}`}
                                                />
                                            </li>
                                        </ul>
                                    </div>

                                    {/* User info */}
                                    <div className="absolute bottom-10.25 left-8 flex items-center gap-2">
                                        {/* User icon */}
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="..." fill="#DBE3E1" />
                                        </svg>
                                        <Text text="Anna Lenram" className="text-card-text text-[16px]" />
                                    </div>

                                    {/* Project action icons */}
                                    <div className="absolute bottom-8.5 right-4.5 flex items-center gap-4.25">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="..." fill="#DBE3E1" />
                                        </svg>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="..." fill="#DBE3E1" />
                                        </svg>
                                    </div>
                                </Link>
                            ))
                        )}
                    </ul>
                </div>

                {/* Passed projects section */}
                <div>
                    <Title text="Passed projects" />
                    <ul className="mt-7 grid grid-cols-2 gap-6 grid-flow-row mb-37.5">
                        {/* If no passed projects, show message */}
                        {passedProjects.length === 0 ? (
                            <Text text="There are no passed projects" />
                        ) : (
                            passedProjects.map((project: ValidDateProject) => (
                                <Link
                                    to={`/projects/${project.id}`}
                                    key={project.id}
                                    className="h-81.25 bg-white rounded-3xl relative"
                                >
                                    {/* Project content */}
                                    <div className="absolute top-8 left-8">
                                        <Subtitle text={String(project.name)} />
                                        <ul className="flex flex-col gap-[13px] mt-5">
                                            <li className="flex items-center gap-[15px]">
                                                <div className="w-1 h-[25px] rounded-full bg-icons" />
                                                <Text text={String(project.description)} />
                                            </li>
                                            <li className="flex items-center gap-[15px]">
                                                <div className="w-1 h-[25px] rounded-full bg-icons" />
                                                <Text
                                                    text={`${project.deadline.getDate()}.${
                                                        project.deadline.getMonth() >= 10
                                                            ? project.deadline.getMonth()
                                                            : "0" + project.deadline.getMonth()
                                                    }.${project.deadline.getFullYear()}`}
                                                />
                                            </li>
                                        </ul>
                                    </div>

                                    {/* User info */}
                                    <div className="absolute bottom-10.25 left-8 flex items-center gap-2">
                                        {/* User icon */}
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="..." fill="#DBE3E1" />
                                        </svg>
                                        <Text text="Anna Lenram" className="text-card-text text-[16px]" />
                                    </div>

                                    {/* Project action icons */}
                                    <div className="absolute bottom-8.5 right-4.5 flex items-center gap-4.25">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="..." fill="#DBE3E1" />
                                        </svg>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="..." fill="#DBE3E1" />
                                        </svg>
                                    </div>
                                </Link>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </PageContainer>
    );
};

export default Projects;
