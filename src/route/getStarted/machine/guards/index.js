// guards functions for xstate machine - getStartedMachine
import HasVideos from './hasVideos'
import CheckTab from './checkTab'
import IdentifyFilter from './identifyFilter'
import HasContextVideos from './hasContextVideos'
import HasPicked from './hasPicked'
import CheckDraftTabIsMy from './checkDraftTabIsMy'

const guards = {
  HasVideos,
  CheckTab,
  IdentifyFilter,
  HasContextVideos,
  HasPicked,
  CheckDraftTabIsMy
}
export default guards
