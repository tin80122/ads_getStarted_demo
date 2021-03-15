import { actions } from 'xstate'
import { getDefaultFilterVal } from '../../common/helper'
import {
  MY_VIDEOS_FILTERS,
  USER_VIDEOS_FILTERS,
  VIDEO_TAB_TYPE
} from 'assets/constant'

const { pure } = actions

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function HandleShouldResetFilter(context, event) {
  const { adsContext, filter, tab } = context
  const { claimedList, draft } = adsContext
  const placeExist = claimedList.some(
    item => item.id === draft.asset?.place?.id
  )
  const shouldUpdateToDefault =
    tab === VIDEO_TAB_TYPE.YOUR
      ? placeExist
        ? filter === MY_VIDEOS_FILTERS[0].key ||
          filter === MY_VIDEOS_FILTERS[1].key
          ? false //filter:all,claimed
          : filter === draft.asset?.place.id //filter:place.id
          ? false
          : true
        : true
      : placeExist
      ? filter === USER_VIDEOS_FILTERS[0].key
        ? false //filter: all
        : filter === draft.asset?.place.id //filter:place.id
        ? false
        : true
      : true

  return shouldUpdateToDefault
    ? [
        {
          type: 'UpdateFilter',
          filter: getDefaultFilterVal(tab)
        }
      ]
    : []
}

export default pure(HandleShouldResetFilter)
