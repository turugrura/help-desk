import { ApiProperty } from '@nestjs/swagger';

export type TicketStatus = 'pending' | 'accepted' | 'resolved' | 'rejected'

export class Ticket {
    id: number
    title?: string
    description?: string
    contact_information?: string
    status: TicketStatus
    created_at: number
    updated_at: number
}

export class TicketModel {
    id: number
    title: string
    description: string
    status?: TicketStatus
    contact_information: string
    created_at: Date
    updated_at: Date
}

export class CreateTicketModel {
    @ApiProperty()
    title?: string

    @ApiProperty()
    description?: string

    @ApiProperty()
    contact_information?: string
}

export class UpdateTicketModel extends CreateTicketModel {
    @ApiProperty()
    status: TicketStatus
}