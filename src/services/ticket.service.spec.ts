import { CreateTicketModel, UpdateTicketModel } from "../domain/ticket"
import { TicketDomain } from "../domain/ticket.domain"
import { GetAllParams, TicketRepo } from "../repositories/ticket.repo"
import { TicketService } from "./ticket.service"

class MockRepo extends TicketRepo {
    getOne(id: number): TicketDomain {
        return
    }
    getAll(param: GetAllParams): TicketDomain[] {
        return
    }
    create(domain: TicketDomain): TicketDomain {
        return
    }
    update(domain: TicketDomain): TicketDomain {
        return
    }
}

describe('TicketService', () => {
    let repo: MockRepo

    beforeEach(() => {
        repo = new MockRepo()
    })

    const newTicket = (id?: number): TicketDomain => {
        return new TicketDomain().loadTicket({
            id: id ?? 111,
            title: 'ti_x',
            description: 'desc_x',
            contact_information: 'ci_x',
            status: 'pending',
            created_at: 1626177892254,
            updated_at: 1626177892254
        })
    }

    it('should call repo to get a ticket', () => {
        const ticket = newTicket()
        const mockRepo = jest.spyOn(repo, 'getOne').mockReturnValue(ticket)
        const ticketModel = ticket.toModel();
        const service = new TicketService(repo)

        const res = service.getById(1)

        expect(mockRepo).toHaveBeenCalledWith(1)
        expect(res.id).toBe(ticketModel.id)
        expect(res.title).toBe(ticketModel.title)
        expect(res.description).toBe(ticketModel.description)
        expect(res.contact_information).toBe(ticketModel.contact_information)
        expect(res.created_at).toBeDefined()
        expect(res.updated_at).toBeDefined()
    })

    it('should call repo to get a ticket', () => {
        const mockRepo = jest.spyOn(repo, 'getAll').mockReturnValue([newTicket(1), newTicket(2), newTicket(3)])
        const service = new TicketService(repo)

        const res = service.getAll({ status: 'accepted' })

        expect(mockRepo).toHaveBeenCalledWith({ status: 'accepted' })
        expect(res.length).toBe(3)
        expect(res[0].id).toBe(1)
        expect(res[1].id).toBe(2)
        expect(res[2].id).toBe(3)
    })

    it('should call repo to create', () => {
        const mockRepo = jest.spyOn(repo, 'create')
        const createModel: CreateTicketModel = { title: 't_1', description: 'd_1', contact_information: 'ct_1' }
        const service = new TicketService(repo)

        const res = service.create(createModel)

        expect(mockRepo).toHaveBeenCalledTimes(1)
        expect(res.id).toBeDefined()
        expect(res.title).toBe(createModel.title)
        expect(res.description).toBe(createModel.description)
        expect(res.contact_information).toBe(createModel.contact_information)
        expect(res.created_at).toBeDefined()
        expect(res.updated_at).toBeDefined()
    })

    it('should call repo to update', () => {
        const ticket = newTicket()
        const updateModel: UpdateTicketModel = { title: 't_999', description: 'd_999', contact_information: 'ct_999' }
        const afterUpdateModel = ticket.update(updateModel).toModel();
        const mockGetRepo = jest.spyOn(repo, 'getOne').mockReturnValue(ticket)
        const mockUpdateRepo = jest.spyOn(repo, 'update')
        const service = new TicketService(repo)

        const res = service.update(ticket.getId(), updateModel)

        expect(mockGetRepo).toHaveBeenCalledTimes(1)
        expect(mockUpdateRepo).toHaveBeenCalledTimes(1)

        expect(res.id).toBeDefined()
        expect(res.title).toBe(afterUpdateModel.title)
        expect(res.description).toBe(afterUpdateModel.description)
        expect(res.contact_information).toBe(afterUpdateModel.contact_information)
        expect(res.created_at).toBeDefined()
        expect(res.updated_at).toBeDefined()
    })
})