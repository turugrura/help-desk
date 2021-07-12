import { TicketDomain } from "src/domain/ticket.domain";

export interface GetAllParams {
    status: string
}

export abstract class TicketRepo {
    abstract getOne(id: number): TicketDomain
    abstract getAll(param: GetAllParams): TicketDomain[]
    abstract create(domain: TicketDomain): TicketDomain
    abstract update(domain: TicketDomain): TicketDomain
}