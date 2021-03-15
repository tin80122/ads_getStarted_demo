/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 * @param {object} condition - condition source object
 *
 * @returns {boolean} return value
 */
export default function HasVideos(context, { data }, { cond }) {
  const { videos } = data
  let hasData = true
  if (cond.hasOwnProperty('hasData')) {
    hasData = cond.hasData
  }
  const hasVideo = videos.length > 0
  return hasVideo === hasData
}
