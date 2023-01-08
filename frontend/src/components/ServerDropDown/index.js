import React, { useEffect } from "react";
import './ServerDropDown.css';
import * as serverActions from '../../store/servers';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import EditServerFormModal from "../EditServerFormModal";
import EditServerForm from "../EditServerForm";
import CreateChannelFormModal from "../CreateChannelModal";
import { flushSync } from "react-dom";


function ServerDropDown({server, setShowModal, onClose, setServerChanged}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);




    function handleDeleteServer() {
        dispatch(serverActions.deleteServer(server.id))
        setServerChanged(true)
        history.push(`/@me`)
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
                <div onClick={handleDeleteServer} className="dropDownItem">{server.owner.id === sessionUser.id ? 'Delete Server' : 'Leave Server'}</div>
            </div>
            </div>
    )

}

export default ServerDropDown;