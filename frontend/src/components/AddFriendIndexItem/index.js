import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { sendFriendRequest } from '../../store/users';
import './AddFriendIndexItem.css';


function AddFriendIndexItem({user}) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState('Add Friend')

    function requestFriend(requestee_id) {
        dispatch(sendFriendRequest({requester_id: sessionUser.id, requestee_id: requestee_id}));
        setButtonText('Pending')
    }



    return (
        <div className="add-friend-index-item">
            {sessionUser ? '' : <Redirect to='/login' />}
            <div>
                <div>{user.username}</div>
                <div>{user.email}</div>
            </div>
            <div>
                <button onClick={() => requestFriend(user.id)}>{buttonText}</button>
            </div>
        </div>
    )
}

export default AddFriendIndexItem;