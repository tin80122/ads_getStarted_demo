import { assign } from 'xstate'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function UpdateAdsTypeFromSelect(context, event) {
  const { adsTypeFromSelect } = event
  return {
    ...context,
    adsTypeFromSelect
  }
}

export default assign(UpdateAdsTypeFromSelect)
