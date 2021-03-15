import { PROVIDE_BY_TYPE } from 'assets/constant'
/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 * @param {object} condition - condition source object
 *
 * @returns {boolean} return value
 */
export default function CheckDraftTabIsMy(
  context,
  event,
  { cond: { DraftTabIsMy } }
) {
  const {
    adsContext: { draft }
  } = context
  return (
    (draft.asset?.provided_by !== PROVIDE_BY_TYPE.CUSTOMER_VIDEO) ===
    DraftTabIsMy
  )
}
