import { CreateClientDto } from '../dto/create-client.dto';


export class CreateClientCommand {
    constructor(
        public readonly createClientDto: CreateClientDto
    ){}
}