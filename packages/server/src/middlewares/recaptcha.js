import GoogleRecaptcha from 'google-recaptcha'

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * middleware to validate google recaptcha
 *
 * @param {string} secret google recaptcha key
 * @returns {(request: Request, response: Response, next: NextFunction) => void}
 */
export default function recaptcha (secret = '6LcBeKAUAAAAAMpAJ4LaMWjwjIf4bKVxTcQzT-HL') {
  const googleRecaptcha = new GoogleRecaptcha({ secret })

  return (request, response, next) => {
    const { body: { recaptcha } } = request

    googleRecaptcha.verify({ response: recaptcha }, (error) => {
      if (error) {
        next(error)
      } else {
        next()
      }
    })
  }
}
