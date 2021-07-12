import { CreateTicketModel, Ticket, TicketModel, TicketStatus, UpdateTicketModel } from "./ticket";

export class TicketDomain {
    private id: number
    private title: string
    private description: string
    private contact_information: string
    private status: TicketStatus
    private created_at: number
    private updated_at: number

    constructor() { }

    getId(): number {
        return this.id
    }

    loadTicket(ticket: Ticket): this {
        this.id = ticket.id
        this.title = ticket.title
        this.description = ticket.description
        this.contact_information = ticket.contact_information
        this.status = ticket.status
        this.created_at = ticket.created_at
        this.updated_at = ticket.updated_at

        return this
    }

    // Create a new ticket with these pieces of information; title, description, contact information, created timestamp, latest ticket update timestamp. 
    create(model: CreateTicketModel): this {
        this.id = Date.now()
        this.title = model.title
        this.description = model.description
        this.contact_information = model.contact_information
        this.status = 'pending'
        this.created_at = Date.now()
        this.updated_at = Date.now()

        return this
    }

    // Update a ticket’s information and status (pending, accepted, resolved, rejected). 
    update(model: UpdateTicketModel): this {
        const statuses: TicketStatus[] = ['pending', 'accepted', 'resolved', 'rejected']
        if (!statuses.includes(model.status)) {
            throw new Error(`status ${model.status} is not allowed`)
        }

        this.title = model.title
        this.description = model.description
        this.contact_information = model.contact_information
        this.status = model.status
        this.updated_at = Date.now()

        return this
    }

    toModel(): TicketModel {
        return {
            id: this.id,
            title: this.title ?? "",
            description: this.description ?? "",
            contact_information: this.contact_information ?? "",
            status: this.status,
            created_at: new Date(this.created_at),
            updated_at: new Date(this.updated_at),
        }
    }

    toModelForSave(): Ticket {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            contact_information: this.contact_information,
            status: this.status,
            created_at: this.created_at,
            updated_at: this.updated_at,
        }
    }
}