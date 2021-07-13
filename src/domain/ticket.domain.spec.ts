import { UpdateTicketModel } from "./ticket"
import { TicketDomain } from "./ticket.domain"

describe('TicketDomain', () => {
    it('should create', () => {
        const testTable: { title?: string; description?: string; contact_information?: string }[] = [
            {},
            { title: 'ti_1' },
            { title: 'ti_2', description: 'desc_2' },
            { title: 'ti_3', description: 'desc_3', contact_information: 'ci_3' },
        ]

        for (const t of testTable) {
            const ticket = new TicketDomain()

            const modelBeforeCreate = ticket.toModelForSave();
            expect(ticket.getId()).toBeUndefined()
            expect(modelBeforeCreate.title).toBeUndefined()
            expect(modelBeforeCreate.description).toBeUndefined()
            expect(modelBeforeCreate.contact_information).toBeUndefined()
            expect(modelBeforeCreate.created_at).toBeUndefined()
            expect(modelBeforeCreate.updated_at).toBeUndefined()

            ticket.create({ title: t.title, description: t.description, contact_information: t.contact_information })
            const modelAfterCreate = ticket.toModelForSave();

            expect(ticket.getId()).toBeDefined()
            expect(modelAfterCreate.title).toBe(t.title)
            expect(modelAfterCreate.description).toBe(t.description)
            expect(modelAfterCreate.contact_information).toBe(t.contact_information)
            expect(modelAfterCreate.created_at).toBeDefined()
            expect(modelAfterCreate.updated_at).toBeDefined()
        }
    })

    it('should update', () => {
        const craetedAt = 1626177892254
        const ticket = new TicketDomain().loadTicket({ id: 111, title: 'ti_x', description: 'desc_x', contact_information: 'ci_x', status: 'pending', created_at: craetedAt, updated_at: craetedAt })
        const testTable: UpdateTicketModel[] = [
            {},
            { title: 'ti_1' },
            { title: 'ti_2', description: 'desc_2' },
            { title: 'ti_3', description: 'desc_3', contact_information: 'ci_3' },
            { title: 'ti_4', description: 'desc_4', contact_information: 'ci_4', status: 'rejected' },
        ]

        for (const t of testTable) {
            ticket.update(t)
            const modelForSave = ticket.toModelForSave();

            expect(modelForSave.title).toBe(t.title)
            expect(modelForSave.description).toBe(t.description)
            expect(modelForSave.contact_information).toBe(t.contact_information)
            expect(modelForSave.created_at).toBe(craetedAt)
            expect(modelForSave.updated_at).toBeGreaterThan(craetedAt)
        }
    })
})