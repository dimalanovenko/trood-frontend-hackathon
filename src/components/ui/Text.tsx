interface TextProps {
    text: string;
}

const Text = ({text}: TextProps) => {
    return (
        <span className='font-normal text-lg text-black'>
            {text}
        </span>
    )
}

export default Text