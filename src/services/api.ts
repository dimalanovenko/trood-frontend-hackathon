import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export interface Project {
    deadline: string,
    description: string,
    experience: string,
    id: number,
    name: string
}

export interface Vacancy {
    country: string,
    description: string,
    experience: string,
    field: string,
    id: number,
    name: string,
    project_id: number
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080/'}),
    endpoints: (builder) => ({
        // projects
        getProjects: builder.query<Project[], void>({
            query: () => 'projects',
        }),
        getProject: builder.query<Project, Project['id']>({
            query: (id) => `projects/${id}`
        }),
        postProjects: builder.mutation<void, Project>({
            query: (project) => ({
                url: 'projects',
                method: 'POST',
                body: project,
            }),
        }),
        putProject: builder.mutation<void, { id: Project["id"]; project: Project }>({
            query: ({id, project}) => ({
                url: `projects/${id}`,
                method: 'PUT',
                body: project,
            }),
        }),
        deleteProject: builder.mutation<void, Project['id']>({
            query: (id) => ({
                url: `projects/${id}`,
                method: 'DELETE',
            }),
        }),
        // vacancies
        getVacancies: builder.query<Vacancy[], Project['id']>({
            query: (id) => `projects/${id}/vacancies`
        }),
        postVacancy: builder.mutation<void, { id: Project['id'], vacancy: Vacancy }>({
            query: ({id, vacancy}) => ({
                url: `projects/${id}/vacancies`,
                method: 'POST',
                body: vacancy
            })
        }),
        putVacancy: builder.mutation<void, { id: Vacancy['id'], vacancy: Vacancy }>({
            query: ({id, vacancy}) => ({
                url: `/vacancies/${id}`,
                method: 'PUT',
                body: vacancy
            })
        }),
        deleteVacancy: builder.mutation<void, Vacancy['id']>({
            query: (id) => ({
                url: `/vacancies/${id}`,
                method: 'DELETE',
            })
        })
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    usePostProjectsMutation,
    usePutProjectMutation,
    useDeleteProjectMutation,
    useGetVacanciesQuery,
    usePostVacancyMutation,
    usePutVacancyMutation,
    useDeleteVacancyMutation,
} = api;
