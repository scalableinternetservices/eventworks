import DataLoader from "dataloader"
import { ChatMessage } from '../entities/ChatMessage'
import { Event } from '../entities/Event'
import { EventTable } from '../entities/EventTable'
import { User } from '../entities/User'

export const createChatMessageLoader = () => new DataLoader<number, ChatMessage>(async chatKeys => {
  const chatMessages = await ChatMessage.findByIds(chatKeys as number[])
  const chatIdMap: Record<number, ChatMessage> = {}
  chatMessages.forEach(msg => { chatIdMap[msg.id] = msg })
  return chatKeys.map(id => chatIdMap[id])
})

export const createUserLoader = () => new DataLoader<number, User>(async userKeys => {
  const users = await User.findByIds(userKeys as number[])
  const userIdMap: Record<number, User> = {}
  users.forEach(user => { userIdMap[user.id] = user })
  return userKeys.map(id => userIdMap[id])
})

export const createTableLoader = () => new DataLoader<number, EventTable>(async tableKeys => {
  const tables = await EventTable.findByIds(tableKeys as number[])
  const tableIdMap: Record<number, EventTable> = {}
  tables.forEach(table => { tableIdMap[table.id] = table })
  return tableKeys.map(id => tableIdMap[id])
})

export const createEventLoader = () => new DataLoader<number, Event>(async eventKeys => {
  const events = await Event.findByIds(eventKeys as number[])
  const eventIdMap: Record<number, Event> = {}
  events.forEach(event => { eventIdMap[event.id] = event })
  return eventKeys.map(id => eventIdMap[id])
})