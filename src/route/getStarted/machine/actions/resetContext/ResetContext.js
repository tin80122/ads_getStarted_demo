import { assign } from 'xstate'
import { GET_STARTED_DEFAULT_DATA, USER_VIDEOS_FILTERS } from 'assets/constant'
/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function ResetContext(context) {
  return {
    ...context,
    tab: GET_STARTED_DEFAULT_DATA.tab,
    filter: USER_VIDEOS_FILTERS[0].key,
    videos: {
      axiosToken: '',
      pageToken: '',
      fetchEnd: false,
      list: []
    },
    hasTab: false
  }
}

export default assign(ResetContext)
