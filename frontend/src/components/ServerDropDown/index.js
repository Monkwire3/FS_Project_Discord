import React, { useEffect } from "react";
import './ServerDropDown.css';
import * as serverActions from '../../store/servers';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditServerFormModal from "../EditServerFormModal";
import EditServerForm from "../EditServerForm";
import CreateChannelFormModal from "../CreateChannelModal";
import { flushSync } from "react-dom";


function ServerDropDown({serverId, setShowModal, onClose}) {
    const dispatch = useDispatch();
    const id = serverId
    const server = useSelector(serverActions.getServer(id))
    const history = useHistory();




    useEffect(() => {
        dispatch(serverActions.fetchServer(id))
    }, [])




    function handleDeleteServer() {
        dispatch(serverActions.deleteServer(id))
        history.push(`@me`)
    }


    return (
        <div id='dropDownContainer'>
            <div className="dropDownGroup">
                <CreateChannelFormModal server={server} menuItem={true} />
            </div>
            <div className="dropDownGroup">
            </div>
            <div className="dropDownGroup">
            </div>
            <div className="dropDownGroup">
               <div className="dropDownItem">
                    <EditServerFormModal server={server} /></div>
            </div>
            <div className="dropDownGroupEnd">
                <div onClick={handleDeleteServer} className="dropDownItem">Delete Server</div>
            </div>
            </div>
    )

}

export default ServerDropDown;