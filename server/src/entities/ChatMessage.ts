import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Event } from './Event'
import { EventTable } from './EventTable'
import { User } from './User'

@Entity()
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.chatMessages, { eager: true })
  user: User

  @Column({
    length: 500
  })
  message: string

  @UpdateDateColumn()
  timeSent: Date

  @ManyToOne(() => Event, event => event.chatMessages)
  event: Event

  @ManyToOne(() => EventTable, tbl => tbl.chatMessages)
  table: EventTable
}