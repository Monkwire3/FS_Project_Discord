import { useSelector } from 'react-redux';

function FriendsListIndexItem({friend}) {
    const sessionUser = useSelector(state => state.session.user);

    const openDirectMessage = () => {
        console.log('open direct message function');
    }


    return (
        <div className="friends-list-index-item">
            <div>{friend.username}</div>
            <div className="icon-group">
                <div className='icon' onClick={openDirectMessage}>
                    <svg viewBox="0 0 24 24">
                        <path fill='#b9bbbe' d='M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z'></path>
                    </svg>
                </div>
                <div className='icon'>
                    <svg viewBox="0 0 24 24">
                        <path fill="#b9bbbe" d='M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z'></path>
                    </svg>
                </div>
            </div>
        </div>
    )

}

export default FriendsListIndexItem;