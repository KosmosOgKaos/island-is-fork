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
  tableName: 'applications',
})
export class Application extends Model<Application> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  @ApiProperty()
  applicationId!: string

  @ApiProperty()
  @Column({
    type: DataType.CHAR(10),
    allowNull: false,
  })
  nationalId!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  secretWord!: string

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  getPaperCopy!: boolean

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  employmentStatus!: string

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  employmentRatio!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bank!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  pensionFund!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  union!: string

  @ApiProperty()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  privatePensionFund!: string

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  pensionFundPercentage!: number

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  personalTaxCreditRatio!: number

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  personalTaxCreditMonthlyAmount!: number

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  monthlyIncome!: number

  @ApiProperty()
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  insurancePayments!: number

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  pensionPayments!: number

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  incomeStepOne!: number

  @ApiProperty()
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  incomeStepTwo!: number

  @ApiProperty()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  onParentalLeave!: boolean

  @ApiProperty()
  @CreatedAt
  readonly created!: Date

  @ApiProperty()
  @UpdatedAt
  readonly modified!: Date
}
