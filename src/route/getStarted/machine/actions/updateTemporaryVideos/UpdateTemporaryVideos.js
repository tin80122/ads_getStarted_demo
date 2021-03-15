import { assign } from 'xstate'
import { handleResponse } from '../../common/helper'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function UpdateTemporaryVideos(context, { data }) {
  const responseData = handleResponse(context, data, { shouldFilter: false })
  const temporaryVideos =
    data.videos !== 0
      ? {
          temporaryVideos: {
            ...context.temporaryVideos,
            pageToken: data.page_token,
            fetchEnd: responseData.fetchEnd,
            list: responseData.list
          }
        }
      : {}

  return {
    ...context,
    ...temporaryVideos
  }
}

export default assign(UpdateTemporaryVideos)
