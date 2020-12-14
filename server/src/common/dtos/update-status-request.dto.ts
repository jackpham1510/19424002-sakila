import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { EntityStatus } from "../entities/common/status.entity";

export class UpdateStatusRequest {
  @IsEnum(EntityStatus)
  @ApiProperty()
  status: EntityStatus
}