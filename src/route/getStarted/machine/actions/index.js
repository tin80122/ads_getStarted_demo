// action functions for xstate machine - getStartedMachine
import HandleDataAndSave from "./handleDataAndSave";
import ResetFilter from "./resetFilter";
import ResetVideos from "./resetVideos";
import RestAxiosToken from "./restAxiosToken";
import UpdateFilter from "./updateFilter";
import UpdateHasTab from "./updateHasTab";
import UpdateTab from "./updateTab";
import UpdateVideos from "./updateVideos";
import FilterUploadVideo from "./filterUploadVideo";
import UpdateUploadVideo from "./updateUploadVideo";
import UpdateAdsContext from "./updateAdsContext";
import InitiateContext from "./initiateContext";
import HandleShouldSwitchTab from "./handleShouldSwitchTab";
import HandleShouldResetFilter from "./handleShouldResetFilter";
import UpdateAdsTypeFromSelect from "./updateAdsTypeFromSelect";
import ResetContext from "./resetContext";
import SendDraftAssetToParent from "./sendDraftAssetToParent";
import ReplaceTemporaryVideoToVideo from "./replaceTemporaryVideoToVideo";
import UpdateTemporaryVideos from "./updateTemporaryVideos";

const customActions = {
  HandleApiError,
  HandleDataAndSave,
  ResetFilter,
  ResetVideos,
  RestAxiosToken,
  UpdateFilter,
  UpdateHasTab,
  UpdateTab,
  UpdateVideos,
  FilterUploadVideo,
  UpdateUploadVideo,
  UpdateAdsContext,
  InitiateContext,
  HandleShouldSwitchTab,
  HandleShouldResetFilter,
  UpdateAdsTypeFromSelect,
  ResetContext,
  SendDraftAssetToParent,
  ReplaceTemporaryVideoToVideo,
  UpdateTemporaryVideos,
};
export default customActions;
