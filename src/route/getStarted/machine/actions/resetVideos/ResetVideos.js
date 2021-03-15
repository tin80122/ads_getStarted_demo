import { assign } from 'xstate'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function ResetVideos(context) {
  return {
    ...context,
    videos: {
      axiosToken: '',
      pageToken: '',
      fetchEnd: false,
      list: []
    }
  }
}

export default assign(ResetVideos)
