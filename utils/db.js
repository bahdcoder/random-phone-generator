const Fs = require('fs')
const Path = require('path')

class DB {
  constructor() {
    this.path = Path.resolve(__dirname, 'db.json')

    this.min = 100000000
    this.max = 999999999
    this.data = JSON.parse(Fs.readFileSync(this.path)).phones
  }

  /**
   * Get all phone numbers
   * @param {boolean} descending 
   * 
   * @return {Array}
   */
  getPhoneNumbers(descending = false) {
    if (descending) {
      return this.data.sort().reverse()
    }

    return this.data.sort()
  }

  /**
   * save phone numbers
   * 
   * @return {array}
   */
  savePhoneNumbers() {
    const newData = [
      ...this.data,
      this.getUniquePhoneNumber()
    ]

    Fs.writeFileSync(this.path, JSON.stringify({
      phones: newData
    }))

    this.data = newData

    return this.data
  }

  /**
   * get unique phone number
   * 
   * @return {string}
   */
  getUniquePhoneNumber() {
    const number = this.generateRandomPhoneNumber()

    if (new Set(this.data).has(number)) {
      this.getUniquePhoneNumber()
    } else {
      return number
    }
  }

  /**
   * generate a random phone number
   * @return {string}
   */
  generateRandomPhoneNumber() {
    return `0${Math.floor(Math.random() * (this.max - this.min)) + this.min}`
  }
}

module.exports = DB
