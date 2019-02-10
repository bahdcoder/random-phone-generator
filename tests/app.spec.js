const Fs = require('fs')
const Path = require('path')
const DB = require('../utils/db')
const { expect } = require('chai')

const dbPath = Path.resolve(__dirname, '../utils/db.json')

describe('The DB class', () => {
  beforeEach(() => {
    Fs.writeFileSync(dbPath, JSON.stringify({
      phones: ['0123456789']
    }))
  })

  it('initializes the phone numbers on db class', () => {
    const data = new DB().data
    expect(data).to.have.members(['0123456789'])
  })

  it('returns all phone numbers in db', () => {
    const data = new DB().getPhoneNumbers()

    expect(data).to.have.members(['0123456789'])
  })

  it('can sort phone numbers from db', () => {
    Fs.writeFileSync(dbPath, JSON.stringify({
      phones: ['0123456789', '0213456789']
    }))
    const data = new DB().getPhoneNumbers(true)
    expect(data[0]).to.equal('0213456789')
  })

  it('generates a random phone number', () => {
    const phone = new DB().generateRandomPhoneNumber()
    expect(phone).to.have.length(10)
    expect(phone.charAt(0)).to.equal('0')
  })

  it('saves a new number to database', () => {
    Fs.writeFileSync(dbPath, JSON.stringify({
      phones: ['0123456789', '0213456789']
    }))
    const phone = new DB().savePhoneNumbers()
    
    const data = new DB().getPhoneNumbers()
    expect(data).to.have.length(3)
  })
})