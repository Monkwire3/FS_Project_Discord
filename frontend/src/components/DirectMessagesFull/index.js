import DirectMessagesMain from "../DirectMessagesMain";
import MeLeftBar from "../MeLeftBar";
import ServerIndex from "../ServerIndex";
import './DirectMessagesFull.css'


function DirectMessagesFull({cable}) {
    return (
        <>
        <ServerIndex />
        <MeLeftBar />
        <DirectMessagesMain cable={cable} />
        </>
    )
}

export default DirectMessagesFull;