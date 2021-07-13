import { TicketDomain } from "../domain/ticket.domain";
import { GetAllParams, TicketRepo } from "./ticket.repo";
import { Injectable } from "@nestjs/common";
import { JsonDB } from 'node-json-db';
import { Ticket } from "../domain/ticket";

@Injectable()
export class TicketJsonDbRepo implements TicketRepo {
    private readonly path = '/tickets'

    constructor(private db: JsonDB) { }

    getOne(id: number): TicketDomain {
        const index = this.db.getIndex(this.path, id)
        if (index < 0) {
            return null
        }

        const ticket = this.db.getObject<Ticket>(this.path + '/' + index)
        if (!ticket) {
            return null
        }

        return new TicketDomain().loadTicket(ticket)
    }

    getAll(param: GetAllParams): TicketDomain[] {
        let tickets: Ticket[] = this.db.getData(this.path)

        if (param.status) {
            tickets = tickets.filter(a => a.status === param.status);
        }

        return tickets
            .sort((a, b) => {
                if (a.status === b.status) {
                    return a.updated_at - b.updated_at
                }

                if (a.status < b.status) {
                    return -1
                }

                return 1
            })
            .map(ticket => new TicketDomain().loadTicket(ticket))
    }

    create(domain: TicketDomain): TicketDomain {
        this.db.push(this.path + '[]', domain.toModelForSave(), true)

        return domain
    }

    update(domain: TicketDomain): TicketDomain {
        const index = this.db.getIndex(this.path, domain.getId())
        if (index < 0) {
            return null
        }
        this.db.push(this.path + '/' + index, domain.toModelForSave(), true)

        return domain
    }
}