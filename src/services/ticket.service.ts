import { Injectable } from "@nestjs/common";
import { CreateTicketModel, TicketModel, UpdateTicketModel } from "src/domain/ticket";
import { TicketDomain } from "src/domain/ticket.domain";
import { GetAllParams, TicketRepo } from "src/repositories/ticket.repo";

@Injectable()
export class TicketService {
    constructor(private ticketRepo: TicketRepo) { }

    getById(id: number): TicketModel {
        const ticket = this.ticketRepo.getOne(id)
        if (!ticket) {
            return null
        }

        return ticket.toModel()
    }

    // List and sort tickets by status, latest update, and can filter tickets using status.
    getAll(params: GetAllParams): TicketModel[] {
        const tickets = this.ticketRepo.getAll(params)

        return tickets.map(ticket => ticket.toModel())
    }

    create(model: CreateTicketModel): TicketModel {
        const ticket = new TicketDomain()
        ticket.create(model)
        this.ticketRepo.create(ticket)
        if (!ticket) {
            return null
        }

        return ticket.toModel()
    }

    update(id: number, model: UpdateTicketModel): TicketModel {
        const ticket = this.ticketRepo.getOne(id)
        ticket.update(model)
        this.ticketRepo.update(ticket)
        if (!ticket) {
            return null
        }

        return ticket.toModel()
    }
}