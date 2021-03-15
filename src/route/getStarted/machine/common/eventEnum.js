export const getStartedEventEnum = {
  SWITCH_TAB: "SWITCH_TAB",
  FINISH_GET_STARTED: "FINISH_GET_STARTED",
  SWITCH_ADS_TYPE: "SWITCH_ADS_TYPE",
  START_UPLOAD: "START_UPLOAD",
  UPDATE_PARENT_CONTEXT: "UPDATE_PARENT_CONTEXT",
  FINISH_UPLOAD: "FINISH_UPLOAD",
  SCROLL_LOAD: "SCROLL_LOAD",
  CHANGE_FILTER: "CHANGE_FILTER",
  UPDATE_PARENT_DRAFT_ASSET: "UPDATE_PARENT_DRAFT_ASSET",
};

export function setSwitchAdsTypeValue(param) {
  return {
    type: getStartedEventEnum.SWITCH_ADS_TYPE,
    adsTypeFromSelect: Number(param),
  };
}

export const loadingEventEnum = {
  LOADING: "LOADING",
  IDLE: "IDLE",
  DONE: "DONE",
};
