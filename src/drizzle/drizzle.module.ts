import { Global, Module } from '@nestjs/common';
import { DrizzleAsyncProvider, drizzleProvider } from './drizzle.provider';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...drizzleProvider],
  exports: [DrizzleAsyncProvider],
})
export class DrizzleModule {}
