import React from "react";
import './ServerDropDown.css';
import * as serverActions from '../../store/servers';
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


function ServerDropDown() {
    const dispatch = useDispatch();
    const { id } = useParams();


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
               <a href={`/servers/${id}/edit`}> <div className="dropDownItem">Edit Server</div></a>
            </div>
            <div className="dropDownGroupEnd">
                <div onClick={handleDeleteServer} className="dropDownItem">Delete Server</div>
            </div>
            </div>
    )

}

export default ServerDropDown;