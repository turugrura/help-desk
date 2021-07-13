import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req } from '@nestjs/common';
import { CreateTicketModel, TicketModel, UpdateTicketModel } from '../domain/ticket';
import { GetAllParams } from '../repositories/ticket.repo';
import { TicketService } from '../services/ticket.service';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get()
    getTickets(@Query() params: GetAllParams) {
        return this.ticketService.getAll(params);
    }

    @Get(':id')
    getTicket(@Param('id') id: string) {
        const ticket = this.ticketService.getById(+id);
        if (!ticket) {
            throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
        }
        return ticket
    }

    @Post()
    createTicket(@Body() model: CreateTicketModel) {
        return this.ticketService.create(model)
    }

    @Put(':id')
    updateTicket(@Param('id') id: string, @Body() model: UpdateTicketModel) {
        let ticket: TicketModel;
        try {
            ticket = this.ticketService.update(+id, model)
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY)
            }

            throw new HttpException('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        return ticket
    }
}
