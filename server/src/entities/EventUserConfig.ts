import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
//import { EventUserPerm } from '../graphql/schema.types'
import { Event } from './Event'
import { User } from './User'

@Entity()
export class EventUserConfig extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.eventUserConfigs)
  user: User

  @ManyToOne(() => Event, event => event.eventUserConfigs)
  event: Event

  @Column({
    type: 'enum',
    //enum: EventUserPerm,
    //default: EventUserPerm.Attendee,
  })
  //userType: EventUserPerm

  // only applies if they are a table lead
  @Column('int')
  tableNumber: number
}
