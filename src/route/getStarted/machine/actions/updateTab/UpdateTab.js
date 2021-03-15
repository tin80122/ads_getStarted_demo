import { assign } from 'xstate'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function UpdateTab(context, event, { action: { tab } }) {
  return {
    ...context,
    tab
  }
}

export default assign(UpdateTab)
