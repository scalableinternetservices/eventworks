import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm'
import { Event } from './Event'
import { EventTable } from './EventTable'
import { User } from './User'

@Entity()
export class ChatMessage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.chatMessages)
  user: User

  @RelationId((msg: ChatMessage) => msg.user)
  userId: number

  @Column({
    length: 500
  })
  message: string

  @Index()
  @UpdateDateColumn()
  timeSent: Date

  @Index()
  @ManyToOne(() => Event, event => event.chatMessages, { onDelete: 'CASCADE' })
  event: Event

  @Index()
  @ManyToOne(() => EventTable, tbl => tbl.chatMessages, { onDelete: 'CASCADE' })
  table: EventTable

  @RelationId((msg: ChatMessage) => msg.table)
  tableId: number
}