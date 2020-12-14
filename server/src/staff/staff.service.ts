import { InjectRepository } from "@nestjs/typeorm";
import { Staff } from "src/common/entities/staff.entity";
import { Repository } from "typeorm";

export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  findOneById(id: number) {
    return this.staffRepository.findOne({
      staffId: id,
      active: true
    });
  }

  findOneByUsername(username: string) {
    return this.staffRepository.findOne({
      username,
      active: true
    });
  }
}