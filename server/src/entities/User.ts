import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { User as GraphqlUser, UserType } from '../graphql/schema.types'
import { ChatMessage } from './ChatMessage'
import { EventTable } from './EventTable'
import { EventUserConfig } from './EventUserConfig'

@Entity()
export class User extends BaseEntity implements GraphqlUser {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
  })
  name: string

  @Column({nullable: true})
  title: string

  @Column({
    length: 100,
  })
  email: string

  @Column({
    length: 100, nullable: true
  })
  linkedinLink: string

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.User,
  })
  userType: UserType

  @Column({
    length: 100,
    nullable: true
  })
  photoLink: string

  @OneToMany(() => EventUserConfig, eventUserConfig => eventUserConfig.user)
  eventUserConfigs: EventUserConfig[]

  @OneToMany(() => ChatMessage, msg => msg.user)
  chatMessages: ChatMessage[]

  @OneToMany(() => EventTable, tbl => tbl.head)
  tables: EventTable[]

  @ManyToOne(() => EventTable, tbl => tbl.participants)
  table: EventTable
}
