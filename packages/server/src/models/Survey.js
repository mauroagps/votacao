import { Model } from './Model'
import Promise from 'bluebird'
import Joi from 'joi'
import moment from 'moment'
import omit from 'lodash/omit'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { SurveyVote } from './SurveyVote'

const schema = Joi.object().keys({
  id: Joi.string(),
  participants: Joi.array().items([ Joi.string() ]).required(),
  createdAt: Joi.number(),
  finishAt: Joi.number()
})

/**
 * @typedef {import('elasticsearch').SearchParams} SearchParams
 * @typedef SurveyItem representa uma enquete
 * @property {string} id codigo de identificação
 * @property {string[]} participants ids dos participantes
 * @property {number} createdAt data de criação
 * @property {number} finishAt data que encerra a votação
 */

export class Survey extends Model {
  constructor () {
    super()
    this.vote = new SurveyVote()
  }

  /**
   * cadastra um voto na enquete
   *
   * @param {SurveyItem} data
   * @returns {Promise<string>} retorna o id do voto
   */
  async create (data) {
    try {
      const body = await Joi.validate({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: moment().unix(),
        finishAt: moment().add(12, 'hour').unix()
      }, schema)

      await this.client.indices.exists({ index: 'survey' })
        .then(indexExists => !indexExists && this.client.indices.create({ index: 'survey' }))

      /**
       * @type {SearchParams}
       */
      const params = {
        index: 'survey',
        type: 'survey',
        id: body.id,
        body
      }

      return this.client.create(params)
        .then(feedback => feedback._id)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  /**
   * Efetua a busca de itens da votação
   *
   * @param {Partial<SurveyItem>} term
   * @returns {Promise<SurveyItem[]>}
   */
  async find (term = {}) {
    try {
      term = omitBy(term, isUndefined)

      const { hits: { hits } } = await this.client.search(omitBy({
        index: 'survey',
        type: 'survey',
        body: Object.keys(term).length > 0 && { query: { term } }
      }, isUndefined))

      return Promise.resolve(hits)
        .map(async item => ({
          id: item._id,
          ...omit(item._source, [ 'participants' ]),
          total: await this.vote.count({ survey: item._id }),
          peerParticipants: await Promise.all(item._source.participants.map(participant => this.vote.count({ survey: item._id, participant })))
            .map((votes, index) => ({ [item._source.participants[index]]: votes }))
            .reduce((previous, current) => ({ ...previous, ...current }), {})
        }))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
