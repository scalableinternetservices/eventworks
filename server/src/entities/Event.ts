import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ChatMessage } from './ChatMessage'
import { EventTable } from './EventTable'
import { EventUserConfig } from './EventUserConfig'

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

  @Column()
  startTime: number

  @Column()
  endTime: number

  @Column('int')
  userCapacity: number

  // deal with this later
  @Column({ default: false })
  isRecurring: boolean

  @OneToMany(() => EventUserConfig, eventUserConfig => eventUserConfig.event)
  eventUserConfigs: EventUserConfig[]

  @OneToMany(() => ChatMessage, msg => msg.event)
  chatMessages: ChatMessage[]

  @OneToMany(() => EventTable, tbl => tbl.event, { nullable: false, eager: true })
  eventTables: EventTable[]
}