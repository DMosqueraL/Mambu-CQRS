import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AxiosAdapter } from "src/common/adapters/axios.adapter";
import { getHeaders } from "src/common/helpers/get-headers-helper";
import { CreateDepositCommand } from './create-deposit.command';

@CommandHandler(CreateDepositCommand)
export class CreateDepositHandler implements ICommandHandler<CreateDepositCommand>{
    
    constructor(
        private readonly config: ConfigService,
        private readonly httpAxios: AxiosAdapter
    ){}

    async execute(command: CreateDepositCommand): Promise<any> {

        const logger = new Logger('CreateDeposit');
        
        const {createDepositDto} = command;

        const headers = getHeaders(this.config);

        const data = await this.httpAxios.post<any>(
            this.config.get('urlDeposits'),
            createDepositDto,
            {
                headers,
                baseURL: this.config.get('baseUrl')
            }
        );
        logger.log(
            `Deposit Account with ${data.id} created.`
        )
        return data;
    }
    
}