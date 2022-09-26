import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from 'src/common/common.module';
import { ClientController } from './client.controller';
import { CreateClientHandler } from './commands/create-client.handler';
import { GetClientsHandler } from './queries/get-all-clients/get-clients.handler';
import { GetClientByIdHandler } from './queries/get-client-by-id/get-client-by-id.handler';

@Module({
  imports: [CommonModule, CqrsModule],
  controllers: [ClientController],
  providers: [
    CreateClientHandler, 
    GetClientsHandler,
    GetClientByIdHandler
  ]
})
export class ClientModule {}
