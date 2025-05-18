import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { GetEmployeeDto } from './dto/get-employees.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateEmployeeDto) {
    return this.prisma.employee.create({ data });
  }

  async update(data: UpdateEmployeeDto, id: number) {
    return this.prisma.employee.update({
      where: { id },
      data,
    });
  }

  async delete(id: number) {
    return this.prisma.employee.delete({ where: { id } });
  }

  async findAll(dto: GetEmployeeDto) {
    const { pageIndex, pageSize, search, department, title } = dto;
    const whereClause: Prisma.EmployeeWhereInput = {
      OR: search
        ? [
            {
              firstName: {
                contains: search,
              },
            },
            {
              lastName: {
                contains: search,
              },
            },
            {
              email: {
                contains: search,
              },
            },
          ]
        : undefined,

      title: title ? title : undefined,
      department: department ? department : undefined,
    };

    const data = await this.prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
      skip: pageIndex ? pageIndex * pageSize : 0,
      take: pageSize,

      where: whereClause,
    });

    const total = await this.prisma.employee.count({
      where: whereClause,
    });

    return { data, total };
  }
}
