import { useSelector } from "react-redux";
import DirectMessagesMain from "../DirectMessagesMain";
import MeLeftBar from "../MeLeftBar";
import ServerIndex from "../ServerIndex";
import { Redirect } from "react-router-dom";
import './DirectMessagesFull.css'


function DirectMessagesFull({cable}) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
        {sessionUser ? '' : <Redirect to='/login' />}
        <ServerIndex />
        <MeLeftBar />
        <DirectMessagesMain cable={cable} />
        </>
    )
}

export default DirectMessagesFull;