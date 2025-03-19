type MessageProps = {
    type: 'info',
    text: string
} | {
    type: 'message',
    text: string,
    isMine: boolean,
    sender: string,
}

const Message = (props: MessageProps) => {
    const styles = {
        "false": 'border-blue-400',
        "true": 'border-green-400'
    }

    if (props.type === 'message') {
        return (
            <div className={`my-2 w-full px-3 py-1 border-l-2 ${props.isMine ? styles["true"] : styles["false"]}`}>
                <div className={`${props.isMine ? 'text-green-400' : 'text-blue-400'}`}>{props.isMine ? 'Me' : props.sender}</div>
                <div className="break-words">{props.text}</div>
            </div>
        )
    }

    return (
        <div className="w-full text-center my-2">
            {props.text}
        </div>
    )
}

export default Message;