import { BaseEntity, Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from 'typeorm'
import { ChatMessage } from './ChatMessage'
import { EventTable } from './EventTable'
import { EventUserConfig } from './EventUserConfig'
import { User } from './User'

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string

  @Column()
  orgName: string

  @UpdateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({ type: 'timestamp' })
  startTime: Date

  @Column({ type: 'timestamp' })
  endTime: Date

  @Column('int')
  userCapacity: number

  // deal with this later
  @Column({ default: false })
  isRecurring: boolean

  @Index()
  @ManyToOne(() => User, user => user.hostedEvents)
  host: User

  @RelationId((event: Event) => event.host)
  hostId: number

  @OneToMany(() => EventUserConfig, eventUserConfig => eventUserConfig.event)
  eventUserConfigs: EventUserConfig[]

  @OneToMany(() => ChatMessage, msg => msg.event)
  chatMessages: ChatMessage[]

  @OneToMany(() => EventTable, tbl => tbl.event, { nullable: false })
  eventTables: EventTable[]
}