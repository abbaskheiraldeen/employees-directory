import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GetEmployeeDto } from './dto/get-employees.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    await this.employeeService.create(createEmployeeDto);
    return { message: 'Employee created successfully' };
  }
  @Get()
  findAll(@Query() dto: GetEmployeeDto) {
    return this.employeeService.findAll(dto);
  }

  @Patch(':id')
  async update(
    @Body() updateEmployeeDto: UpdateEmployeeDto,
    @Param('id') id: number,
  ) {
    await this.employeeService.update(updateEmployeeDto, id);
    return { message: 'Employee updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.employeeService.delete(id);
    return { message: 'Employee deleted successfully' };
  }
}
