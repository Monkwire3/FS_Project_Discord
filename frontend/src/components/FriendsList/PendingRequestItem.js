

function PendingRequestItem({request, incoming}) {
    console.log('request item', request)

    return (
        <div className="friend-request-list-item"><div className="left"><div className="icon"></div><div className="request-content"><div>{request.username}</div><div>{incoming ? 'Incoming' : 'Outgoing'} Friend Request</div></div></div></div>
    )
}

export default PendingRequestItem