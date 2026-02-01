import { Module } from '@nestjs/common';
import { PostgresqlModule } from '../database-modules/postgresql/postgresql.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PostgresqlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
