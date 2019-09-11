import { combineEpics, ofType } from 'redux-observable';
import { of, Observable, empty, from } from "rxjs";
import { ajax } from "rxjs/ajax";
import { isEqual } from "lodash";
import { map, mergeMap, concatMap, catchError, takeUntil, filter } from "rxjs/operators";
import { sampleActionCreator, errorCreator, dummyReduxActionCreator } from "./action-creators";
import { fetch, getCancelTokenSource } from "../axios-service.js";

const sampleEpic = action$ =>
  action$.pipe(
    ofType("ACTION"),
    map(action => action.payload),
    dynamicMap(true)(reqPayload => 
        ajax.getJSON(
          `https://jsonplaceholder.typicode.com/todos/` + reqPayload.id
        ).pipe(
          map(response => {
            return sampleActionCreator({ response, reqPayload })
          }),
          takeUntil(action$.pipe(
            ofType("CANCEL_ACTION"),
            filter(cancelRequest => {
              if(cancelRequest.payload.id === reqPayload.id) {
                return cancelRequest.payload.cancel
              }
            })
          )),
          logAndCatchError("abc")
        )
    ),
    catchError(error => console.log(":: error ocurred at sampleEpic epic :: ", error))
  );

  const dummyActionEpic = action$ =>
  action$.pipe(
    ofType("DUMMY_ACTION"),
    map(action => action.payload),
    dynamicMap(true)(reqPayload => 
        ajax.getJSON(
          `https://jsonplaceholder.typicode.com/todos/1`
        ).pipe(
          map(response => {
            return dummyReduxActionCreator(response)
          })
        )
    ),
    catchError(error => console.log(":: error ocurred at dummyActionEpic epic :: ", error))
  );

  const sampleEpic2 = action$ =>
  action$.pipe(
    ofType("ACTION1"),
    debounceUntilChanged(2000),
    map(action => {
      return {...action.payload, signal: getCancelTokenSource()}
    }),
    mergeMap(reqPayload => 
        from(fetch("https://jsonplaceholder.typicode.com/todos/" + reqPayload.id, 
          { signal : reqPayload.signal.token,  method : "GET", }
        )).pipe(
          map(response => {
            return sampleActionCreator({ response, reqPayload });
          }),
          cancelRequestUntil(action$, reqPayload, (x, y) => { console.log(x, y); if(x === 1) return true })
        )
    ),
    catchError(error => console.log(":: error ocurred at createWork epic :: ", error))
  );

  export const debounceUntilChanged = (delay, comparator) => {
    return (source) => {
      return new Observable(observer => {
  
        let lastSeen = {};
        let lastSeenTime = 0;
  
        return source
          .pipe(
            mergeMap((value) => {

              const now = Date.now();
              var _comparator;
              if(comparator) {
                _comparator = comparator;
              } else {
                _comparator = isEqual;
              }

              if (_comparator(value, lastSeen) && (now - lastSeenTime) < delay ) {
                return empty();
              } else {
                lastSeen = value;
                lastSeenTime = now;
                return of(value);
              }
            })
          )
          .subscribe(observer);
      });
    };
  }

  export const logAndCatchError = (msg) => catchError(error => {
    console.error(msg)
    return of(errorCreator(msg, error));
  })

  
  export const cancelRequestUntil = (action$, reqPayload, comparator) => 
    takeUntil(
      action$.pipe(
        ofType("CANCEL_ACTION"),
        filter(cancelRequest => {
          if(comparator(cancelRequest, reqPayload)) {
            reqPayload.signal.cancel("cancel");
            return true
          }
        })
      )
    )
   
  const dynamicMap = (isParallel) => {
    if(isParallel) {
      return mergeMap;
    } else {
      return concatMap;
    }
  }

export default combineEpics(sampleEpic2, sampleEpic, dummyActionEpic);