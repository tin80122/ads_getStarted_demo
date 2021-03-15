/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 * @param {object} condition - condition source object
 *
 * @returns {boolean} return value
 */
export default function HasContextVideos(
  { videos: { list } },
  event,
  { cond: { hasData } }
) {
  const hasContextVideos = list.length > 0

  return hasContextVideos === hasData
}
