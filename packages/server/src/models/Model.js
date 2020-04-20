import { Client } from 'elasticsearch'

export class Model {
  /**
   * retorna uma instancia da conexão com o elastic search
   *
   * @returns {Client}
   */
  get client () {
    if (!Model.connection) {
      Model.connection = new Client({
        hosts: [
          'elasticsearch:9200'
        ]
      })
    }

    return Model.connection
  }
}
