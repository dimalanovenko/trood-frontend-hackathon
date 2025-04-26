// Defining the Project interface to describe a project object
export interface Project {
    deadline?: string; // Optional string field for the project deadline
    description?: string; // Optional string for the project description
    experience?: string; // Optional string to specify the experience required for the project
    id?: number; // Optional number for the project ID
    name?: string; // Optional string for the project name
    field?: string; // Optional string for the field or category of the project
}

// Extending the Project interface to create a ValidDateProject interface
// Omit 'deadline' from the original Project type and replace it with a Date type for stricter type checking
export interface ValidDateProject extends Omit<Project, 'deadline'> {
    deadline: Date; // Here, 'deadline' is a required field of type Date (not a string)
}

// Defining the Vacancy interface to describe a vacancy object
export interface Vacancy {
    country?: string, // Optional string to specify the country for the vacancy
    description?: string, // Optional string to describe the vacancy
    experience?: string, // Optional string to specify the experience required for the vacancy
    field?: string, // Optional string for the field/category of the vacancy
    id?: number, // Optional number for the vacancy ID
    name?: string, // Optional string for the name of the vacancy
    project_id?: number // Optional number to link the vacancy to a specific project by its ID
}
