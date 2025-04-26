import ava from '../assets/avatar.png' // Importing the avatar image

const Header = () => {
    return (
        <header className="flex items-center p-10 justify-between bg-white fixed w-full z-50">
            {/* The header is styled using Tailwind CSS classes:
                - `flex`: creates a flexible layout
                - `items-center`: centers the items vertically
                - `p-10`: adds padding around the header
                - `justify-between`: spaces out the child elements evenly (left and right)
                - `bg-white`: sets the background color to white
                - `fixed`: makes the header fixed at the top of the page
                - `w-full`: makes the header take up the full width
                - `z-50`: sets a high z-index, ensuring it stays on top of other content */}

            <div className='font-black text-2xl'>
                TROOD COMMUNITY
            </div>

            <div className='flex items-center gap-6.5'>
                <div className='flex items-center gap-6'>
                    {/* These are two SVG icons used for notifications or other actions */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                              d="M2.25 5C2.25 4.27065 2.53973 3.57118 3.05546 3.05546C3.57118 2.53973 4.27065 2.25 5 2.25H19C19.7293 2.25 20.4288 2.53973 20.9445 3.05546C21.4603 3.57118 21.75 4.27065 21.75 5V15C21.75 15.7293 21.4603 16.4288 20.9445 16.9445C20.4288 17.4603 19.7293 17.75 19 17.75H7.961C7.581 17.75 7.222 17.923 6.985 18.22L4.655 21.133C3.857 22.129 2.25 21.566 2.25 20.29V5Z"
                              fill="#DBE3E1"
                        />
                    </svg>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12.0001 2C10.1435 2 8.36306 2.7375 7.0503 4.05025C5.73755 5.36301 5.00005 7.14348 5.00005 9V12.528C5.0002 12.6831 4.96425 12.8362 4.89505 12.975L3.17805 16.408C3.09418 16.5757 3.05457 16.7621 3.063 16.9494C3.07143 17.1368 3.1276 17.3188 3.2262 17.4783C3.32479 17.6379 3.46252 17.7695 3.62632 17.8608C3.79011 17.9521 3.97453 18 4.16205 18H19.8381C20.0256 18 20.21 17.9521 20.3738 17.8608C20.5376 17.7695 20.6753 17.6379 20.7739 17.4783C20.8725 17.3188 20.9287 17.1368 20.9371 16.9494C20.9455 16.7621 20.9059 16.5757 20.8221 16.408L19.1061 12.975C19.0365 12.8362 19.0002 12.6832 19.0001 12.528V9C19.0001 7.14348 18.2626 5.36301 16.9498 4.05025C15.637 2.7375 13.8566 2 12.0001 2ZM12.0001 21C11.3794 21.0003 10.7739 20.8081 10.2671 20.4499C9.76022 20.0917 9.37694 19.5852 9.17005 19H14.8301C14.6232 19.5852 14.2399 20.0917 13.733 20.4499C13.2262 20.8081 12.6207 21.0003 12.0001 21Z"
                            fill="#DBE3E1"
                        />
                    </svg>
                </div>
                <div className='flex items-center gap-4'>
                    {/* The user's avatar */}
                    <img className='w-8.5 h-8.5' src={ava} alt="avatar"/>
                    {/* The user's name */}
                    <span className='font-normal text-[16px] text-header-name'>
                        Alex Smith
                    </span>
                </div>
            </div>
        </header>
    );
};

export default Header;
