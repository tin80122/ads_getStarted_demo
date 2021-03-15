import { assign } from 'xstate'
import { handleUploadingVideo } from '../../common/helper'
/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function UpdateUploadVideo(context, event) {
  const { payload } = event
  const newList = context.videos.list.map(item => {
    if (item.isUploaded) {
      const newItem = handleUploadingVideo(payload)
      return newItem
    }
    return item
  })

  return {
    videos: {
      ...context.videos,
      list: newList
    }
  }
}

export default assign(UpdateUploadVideo)
