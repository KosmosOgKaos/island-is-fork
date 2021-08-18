import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript'

@Table({
  tableName: 'unions',
})
export class Union extends Model<Union> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty()
  unionId!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  active!: boolean

  @ApiProperty()
  @CreatedAt
  readonly created!: Date

  @ApiProperty()
  @UpdatedAt
  readonly modified!: Date
}
