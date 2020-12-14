import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: "staff" 
})
export class Staff {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  staffId: number;

  @ApiProperty()
  @Column({ name: "first_name" })
  firstName: string;

  @ApiProperty()
  @Column({ name: "last_name" })
  lastName: string;

  @ApiProperty()
  @Column({ name: "address_id" })
  addressId: number;

  @ApiResponseProperty()
  @Column({ name: "picture" })
  picture: Blob;

  @ApiProperty()
  @Column({ name: "email" })
  email: string;

  @ApiProperty()
  @Column({ name: "store_id" })
  storeId: number;

  @ApiResponseProperty()
  @Column({ name: "active" })
  active: boolean;

  @ApiProperty()
  @Column({ name: "username" })
  username: string;

  @Column({ name: "password" })
  @Exclude()
  password: string;

  @ApiResponseProperty()
  @Column({ name: "last_update" })
  lastUpdate: Date;
}