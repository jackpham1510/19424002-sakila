import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    CustomerModule,
    StaffModule,
    AuthModule
  ]
})
export class AppModule {}
