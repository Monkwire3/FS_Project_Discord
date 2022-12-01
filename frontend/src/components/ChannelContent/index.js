import './ChannelContent.css';

function ChannelContent() {

    const sendMessage = (e) => {
        e.prevenDefault();
        console.log('sendMessage function')
    }

    return (
        <>
        <div id='chat-box'></div>
        <div id='input-container'>
            <form onSubmit={sendMessage}>
                <input type='text'></input>
            </form>
        </div>
        </>
    )

}

export default ChannelContent;