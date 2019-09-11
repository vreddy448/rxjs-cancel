import { batch } from 'react-redux';

export const sampleActionCreator = (response) => ({
    type: 'REDUX_ACTION',
    payload: response
});


export const dummyReduxActionCreator = (response) => ({
    type: 'DUMMY_REDUX_ACTION',
    payload: response
});

export const errorCreator = (msg, error) => ({
    type: 'Error',
    payload: {
        msg, error
    }
});

export const batchDispatch = (actions) => {
    console.log("batchDispatch", actions);
    batch(() => {
        for(var i=0; i < actions.length; i++) {
            // eslint-disable-next-line no-undef
            window.store.dispatch(actions[i])
        }
    })
}

window.batchDispatch = batchDispatch;
