import { TicketDomain } from "src/domain/ticket.domain";
import { GetAllParams, TicketRepo } from "./ticket.repo";
import { Injectable } from "@nestjs/common";
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { Ticket } from "src/domain/ticket";

@Injectable()
export class TicketJsonDbRepo implements TicketRepo {
    private db: JsonDB
    private readonly path = '/tickets'

    constructor() {
        this.db = new JsonDB(new Config("myDataBase", true, false, '/'));
    }

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
        const tickets: Ticket[] = this.db.getData(this.path)

        return tickets.map(ticket => new TicketDomain().loadTicket(ticket))
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