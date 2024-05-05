export const ProblemDetails_BadRequest = 400
export const ProblemDetails_NotFound = 404
export const ProblemDetails_InternalServerError = 500

export class ProblemDetails extends Error {

 /**
  * @param {number} status
  * @param {string} title
  * @param {string} [detail]
  * @param {string} [type]
  */
 constructor(status, title, detail, type) {
  super(title)
  /** @readonly */
  this.status = status
  /** @readonly */
  this.type = type
  /** @readonly */
  this.title = title
  /** @readonly */
  this.detail = detail
 }

}