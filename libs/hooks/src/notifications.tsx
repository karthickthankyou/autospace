import { addNotification, removeNotification } from '@autospace-org/store/utils'

import { useAppDispatch } from '@autospace-org/store'
import {} from '@autospace-org/store/utils'
import { makeId } from '@autospace-org/util'
import { notification$ } from '@autospace-org/util/subjects'
import { useEffect } from 'react'
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  EMPTY,
  map,
  tap,
} from 'rxjs'

export const useNotification = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const subscription = notification$
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        map((v) => ({ ...v, id: makeId(12) })),
        tap((v) => {
          dispatch(addNotification(v))
        }),
        delay(4000),
        tap((v) => {
          dispatch(removeNotification(v.id))
        }),
        catchError((e) => {
          return EMPTY
        }),
      )
      .subscribe()
    return () => {
      subscription.unsubscribe()
    }
  }, [addNotification, removeNotification])
}
