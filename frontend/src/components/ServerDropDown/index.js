import React from "react";
import './ServerDropDown.css';
import * as serverActions from '../../store/servers';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditServerFormModal from "../EditServerFormModal";
import EditServerForm from "../EditServerForm";


function ServerDropDown() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const server = useSelector(serverActions.getServer(id))




    function handleDeleteServer() {
        dispatch(serverActions.deleteServer(id))
    }


    return (
        <div id='dropDownContainer'>
            <div className="dropDownGroup">
                <div className="dropDownItem">Spacer</div>
                <div className="dropDownItem">Add Channel</div>
            </div>
            <div className="dropDownGroup">
                <div className="dropDownItem">Spacer</div>
            </div>
            <div className="dropDownGroup">
                <div className="dropDownItem">Spacer</div>
                <div className="dropDownItem">Spacer</div>
            </div>
            <div className="dropDownGroup">
        
               <div className="dropDownItem">        <EditServerFormModal server={server} /></div>
            </div>
            <div className="dropDownGroupEnd">
                <div onClick={handleDeleteServer} className="dropDownItem">Delete Server</div>
            </div>
            </div>
    )

}

export default ServerDropDown;