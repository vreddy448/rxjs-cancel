import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

class Display extends React.Component {

    render() {
        
        let { reqPayload, response } = this.props;
        reqPayload && console.log(reqPayload.id)

        return(
            <div className="m-3 card">
                <div className="card-body">
                    <div className="mb-3 font-weight-bolder">
                        { reqPayload && reqPayload.id }
                    </div>
                    <div className="font-weight-bolder">
                        {JSON.stringify(response)}
                    </div>
               </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        reqPayload: state.app.reqPayload,
        response: state.app.response
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);
