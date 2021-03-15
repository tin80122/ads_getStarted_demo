import { hasPickedCond } from '../../common/helper'
/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 * @param {object} condition - condition source object
 *
 * @returns {boolean} return value
 */
export default function HasPicked(
  { adsContext: { draft } },
  event,
  { cond: { hasPicked } }
) {
  return hasPickedCond(draft) === hasPicked
}
