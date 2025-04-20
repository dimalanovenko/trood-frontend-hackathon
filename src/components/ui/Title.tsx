interface TitleProps {
    text: string;
}

const Title = ({text}: TitleProps) => {
    return (
        <h1 className='font-medium text-2xl text-black'>
            {text}
        </h1>
    )
}

export default Title