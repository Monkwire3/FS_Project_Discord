import DirectMessagesMain from "../DirectMessagesMain";
import MeLeftBar from "../MeLeftBar";
import ServerIndex from "../ServerIndex";


function DirectMessagesFull() {
    return (
        <>
        <ServerIndex />
        <MeLeftBar />
        <DirectMessagesMain />
        </>
    )
}

export default DirectMessagesFull;