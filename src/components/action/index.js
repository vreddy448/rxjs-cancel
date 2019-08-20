import React from 'react';
import './index.scss';

export default class Action extends React.Component {

    render() {
        return(
            <div className="m-3 card">
                <div className="card-body">
                    <div className="row my-3">
                        <div className="col-md-4">
                            <button type="button" className="btn btn-primary" onClick={() => window.store.dispatch({type: 'ACTION', payload: {id: "1"}})}>Action 1</button>
                        </div>
                        <div className="col-md-8">
                            <button type="button" className="btn btn-secondary" onClick={() => window.store.dispatch({type: 'CANCEL_ACTION', payload: {id: "1", cancel: true}})}>Cancel Action 1</button>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-4">
                            <button type="button" className="btn btn-primary" onClick={() => window.store.dispatch({type: 'ACTION', payload: {id: "2"}})}>Action 2</button>
                        </div>
                        <div className="col-md-8">
                            <button type="button" className="btn btn-secondary" onClick={() => window.store.dispatch({type: 'CANCEL_ACTION', payload: {id: "2", cancel: true}})}>Cancel Action 2</button>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-4">
                            <button type="button" className="btn btn-primary" onClick={() => window.store.dispatch({type: 'ACTION', payload: {id: "3"}})}>Action 3</button>
                        </div>
                        <div className="col-md-8">
                            <button type="button" className="btn btn-secondary" onClick={() => window.store.dispatch({type: 'CANCEL_ACTION', payload: {id: "3", cancel: true}})}>Cancel Action 3</button>
                        </div>
                    </div>
               </div>
            </div>
        )
    }
}
