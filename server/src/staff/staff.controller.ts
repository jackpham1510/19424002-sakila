import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StaffService } from "./staff.service";

@ApiTags("Staff")
@Controller("/staff")
export class StaffController {
  constructor(private staffService: StaffService) {
  }

  
}