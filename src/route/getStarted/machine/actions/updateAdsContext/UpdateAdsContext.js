import { assign } from 'xstate'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function UpdateAdsContext(context, { payload }) {
  return {
    ...context,
    adsContext: payload
  }
}

export default assign(UpdateAdsContext)
