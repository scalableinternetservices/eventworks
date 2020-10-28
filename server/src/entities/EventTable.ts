import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ChatMessage } from './ChatMessage'
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

  @ManyToOne(() => User, user => user.tables)
  head: EventTable
}