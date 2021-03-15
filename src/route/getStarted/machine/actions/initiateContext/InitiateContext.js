import { assign } from 'xstate'
import { GET_STARTED_DEFAULT_DATA } from 'assets/constant'
import { getDefaultFilterVal } from '../../common/helper'
/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function InitiateContext(context, event) {
  const {
    adsContext: {
      getStarted: { selectVideo }
    }
  } = context
  const { filter, tab } = selectVideo

  return {
    ...context,
    filter: filter ? filter : getDefaultFilterVal(tab),
    tab: tab ? tab : GET_STARTED_DEFAULT_DATA.tab,
    firstFetch: event.type === 'xstate.init'
  }
}

export default assign(InitiateContext)
