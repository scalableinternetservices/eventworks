import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ChatMessage } from './ChatMessage'
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

  @Column('datetime')
  startTime: Date

  @Column('datetime')
  endTime: Date

  @Column('int')
  userCapacity: string

  // deal with this later
  @Column({ default: false })
  isRecurring: boolean

  @OneToMany(() => EventUserConfig, eventUserConfig => eventUserConfig.event)
  eventUserConfigs: EventUserConfig[]

  @OneToMany(() => ChatMessage, msg => msg.event)
  chatMessages: ChatMessage[]
}