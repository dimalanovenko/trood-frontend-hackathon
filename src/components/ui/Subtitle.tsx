interface SubtitleProps {
    text: string;
}

const Subtitle = ({text}: SubtitleProps) => {
    return (
        <h2 className='font-medium text-2xl text-black'>
            {text}
        </h2>
    )
}

export default Subtitle
