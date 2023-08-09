import { NotificationType } from '@autospace-org/types'
import { Subject } from 'rxjs'

export const notification$ = new Subject<Omit<NotificationType, 'id'>>()
