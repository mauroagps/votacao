import { Model } from './Model'
import Joi from 'joi'
import moment from 'moment'
import Promise from 'bluebird'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'

const schema = Joi.object().keys({
  id: Joi.string(),
  name: Joi.string().required(),
  photo: Joi.string().required(),
  createdAt: Joi.number()
})

/**
 * @typedef {import('elasticsearch').SearchParams} SearchParams
 * @typedef ParticipantItem representa um participante
 * @property {string} [id] código de identificação do participante
 * @property {string} name nome do participante
 * @property {string} photo url da foto do participante
 */

export class Participant extends Model {
  /**
   * cadastra um ou mais participantes para serem utilizados nas enquetes
   *
   * @param {ParticipantItem|ParticipantItem[]} data
   * @returns {Promise<string|string[]>}
   */
  async create (data) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(item => this.create(item)))
    }

    try {
      // cria o indice caso não exista
      await this.client.indices.exists({ index: 'participant' })
        .then(() => this.client.indices.create({ index: 'participant' }))
        .catch(() => undefined)

      const body = await Joi.validate({
        id: Math.random().toString(36).substr(2, 9),
        createdAt: moment().unix(),
        ...data
      }, schema)

      const query = {
        index: 'participant',
        type: 'participant',
        id: body.id,
        body
      }

      return this.client
        .create(query)
        .then(item => item._id)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * @param {Partial<ParticipantItem>} [body]
   * @returns {Promise<ParticipantItem[]>}
   */
  async find (term = {}) {
    try {
      // limpa os campos vazios
      term = omitBy(term, isUndefined)
      /**
       * @type {SearchParams}
       */
      const query = {
        index: 'participant',
        type: 'participant',
        body: Object.keys(term).length > 0 && { query: { term } }
      }

      // omitBy(term, isUndefined)

      const { hits: { hits } } = await this.client.search(query)

      return Promise.resolve(hits)
        .map(item => ({
          id: item._id,
          ...item._source
        }))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
