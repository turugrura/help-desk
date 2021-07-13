import { Module } from '@nestjs/common';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
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
    { provide: TicketRepo, useValue: new TicketJsonDbRepo(new JsonDB(new Config("myDataBase", true, false, '/'))) }
  ],
})
export class AppModule { }
