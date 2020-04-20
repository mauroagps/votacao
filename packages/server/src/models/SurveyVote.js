import { Model } from './Model'
import Promise from 'bluebird'
import Joi from 'joi'
import moment from 'moment'

const schema = Joi.object().keys({
  id: Joi.string(),
  survey: Joi.string().required(),
  participant: Joi.string().required(),
  createdAt: Joi.number()
})

/**
 * @typedef {import('elasticsearch').SearchParams} SearchParams
 * @typedef SurveyVoteItem representa um voto da enquete
 * @property {string} survey id da votação
 * @property {string} participant id do participante
 * @property {number} createdAt data do voto
 */

export class SurveyVote extends Model {
  /**
   * retorna o número de votos da enquete mediante filtros
   *
   * @param {Partial<SurveyVoteItem>} terms
   * @returns {Promise<number>}
   */
  count (terms = {}) {
    /**
     * @type {SearchParams}
     */
    const params = {
      index: 'survey_vote',
      type: 'survey_vote',
      q: Object.keys(terms)
        .map(key => `${key}:"${terms[key]}"`)
        .join(' && ')
    }

    return this.client.search(params)
      .then(data => data.hits.total)
  }

  /**
   * adiciona um novo voto a enquete
   *
   * @param {SurveyVoteItem} data
   * @returns {Promise<string>} retorna o id do voto
   */
  async create (data) {
    try {
      const body = await Joi.validate({
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: moment().unix()
      }, schema)

      await this.client.indices.exists({ index: 'survey_vote' })
        .then(() => this.client.indices.create({ index: 'survey_vote' }))
        .catch(() => undefined)

      /**
       * @type {SearchParams}
       */
      const query = {
        index: 'survey_vote',
        type: 'survey_vote',
        id: body.id,
        body
      }

      return this.client.create(query)
        .then(feedback => feedback._id)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
