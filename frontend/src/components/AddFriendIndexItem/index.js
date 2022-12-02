import './AddFriendIndexItem.css';


function AddFriendIndexItem({user}) {

    function sendFriendRequest(friendId) {

    }



    return (
        <div className="add-friend-index-item">
            <div>
                <div>{user.username}</div>
                <div>{user.email}</div>
            </div>
            <div>
                <button onClick={sendFriendRequest(user.id)}>Add Friend</button>
            </div>
        </div>
    )
}

export default AddFriendIndexItem;