import { assign } from 'xstate'

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {object} return value
 */
export function FilterUploadVideo(context) {
  const {
    videos: { list }
  } = context

  const filteredList = list.reduce((accumulator, currentItem) => {
    if (!currentItem.isUploaded) {
      accumulator.push(currentItem)
    }
    return accumulator
  }, [])

  return {
    ...context,
    videos: {
      ...context.videos,
      list: filteredList
    }
  }
}

export default assign(FilterUploadVideo)
