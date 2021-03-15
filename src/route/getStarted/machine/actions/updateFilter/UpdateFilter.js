import { assign } from 'xstate'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function UpdateFilter(context, event, meta) {
  let filter
  if (event.filter) {
    filter = event.filter
  } else if (meta.action.filter) {
    filter = meta.action.filter
  }

  return {
    ...context,
    filter
  }
}

export default assign(UpdateFilter)
