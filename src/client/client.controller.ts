import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { v4 as uuid } from 'uuid';

import { CreateClientCommand } from './commands/create-cliente.command';
import { CreateClientDto } from './dto/create-client.dto';
import { GetClientsQuery } from './queries/get-all-clients/get-clients.query';
import { GetClientByIdQuery } from './queries/get-client-by-id/get-client-by-id.query';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * Crear un cliente
   * @param createClientDto 
   * @returns Cliente Creado
   */
  @Post()
  async createClient(@Body() createClientDto: CreateClientDto): Promise<any> {
    createClientDto._personalizados = { External_ID: uuid() };
    return await this.commandBus.execute<CreateClientCommand, any>(
      new CreateClientCommand(createClientDto),
    );
  }

  /**
   * Obtener todos los clientes
   * @returns Clientes
   */
  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<any> {
    return await this.queryBus.execute<GetClientsQuery, any>(
      new GetClientsQuery(paginationDto),
    );
  }

  /** Consultar un cliente por Id */
  @Get(':id')
  async getDepositById(
    @Param('id') id: string,
    @Query() details?: PaginationDto,
  ): Promise<any> {
    return await this.queryBus.execute<GetClientByIdQuery, any>(
      new GetClientByIdQuery(id, details),
    );
  }
}
