import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketController } from './controllers/ticket.controller';
import { TicketJsonDbRepo } from './repositories/ticket-jsondb.repo';
import { TicketRepo } from './repositories/ticket.repo';
import { TicketService } from './services/ticket.service';

@Module({
  imports: [],
  controllers: [AppController, TicketController],
  providers: [
    AppService,
    TicketService,
    { provide: TicketRepo, useClass: TicketJsonDbRepo }
  ],
})
export class AppModule { }
