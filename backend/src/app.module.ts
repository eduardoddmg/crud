import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(), // Para variáveis de ambiente
    TypeOrmModule.forRoot({
      type: 'sqlite', // Usando SQLite para simplicidade
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true, // Somente para desenvolvimento
    }),
    AuthModule,
    ItemsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('items');
  }
}
