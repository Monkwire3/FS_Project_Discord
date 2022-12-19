import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { acceptFriendRequest, removeFriend } from "../../store/users";


function PendingRequestItem({request}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const incoming = request.requester.id == sessionUser.id


    const cancelRequest = () => {
        dispatch(removeFriend({id_a: sessionUser.id, id_b: request.requester.id}));
    }

    const acceptRequest = () => {
        dispatch(acceptFriendRequest({requester_id: request.requester.id, requestee_id: sessionUser.id }));
    }

    return (
        <div className="friend-request-list-item"><div className="left"><div className="icon"></div><div className="request-content"><div>{incoming ? request.requestee.username : request.requester.username}</div><div className="request-description">{incoming ? 'Incoming' : 'Outgoing'} Friend Request</div></div></div>
        <div className="right">
        {incoming ? <div className="accept-request-button request-button" onClick={acceptRequest}>
            <svg viewBox="0 0 24 24">
                <path d="M8.99991 16.17L4.82991 12L3.40991 13.41L8.99991 19L20.9999 7.00003L19.5899 5.59003L8.99991 16.17Z"></path>
            </svg>
        </div> : ''}
        <div className="cancel-request-button request-button">
            <svg viewBox="0 0 24 24" onClick={cancelRequest}>
            <path d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
            </svg>
        </div>
        </div></div>
    )
}

export default PendingRequestItem