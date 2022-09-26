import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AxiosAdapter } from "src/common/adapters/axios.adapter";
import { getHeaders } from "src/common/helpers/get-headers-helper";
import { GetClientsQuery } from './get-clients.query';

@QueryHandler(GetClientsQuery)
export class GetClientsHandler implements IQueryHandler<GetClientsQuery>{

    constructor(
        private readonly config: ConfigService,
        private readonly httpAxios: AxiosAdapter
    ){}

    async execute(query: GetClientsQuery): Promise<any> {

        const logger = new Logger(GetClientsHandler.name)
        /**
         * Obtener los headers
         */
        const headers = getHeaders(this.config);

        /**
         * Obtener los parámetros de la paginación
         */
        const params = query.paginationDto;

        /**
         * Consumir la Api de Mambu - Obtener Todos los clientes
         */
        const data = await this.httpAxios.get<any>(
            this.config.get('urlClients'),
            {
                headers,
                baseURL: this.config.get('baseUrl'),
                params,
            },
        );

        logger.log('Retriving all the clients...')
        return data;

    }
}