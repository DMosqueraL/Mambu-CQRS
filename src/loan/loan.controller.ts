import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApproveLoanCommand } from './commands/approve-loan/approve-loan.command';

import { CreateLoanCommand } from './commands/create-loan/create-loan.command';
import { GetLoanByIdQuery } from './queries/get-loan-by-id/get-loan-by-id.query';
import { ApproveLoanDto } from './dto/approve-loan.dto';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoanController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
    ) {}

  /**
   * Crear un crédito-préstamo
   * @param createLoanDto
   * @returns
   */
  @Post()
  async createLoan(@Body() createLoanDto: CreateLoanDto) {    
    return await this.commandBus.execute<CreateLoanCommand, any>(
      new CreateLoanCommand(createLoanDto),
    );
  }

  /**Aprobar crédito-préstamo */
  @Post(':id')
  async approveLoan(@Body() approveLoanDto: ApproveLoanDto, @Param('id') id:string): Promise<any> {
    return await this.commandBus.execute<ApproveLoanCommand, any>(
      new ApproveLoanCommand(approveLoanDto, id),
    );
  }

  /**Obtener por id del préstamo-crédito */
  @Get(':id')
  async getLoanById(@Param('id') id:string, @Query() details?: PaginationDto):Promise<any>{
    return await this.queryBus.execute<GetLoanByIdQuery, any>(
      new GetLoanByIdQuery(id, details)
    )
  }
  
}
