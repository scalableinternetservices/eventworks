import { LessThan } from 'typeorm'
import { Event } from '../entities/Event'

const DAY_MS = 86400000

export async function deleteOldEvents() {
  const deletedInfo = await Event.delete({ endTime: LessThan(new Date(new Date().getTime() - DAY_MS)) })
  console.log(`${deletedInfo.affected} old events removed.`)
}

export const DELETE_OLD_EVENTS_MS = DAY_MS