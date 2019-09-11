import React from 'react';
import Action from "../action";
import BatchAction from "../action/batch-actions";
import Display from "../display";
import BatchActionsDisplay from "../display/batch-actions";
import './index.scss';

export default class Container extends React.Component {

    render() {
        return(
            <div>
                <div className="m-3">
                    <label className="ml-4 section-header">
                        <span className="rxjs-label">1. </span>
                        <span><img src="https://rxjs-dev.firebaseapp.com/generated/images/marketing/home/Rx_Logo-512-512.png" alt="rxjs logo" width="25" height="25" /></span>
                        <span className="rxjs-label">  Debounce and Cancel</span>
                    </label>
                    <div className="row">
                        <div className="col-md-6">
                            <Action />
                        </div>
                    <div className="col-md-6">
                            <Display />
                    </div>
                    </div>
                </div>
                <div className="m-3">
                    <label className="ml-4 section-header">
                        <span className="react-redux-section-label">2. </span>
                        <span className="react-redux-logo"><img  src="https://react-redux.js.org/img/redux_white.svg" alt="React Redux"/></span>
                        <span className="react-redux-section-label">  Batch Actions</span>
                    </label>
                    <div className="row">
                        <div className="col-md-6">
                            <BatchAction />
                        </div>
                    <div className="col-md-6">
                            <BatchActionsDisplay />
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}