import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    description: 'ID сущности',
    type: Number,
    example: 0,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Дата создания сущности',
    type: Date,
    example: new Date(),
  })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления сущности',
    type: Date,
    example: new Date(),
  })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @IsDate()
  updatedAt: Date;
}
