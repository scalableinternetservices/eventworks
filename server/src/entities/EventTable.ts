import { BaseEntity, Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import { ChatMessage } from './ChatMessage'
import { Event } from './Event'
import { User } from './User'

@Entity()
export class EventTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @Column('int')
  userCapacity: number

  @OneToMany(() => ChatMessage, msg => msg.event)
  chatMessages: ChatMessage[]

  @ManyToOne(() => User, user => user.headOfTables, { nullable: false })
  head: User

  @RelationId((table: EventTable) => table.head)
  headId: number

  @Index()
  @ManyToOne(() => Event, evt => evt.eventTables, { onDelete: 'CASCADE' })
  event: Event

  @OneToMany(() => User, user => user.table, { nullable: true })
  participants: User[]
}