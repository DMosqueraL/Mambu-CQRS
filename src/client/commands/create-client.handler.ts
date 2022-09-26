import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { getHeaders } from 'src/common/helpers/get-headers-helper';
import { CreateClientCommand } from './create-cliente.command';

@CommandHandler(CreateClientCommand)
export class CreateClientHandler implements ICommandHandler {
  constructor(
    private readonly config: ConfigService,
    private readonly httpAxios: AxiosAdapter,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateClientCommand): Promise<any> {
    /**
     * Logs para la creación de un nuevo cliente.
     */
    const logger = new Logger(CreateClientHandler.name);
    logger.log('Creating a new client...');

    const { createClientDto } = command;
    /**
     * Obtener los Headers
     */
    const headers = getHeaders(this.config);
    
    /**
     * Consumir la Api de Mambu - Crear Cliente
     */
    const data = await this.httpAxios.post<any>(
      this.config.get('urlClients'),
      createClientDto,
      {
        headers,
        baseURL: this.config.get('baseUrl'),
      },
    );
    logger.log(
      `Client: ${data.firstName} ${data.lastName} with Id: ${data.id} created.`)
    return data;
  }
}
