import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { CreateDepositCommand } from './commands/create-deposit/create-deposit.command';
import { DepositTransactionsCommand } from './commands/deposit-transactions/deposit-transactions.command';
import { GetDepositByIdQuery } from './queries/getDepositById/get-deposit-by-id.query';
import { TransferTransactionCommand } from './commands/transfer-transactions/transfer-transactions.command';
import { WithdrawalTransactionsCommand } from './commands/withdrawal-transactions/withdrawal-transactions.command';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { DepositTransactionsDto } from './dto/deposit-transactions.dto';
import { TransferTransactionsDto } from './dto/transfer-transactions.dto';
import { WithdrawalTransactionsDto } from './dto/withdrawal-transactions.dto';

@Controller('deposits')
export class DepositController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
    ) {}

  /** Crear una nueva cuenta de deposito */
  @Post()
  async createDeposit(
    @Body() createDepositDto: CreateDepositDto,
  ): Promise<any> {
    return await this.commandBus.execute<CreateDepositCommand, any>(
      new CreateDepositCommand(createDepositDto),
    );
  }

  /** Consignar o depositar en una cuenta dada */
  @Post(':id/deposit-transactions')
  async depositTransaction(
    @Param('id') id: string,
    @Body() depositTransactionDto: DepositTransactionsDto,
  ): Promise<any> {
    return await this.commandBus.execute<DepositTransactionsCommand, any>(
      new DepositTransactionsCommand(depositTransactionDto, id),
    );
  }

  /** Consultar la existencia de una cuenta de depósito por Id */
  @Get(':id')
  async getDepositById(
    @Param('id') id: string,
    @Query() details?: PaginationDto,
  ): Promise<any> {
    return await this.queryBus.execute<GetDepositByIdQuery, any>(
      new GetDepositByIdQuery(id, details),
    );
  }

  /** Retirar de una cuenta dada */
  @Post(':id/withdrawal-transactions')
  async withdrawalTransaction(
    @Param('id') id: string,
    @Body() withdrawalTransactionDto: WithdrawalTransactionsDto,
  ): Promise<any> {
    return await this.commandBus.execute<WithdrawalTransactionsCommand, any>(
      new WithdrawalTransactionsCommand(withdrawalTransactionDto, id),
    );
  }

  @Post(':id/transfer-transactions')
  async transferTransaction(
    @Param('id') id: string,
    @Body() transferTransactionsDto: TransferTransactionsDto,
  ): Promise<any> {
    return await this.commandBus.execute<TransferTransactionCommand, any>(
      new TransferTransactionCommand(id, transferTransactionsDto),
    );
  }
}
