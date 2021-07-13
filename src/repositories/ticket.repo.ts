import { ApiProperty } from "@nestjs/swagger";
import { TicketStatus } from "../domain/ticket";
import { TicketDomain } from "../domain/ticket.domain";

export class GetAllParams {
    @ApiProperty({ enum: ["pending", "accepted", "resolved", "rejected"] })
    status?: TicketStatus
}

export abstract class TicketRepo {
    abstract getOne(id: number): TicketDomain
    abstract getAll(param: GetAllParams): TicketDomain[]
    abstract create(domain: TicketDomain): TicketDomain
    abstract update(domain: TicketDomain): TicketDomain
}