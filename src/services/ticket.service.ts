import { Injectable } from "@nestjs/common";
import { CreateTicketModel, TicketModel, UpdateTicketModel } from "../domain/ticket";
import { TicketDomain } from "../domain/ticket.domain";
import { GetAllParams, TicketRepo } from "../repositories/ticket.repo";

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

        return ticket.toModel()
    }

    update(id: number, model: UpdateTicketModel): TicketModel {
        const ticket = this.ticketRepo.getOne(id)
        if (!ticket) {
            throw new Error("ticket not found");
        }

        ticket.update(model)
        this.ticketRepo.update(ticket)
        if (!ticket) {
            return null
        }

        return ticket.toModel()
    }
}