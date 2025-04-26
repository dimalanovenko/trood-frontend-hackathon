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
                                            <path d="M9.99998 3.33337C10.884 3.33337 11.7319 3.68456 12.357 4.30968C12.9821 4.93481 13.3333 5.78265 13.3333 6.66671C13.3333 7.55076 12.9821 8.39861 12.357 9.02373C11.7319 9.64885 10.884 10 9.99998 10C9.11592 10 8.26808 9.64885 7.64296 9.02373C7.01784 8.39861 6.66665 7.55076 6.66665 6.66671C6.66665 5.78265 7.01784 4.93481 7.64296 4.30968C8.26808 3.68456 9.11592 3.33337 9.99998 3.33337ZM9.99998 11.6667C13.6833 11.6667 16.6666 13.1584 16.6666 15V16.6667H3.33331V15C3.33331 13.1584 6.31665 11.6667 9.99998 11.6667Z" fill="#DBE3E1"/>
                                        </svg>

                                        <Text text="Anna Lenram" className="text-card-text text-[16px]" />
                                    </div>

                                    {/* Project action icons */}
                                    <div className="absolute bottom-8.5 right-4.5 flex items-center gap-4.25">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 5C2.25 4.27065 2.53973 3.57118 3.05546 3.05546C3.57118 2.53973 4.27065 2.25 5 2.25H19C19.7293 2.25 20.4288 2.53973 20.9445 3.05546C21.4603 3.57118 21.75 4.27065 21.75 5V15C21.75 15.7293 21.4603 16.4288 20.9445 16.9445C20.4288 17.4603 19.7293 17.75 19 17.75H7.961C7.581 17.75 7.222 17.923 6.985 18.22L4.655 21.133C3.857 22.129 2.25 21.566 2.25 20.29V5Z" fill="#DBE3E1"/>
                                        </svg>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.0001 2C10.1435 2 8.36306 2.7375 7.0503 4.05025C5.73755 5.36301 5.00005 7.14348 5.00005 9V12.528C5.0002 12.6831 4.96425 12.8362 4.89505 12.975L3.17805 16.408C3.09418 16.5757 3.05457 16.7621 3.063 16.9494C3.07143 17.1368 3.1276 17.3188 3.2262 17.4783C3.32479 17.6379 3.46252 17.7695 3.62632 17.8608C3.79011 17.9521 3.97453 18 4.16205 18H19.8381C20.0256 18 20.21 17.9521 20.3738 17.8608C20.5376 17.7695 20.6753 17.6379 20.7739 17.4783C20.8725 17.3188 20.9287 17.1368 20.9371 16.9494C20.9455 16.7621 20.9059 16.5757 20.8221 16.408L19.1061 12.975C19.0365 12.8362 19.0002 12.6832 19.0001 12.528V9C19.0001 7.14348 18.2626 5.36301 16.9498 4.05025C15.637 2.7375 13.8566 2 12.0001 2ZM12.0001 21C11.3794 21.0003 10.7739 20.8081 10.2671 20.4499C9.76022 20.0917 9.37694 19.5852 9.17005 19H14.8301C14.6232 19.5852 14.2399 20.0917 13.733 20.4499C13.2262 20.8081 12.6207 21.0003 12.0001 21Z" fill="#DBE3E1"/>
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
