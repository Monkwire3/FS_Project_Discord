import { useSelector } from 'react-redux';

function FriendsList() {
    const friends = useSelector(state => state.session.user.friends);


    const friendsList = friends.map((friend) => <div className='friends-list-item'>{friend.username}</div>)
    return (
        <div id='friends-list'>
            {friends ? friendsList : ''}
        </div>
    )

}

export default FriendsList;