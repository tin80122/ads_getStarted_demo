import { assign } from 'xstate'
import { handleResponse } from '../../common/helper'
/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function UpdateVideos(context, { data }, meta) {
  const {
    videos: { list }
  } = context

  const responseData =
    data.videos?.length === 0
      ? {
          page_token: '',
          fetchEnd: true,
          list
        }
      : handleResponse(context, data)

  return {
    ...context,
    videos: {
      ...context.videos,
      pageToken: data.page_token,
      fetchEnd: responseData.fetchEnd,
      list: responseData.list
    }
  }
}

export default assign(UpdateVideos)
