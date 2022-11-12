import './ServerMemberListItem.css';
function ServerMemberListItem({member}) {

    return (
        <div className="server-member-list-item">
                <div className='icon'>

                </div>
                {member.username}
        </div>
    )

}

export default ServerMemberListItem