import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './UserSettings.css';


function UserSettings({onClose}) {
    const dispatch = useDispatch();

    const removeUser = () => {
        dispatch(logout())
        
    }



    return (
        <div id='user-settings-container'>
            <div id='user-settings-left'>
                <button onClick={removeUser}>Log Out</button>
            </div>
            <div id='user-settings-right'>
                <div></div>
                <div className='esc-button-container' onClick={onClose}>
                <div className='esc-button-div'>
                    <svg viewBox='0 0 24 24'>
                        <path fill="#b9bbbe" d='M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z'></path>
                    </svg>
                </div>
                <div>ESC</div>
                </div>
            </div>
        </div>
    )

}


export default UserSettings;

