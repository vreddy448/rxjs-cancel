import { combineEpics, ofType } from 'redux-observable';
import { of, Observable,empty } from "rxjs";
import { ajax } from "rxjs/ajax";
import { isEqual } from "lodash";
import { map, mergeMap, catchError, takeUntil, filter  } from "rxjs/operators";
import { sampleActionCreator } from "./action-creators";

const sampleEpic = action$ =>
  action$.pipe(
    ofType("ACTION"),
    map(action => action.payload),
    debounceUntilChanged(2000),
    mergeMap(reqPayload => 
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
          catchError(error => console.log(":: error ocurred at sampleEpic epic :: ", error))
        )
    ),
    catchError(error => console.log(":: error ocurred at sampleEpic epic :: ", error))
  );

  const sampleEpic2 = action$ =>
  action$.pipe(
    ofType("ACTION1"),
    map(action => action.payload),
    mergeMap(payload => 
        ajax.getJSON(
          `https://jsonplaceholder.typicode.com/todos/1`
        ).pipe(
          map(response => {
            return {response, payload};
          })
        )
    ),
    mergeMap((data) => {
        return of(sampleActionCreator(data))
      }
    ),
    catchError(error => console.log(":: error ocurred at createWork epic :: ", error))
  );

  export const debounceUntilChanged = (delay) => {
    return (source) => {
      return new Observable(observer => {
  
        let lastSeen = {};
        let lastSeenTime = 0;
  
        return source
          .pipe(
            mergeMap((value) => {

              const now = Date.now();
              console.log(now, lastSeenTime, now - lastSeenTime);
              if (isEqual(value, lastSeen) && (now - lastSeenTime) < delay ) {
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

export default combineEpics(sampleEpic2, sampleEpic);