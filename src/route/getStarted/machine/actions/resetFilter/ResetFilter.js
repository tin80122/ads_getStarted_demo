import { assign } from 'xstate'
import {
  USER_VIDEOS_FILTERS,
  MY_VIDEOS_FILTERS,
  VIDEO_TAB_TYPE
} from 'assets/constant'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function ResetFilter(context, event, meta) {
  const tab = meta.action.tab
  return {
    ...context,
    filter:
      tab === VIDEO_TAB_TYPE.YOUR
        ? MY_VIDEOS_FILTERS[0].key
        : USER_VIDEOS_FILTERS[0].key
  }
}

export default assign(ResetFilter)
