import { NavLink, NavLinkRenderProps } from "react-router"; // Importing NavLink for navigation between routes

const Nav = () => {
    return (
        <nav className='w-1/7 h-full fixed bg-white top-28.5 left-0 pl-10 flex flex-col gap-120'>
            {/* The <nav> element serves as the main sidebar container.
                - `w-1/7`: sets the width of the sidebar to 1/7th of the screen width
                - `h-full`: makes the sidebar full height
                - `fixed`: keeps the sidebar fixed in place while scrolling
                - `bg-white`: sets the background color to white
                - `top-28.5 left-0`: positions the sidebar at the top and left of the screen
                - `pl-10`: adds padding on the left side */}

            <ul className='flex flex-col'>
                {/* Unordered list to hold navigation items */}
                <NavLink
                    className='flex items-center w-50 h-12.5 pl-[19px] hover:rounded-lg hover:bg-nav-active hover:text-white'
                    to="#"
                >
                    Main page
                </NavLink>

                {/* Navigation link for Projects. The `isActive` prop is used to apply active styles when the link is selected */}
                <NavLink
                    className={({ isActive }: NavLinkRenderProps): string =>
                        `flex items-center w-50 h-12.5 pl-[19px] ${
                            isActive
                                ? 'rounded-lg bg-nav-active text-white' // Active state styles
                                : 'hover:rounded-lg hover:bg-nav-active hover:text-white' // Hover and normal state styles
                        }`
                    }
                    to="/projects"
                >
                    Projects
                </NavLink>

                {/* Additional NavLinks for Vacancies, People, Tests, and Settings */}
                <NavLink
                    className='flex items-center w-50 h-12.5 pl-[19px] hover:rounded-lg hover:bg-nav-active hover:text-white'
                    to="#"
                >
                    Vacancies
                </NavLink>
                <NavLink
                    className='flex items-center w-50 h-12.5 pl-[19px] hover:rounded-lg hover:bg-nav-active hover:text-white'
                    to="#"
                >
                    People
                </NavLink>
                <NavLink
                    className='flex items-center w-50 h-12.5 pl-[19px] hover:rounded-lg hover:bg-nav-active hover:text-white'
                    to="#"
                >
                    Tests
                </NavLink>
                <NavLink
                    className='flex items-center w-50 h-12.5 pl-[19px] hover:rounded-lg hover:bg-nav-active hover:text-white'
                    to="#"
                >
                    Settings
                </NavLink>
            </ul>

            {/* Log out section at the bottom of the sidebar */}
            <span className='pl-4.5 text-[16px] text-nav-text cursor-pointer'>
                Log out
            </span>
        </nav>
    );
}

export default Nav;
