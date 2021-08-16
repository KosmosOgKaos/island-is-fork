import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'

@Table({
  tableName: 'people',
})
export class Person extends Model<Person> {
  @ApiProperty()
  @Column({
    type: DataType.CHAR(10),
    primaryKey: true,
  })
  nationalId!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  spouse_id!: string

  // @ApiProperty()
  // @CreatedAt
  // readonly created!: Date
  //
  // @ApiProperty()
  // @UpdatedAt
  // readonly modified!: Date
}
