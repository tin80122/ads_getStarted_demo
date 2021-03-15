import { assign } from 'xstate'
import axios from 'axios'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function RestAxiosToken(context, event) {
  if (typeof context.videos.axiosToken?.cancel === 'function') {
    context.videos.axiosToken.cancel()
  }
  const source = axios.CancelToken.source()

  return {
    ...context,
    videos: {
      ...context.videos,
      axiosToken: source
    }
  }
}

export default assign(RestAxiosToken)
