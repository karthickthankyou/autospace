import { Subject } from 'rxjs'
import { NotificationType } from '@autospace-org/types'

export const notification$ = new Subject<Omit<NotificationType, 'id'>>()
