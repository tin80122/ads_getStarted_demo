/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 * @param {object} condition - condition source object
 *
 * @returns {boolean} return value
 */
export default function CheckTab(context, event, { cond: { tab } }) {
  return context.tab === tab
}
