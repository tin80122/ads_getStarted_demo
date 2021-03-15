import {
  isDefaultFilter as isDefaultFilterFn,
  hasDraftCond
} from '../../common/helper'
/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 * @param {object} condition - condition source object
 *
 * @returns {boolean} return value
 */
export default function IdentifyFilter(context, event, { cond }) {
  const { isDefaultFilter, hasDraft = true } = cond

  const {
    adsContext: { draft },
    filter,
    tab
  } = context

  const filterCond = isDefaultFilter === isDefaultFilterFn(filter, tab)

  const draftCond = hasDraftCond(draft) === hasDraft
  return filterCond && draftCond
}
