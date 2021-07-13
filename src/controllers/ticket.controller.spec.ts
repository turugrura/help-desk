import { Test, TestingModule } from '@nestjs/testing';
import { CreateTicketModel, TicketModel, UpdateTicketModel } from '../domain/ticket';
import { GetAllParams } from '../repositories/ticket.repo';
import { TicketService } from '../services/ticket.service';
import { TicketController } from './ticket.controller';

class MockTicketService {
  getById(id: number): TicketModel { return new TicketModel() }
  getAll(params: GetAllParams): TicketModel[] { return [] }
  create(model: CreateTicketModel): TicketModel { return new TicketModel() }
  update(id: number, model: UpdateTicketModel): TicketModel { return new TicketModel() }
}

describe('TicketController', () => {
  let appController: TicketController;
  let appService: TicketService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      providers: [{ provide: TicketService, useValue: new MockTicketService() }],
    }).compile();

    appController = app.get<TicketController>(TicketController);
    appService = app.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined()
  })

  it('should call getAll with qeury', () => {
    const spy = jest.spyOn(appService, 'getAll')

    appController.getTickets({ status: 'accepted' });

    expect(spy).toHaveBeenCalledWith({ status: 'accepted' })
  });

  it('should call getById with id', () => {
    const spy = jest.spyOn(appService, 'getById')

    appController.getTicket('1');

    expect(spy).toBeCalledWith(1)
  });

  it('should call create with model', () => {
    const spy = jest.spyOn(appService, 'create')

    appController.createTicket({ title: 't_1' });

    expect(spy).toBeCalledWith({ title: 't_1' })
  });

  it('should call update with id and model', () => {
    const spy = jest.spyOn(appService, 'update')

    appController.updateTicket('1', { title: 't_1', description: 'd_1', contact_information: 'ct_1', status: 'accepted' });

    expect(spy).toHaveBeenCalledWith(1, { title: 't_1', description: 'd_1', contact_information: 'ct_1', status: 'accepted' })
  });
});
