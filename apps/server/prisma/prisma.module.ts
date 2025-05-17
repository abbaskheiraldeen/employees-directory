import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Optional: Makes PrismaService available everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Make it available to other modules
})
export class PrismaModule {}
