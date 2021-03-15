import { actions, sendParent } from 'xstate'
import {
  VIDEO_TAB_TYPE,
  PROVIDE_BY_TYPE,
  GET_STARTED_DEFAULT_DATA
} from 'assets/constant'
import { adsEventEnum } from 'route/builder/create/machines/common/eventEnum'
const { pure } = actions

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */

export function SendDraftAssetToParent(context, event, huh) {
  const { tab, videos } = context

  const video = videos?.list?.[GET_STARTED_DEFAULT_DATA.lasted_video_index]
  const videoAsset = {
    id: video?.key,
    description: video?.post?.description,

    provided_by:
      tab === VIDEO_TAB_TYPE?.YOUR
        ? PROVIDE_BY_TYPE?.OWN_VIDEO
        : PROVIDE_BY_TYPE?.CUSTOMER_VIDEO,
    place: {
      id: video?.place?.id,
      name: video?.place?.name,
      address: video?.place?.address,
      coordinates: video?.place?.coordinates
    },
    cover_url: video?.post?.cover_url,
    video_url: video?.post?.video_url,
    created_at: video?.post?.created_at,
    owner: {
      uid: video?.provider?.uid,
      profile_image_url: video?.provider?.profile_image_url,
      followers_count: video?.provider?.followers_count,
      is_verified: video?.provider?.is_verified
    }
  }

  const textBasedAsset = {
    id: 'tmpTextBasedAdId',
    description: '',
    provided_by: PROVIDE_BY_TYPE.TEXT_BASED_ADS,
    place: {
      id: '',
      name: '',
      address: '',
      coordinates: []
    },
    cover_url: '',
    video_url: '',
    created_at: '',
    owner: {}
  }
  const asset = video ? videoAsset : textBasedAsset

  return sendParent({
    type: adsEventEnum.UPDATE_DRAFT_ASSET,
    data: { ...asset }
  })
}

export default pure(SendDraftAssetToParent)
