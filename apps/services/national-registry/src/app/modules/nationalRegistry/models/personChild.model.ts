import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
} from 'sequelize-typescript'
import { Person } from './person.model'

@Table({
  tableName: 'people_children',
})
export class PersonChild extends Model<PersonChild> {
  @ForeignKey(() => Person)
  @Column({
    type: DataType.CHAR(10),
    primaryKey: true,
  })
  parentId!: string

  @ForeignKey(() => Person)
  @Column({
    type: DataType.CHAR(10),
    primaryKey: true,
  })
  childId!: string

  @CreatedAt
  readonly created!: Date

  @UpdatedAt
  readonly modified!: Date
}
