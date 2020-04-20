import { Router } from 'express'
import { Survey as Model } from '../models'
import * as middlewares from '../middlewares'
import moment from 'moment'

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */
export class Survey {
  constructor () {
    this.model = new Model()
  }

  index () {
    return Router()
      .get('/:id?', this.get.bind(this))
      .use(middlewares.recaptcha())
      .post('/', this.post.bind(this))
  }

  /**
   * @param {Request} request
   * @param {Response} response
   */
  async post (request, response, next) {
    const { body: { participant, survey } } = request

    try {
      const [ currentSurvey ] = await this.model.find({ id: survey })

      if (moment().isAfter(moment(currentSurvey.finishAt * 1000))) {
        const error = new Error('A votação já foi encerrada')
        error.status = 500
        throw error
      }

      const createdId = await this.model.vote.create({
        participant,
        survey
      })

      response
        .status(201)
        .json(createdId)
    } catch (error) {
      next(error)
    }
  }

  /**
   * @param {Request} request
   * @param {Response} response
   */
  async get (request, response, next) {
    const { params: { id } } = request

    try {
      const data = await this.model.find({ id })

      if (data.length === 0) {
        const error = new Error('Participante não encontrado ou não existe')
        error.status = 404
        throw error
      }

      response
        .status(200)
        .json(id ? data.shift() : data)
    } catch (error) {
      next(error)
    }
  }
}
