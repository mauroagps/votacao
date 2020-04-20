import { Router } from 'express'
import { Participant as Model } from '../models'

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

export class Participant {
  constructor () {
    this.model = new Model()
  }

  index () {
    return Router()
      .get('/:id?', this.get.bind(this))
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
