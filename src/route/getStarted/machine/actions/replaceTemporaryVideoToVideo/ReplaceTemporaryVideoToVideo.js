import { assign } from 'xstate'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function ReplaceTemporaryVideoToVideo(context, event) {
  const { videos, temporaryVideos } = context
  return {
    ...context,
    videos: {
      ...videos,
      ...temporaryVideos
    },
    temporaryVideos: {
      axiosToken: '',
      pageToken: '',
      fetchEnd: false,
      list: []
    }
  }
}

export default assign(ReplaceTemporaryVideoToVideo)
