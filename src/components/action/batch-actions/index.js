import React from 'react';
import './index.scss';

export const clearBatchData = () => {
    var batchDataElement = document.getElementById("batchData");
    if(batchDataElement) {
        batchDataElement.innerHTML = '';
    }
}

export default class BatchAction extends React.Component {

    render() {
        return(
            <div className="m-3 card">
                <div className="card-body">
                    <div className="row my-3">
                        <div className="col-md-12">
                            <button type="button" className="btn btn-primary" onClick={() => 
                                {
                                    window.batchDispatch([{type: 'DUMMY_REDUX_ACTION', payload: "data"}, {type: 'DUMMY_REDUX_ACTION', payload: "data"}, {type: 'DUMMY_REDUX_ACTION', payload: "data"}])
                                }
                            }>Dispatch Multiple Actions via Batch</button>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-12">
                            <button type="button" className="btn btn-primary" onClick={() => {
                                window.store.dispatch({type: 'DUMMY_ACTION'});
                                window.store.dispatch({type: 'DUMMY_ACTION'});
                                window.store.dispatch({type: 'DUMMY_ACTION'});
                            }}>Dispatch Multiple Actions Normally</button>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-md-12">
                            <button type="button" className="btn btn-secondary" onClick={() => clearBatchData()}>Clear Data</button>
                        </div>
                    </div>
               </div>
            </div>
        )
    }
}
