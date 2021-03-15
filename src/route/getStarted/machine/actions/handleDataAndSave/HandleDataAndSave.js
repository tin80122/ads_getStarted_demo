import { PROVIDE_BY_TYPE } from 'assets/constant'
import { assign } from 'xstate'
import {
  handleUploadingVideo,
  handleDuplicatedVideo,
  handlePickedVideo,
  handleResponse,
  setOrderOfList
} from '../../common/helper'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function HandleDataAndSave(context, event) {
  // console.log('HandleDataAndSave')
  const { data } = event

  const {
    adsContext,
    adsContext: { draft, firstLoadAsset }
  } = context

  const uploadedVideo =
    context.tab === 'my' && draft.uploaded_asset?.id
      ? handleUploadingVideo(adsContext)
      : {}
  // console.log('uploadedVideo', uploadedVideo)

  // console.log('firstLoadAsset', firstLoadAsset)
  const duplicatedVideo =
    context.tab === 'my' &&
    firstLoadAsset?.id &&
    firstLoadAsset.provided_by !== PROVIDE_BY_TYPE.TEXT_BASED_ADS
      ? handleDuplicatedVideo(adsContext)
      : {}
  // console.log('duplicatedVideo: ', duplicatedVideo)

  const pickedVideo = handlePickedVideo(adsContext, context)
  // console.log('pickedVideo: ', pickedVideo)

  const responseData = data
    ? handleResponse(context, data)
    : {
        pageToken: '',
        fetchEnd: true,
        list: [...context.videos.list]
      }

  const finalList = setOrderOfList(
    uploadedVideo,
    duplicatedVideo,
    pickedVideo,
    responseData.list
  )

  return {
    ...context,
    videos: {
      ...context.video,
      pageToken: responseData.pageToken,
      fetchEnd: responseData.fetchEnd,
      list: finalList
    }
  }
}

export default assign(HandleDataAndSave)
