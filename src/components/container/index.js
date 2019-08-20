import React from 'react';
import Action from "../action";
import Display from "../display";
import './index.scss';

export default class Container extends React.Component {

    render() {
        return(
            <div className="m-3">
                <div className="row">
                    <div className="col-md-6">
                        <Action />
                    </div>
                   <div className="col-md-6">
                        <Display />
                   </div>
                </div>
            </div>
        )
    }
}