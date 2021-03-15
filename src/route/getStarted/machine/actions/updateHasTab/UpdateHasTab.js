import { assign } from 'xstate'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function UpdateHasTab(context) {
  const { claimedList } = context.adsContext
  const { hasTab } = context
  return {
    ...context,
    hasTab: !hasTab && (claimedList.length > 0 ? true : false)
  }
}

export default assign(UpdateHasTab)
