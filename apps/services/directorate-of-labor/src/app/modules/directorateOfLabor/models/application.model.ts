import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  DataType,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript'
import { PensionFund } from './pensionFund.model'
import { Union } from './union.model'

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

  @ForeignKey(() => Union)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  unionId!: string

  @BelongsTo(() => Union)
  union!: Union

  @ForeignKey(() => PensionFund)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  pensionFundId!: string

  @BelongsTo(() => PensionFund, 'pensionFundId')
  pensionFund!: PensionFund

  @ForeignKey(() => PensionFund)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  privatePensionFundId!: string

  @BelongsTo(() => PensionFund, 'privatePensionFundId')
  privatePensionFund!: PensionFund

  @ApiProperty()
  @CreatedAt
  readonly created!: Date

  @ApiProperty()
  @UpdatedAt
  readonly modified!: Date
}
