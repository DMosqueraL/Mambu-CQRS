import {
  Injectable,
  Logger,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { QueryBus } from '@nestjs/cqrs';

import { Deposit } from '../models/deposit.entity';
import { GetDepositByIdQuery } from '../queries/getDepositById/get-deposit-by-id.query';

@Injectable()
export class ActiveApprovedMiddleware implements NestMiddleware {
  constructor(private readonly queryBus: QueryBus) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('Middleware');

    const deposit = await this.queryBus.execute<GetDepositByIdQuery, Deposit>(
      new GetDepositByIdQuery(req.params.id),
    );

    if (
      deposit.accountState === 'APPROVED' ||
      deposit.accountState === 'ACTIVE'
    ) {
      next();
    } else {
      logger.log(
        `The Deposit Account with Id: ${req.params.id} must be APPROVED or ACTIVE for to do transactions.`,
      );
      throw new NotFoundException(
        'This Deposit Account must be APPROVED or ACTIVE for to do transactions.',
      );
    }
    next();
  }
}
