import { actions } from 'xstate'
import { VIDEO_TAB_TYPE, PROVIDE_BY_TYPE } from 'assets/constant'

const { pure } = actions

/** description
 * check draft.provided_by which is equal to default tab, if not should switch tab
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function HandleShouldSwitchTab(context, event) {
  const {
    adsContext: { draft }
  } = context

  const shouldSwitch =
    draft.asset.provided_by === PROVIDE_BY_TYPE.CUSTOMER_VIDEO

  return shouldSwitch
    ? [
        {
          type: 'UpdateTab',
          tab: VIDEO_TAB_TYPE.CUSTOMER
        }
      ]
    : []
}

export default pure(HandleShouldSwitchTab)
