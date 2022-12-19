

function ServerDiscoverItem({server}) {

    const joinServer = () => {
        console.log(server);

    }
    return (
        <div className="server-discover-item">
            <div><div className="title">{server.serverName}</div><div>{`${server.members.length} members`}</div></div>
            <div><button onClick={joinServer}>Join</button></div>

        </div>

    )
}
export default ServerDiscoverItem