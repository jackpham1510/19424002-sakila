import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "customer" 
})
export class Customer {
  @ApiResponseProperty()
  @PrimaryGeneratedColumn()
  customerId: number;

  @ApiProperty()
  @Column({ name: "store_id" })
  storeId: number;

  @ApiProperty()
  @Column({ name: "first_name" })
  firstName: string;

  @ApiProperty()
  @Column({ name: "last_name" })
  lastName: string;

  @ApiProperty()
  @Column({ name: "email" })
  email: string;

  @ApiProperty()
  @Column({ name: "address_id" })
  addressId: number;

  @ApiResponseProperty()
  @Column({ name: "active" })
  active: boolean;

  @ApiResponseProperty()
  @Column({ name: "create_date" })
  createDate: Date;

  @ApiResponseProperty()
  @Column({ name: "last_update" })
  lastUpdate: Date;
}