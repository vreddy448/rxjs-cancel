import React from 'react';
import { connect } from 'react-redux';
import './index.scss';

class BatchActionsDisplay extends React.Component {

    constructor(props) {
        super(props);
        window.colors = ['#009AD7', '#002856', '#FF540A', '#FEC10D', '#E81159',
        '#A32200', '#1FB580', '#74378B', '#8ED1EB', '#A5C247'];
    }
    
    static getDerivedStateFromProps(props, state) {
        createLabel("getDerivedStateFromProps", 1);
    }

    shouldComponentUpdate(nextProps, nextState) {
        createLabel("shouldComponentUpdate", 2);
        return true;
    } 

    getSnapshotBeforeUpdate(prevProps, prevState) {
        createLabel("getSnapshotBeforeUpdate", 3);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        createLabel("componentDidUpdate", 4, true);
    }

    render() {
        
        createLabel("render", 5);
        let { batchData } = this.props;

        console.log(batchData);

        return (
            <div className="m-3 card p-3" id="batchData">
                
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        batchData: state.app.batchData,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    }
}

export const createLabel = (text, color, flag) => {
    
    let element = document.createElement("label");
    element.innerHTML = text;
    element.style.backgroundColor = window.colors[color];
    element.style.color = "#FFFFFF";
    element.style.maxWidth = "max-content"

    if(document.getElementById("batchData")) {
        var batchData = document.getElementById("batchData");
        batchData.appendChild(element);
    } else {
        if(window.batchActionsDOM) {
            window.batchActionsDOM.push(element);
        } else {
            window.batchActionsDOM = [element];
        }
    }

    if(false) {
        for(var i=0; i < window.batchActionsDOM.length; i++) {
            var batchDataElement = document.getElementById("batchData");
            batchDataElement.appendChild(window.batchActionsDOM[i]);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BatchActionsDisplay);
