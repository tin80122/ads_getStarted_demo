import { Machine, send, actions, sendParent } from "xstate";
import { loadingEventEnum, getStartedEventEnum } from "./common/eventEnum";
import LoadingState from "./common/LoadingState";
import {
  checkHasTabState,
  checkDefaultFlowState,
  fetchState,
  checkHasMyVideoState,
  scrollState,
  setDefaultVideoState,
  resetSwitchTabValue,
  checkDraftTabIsMyState,
} from "./common/state";

import customActions from "./actions";
import services from "./services";
import guards from "./guards";
import { VIDEO_TAB_TYPE, GET_STARTED_DEFAULT_DATA } from "assets/constant";

const { pure, log } = actions;
const context = {
  hasTab: false,
  tab: GET_STARTED_DEFAULT_DATA.tab,
  filter: "",
  adsTypeFromSelect: null,
  videos: {
    axiosToken: "",
    pageToken: "",
    fetchEnd: false,
    list: [],
  },
  temporaryVideos: {
    axiosToken: "",
    pageToken: "",
    fetchEnd: false,
    list: [],
  },
};

const options = {
  actions: {
    showLoadingComponent: send(loadingEventEnum.LOADING),
    closeLoadingComponent: send(loadingEventEnum.IDLE),
    ...customActions,
  },
  guards,
  services,
};

const updateContextAction = pure((context) => {
  const { tab, filter } = context;

  const payload = {
    getStarted: {
      selectVideo: {
        tab,
        filter,
      },
    },
  };
  //return sendParent({ type: adsEventEnum.UPDATE_CONTEXT, payload });
});

const finishEvent = {
  target: "done",
  actions: [send(loadingEventEnum.DONE), updateContextAction],
};

const getStartedMachine = Machine(
  {
    id: "getStarted",
    type: "parallel",
    context,
    states: {
      common: {
        initial: "default",
        states: {
          default: {
            id: "default",
            initial: "checkHasTab",
            entry: [() => log("entry default"), "InitiateContext"],
            states: {
              checkHasTab: checkHasTabState,
              checkFlow: checkDefaultFlowState,
              checkHasMyVideo: checkHasMyVideoState,
              checkDraftTabIsMy: checkDraftTabIsMyState,
              fetchVideo: {
                id: "fetchVideo",
                ...fetchState("fetchVideo_invoke", "done"),
              },
              fetchingVideosAndGoToSetDefaultVideo: {
                id: "fetchingVideosAndGoToSetDefaultVideo",
                ...fetchState("fetchingVideos_user_invoke", "setDefaultVideo"),
              },
              setDefaultVideo: setDefaultVideoState,
              done: {
                type: "final",
              },
            },
            onDone: [
              {
                cond: { type: "CheckTab", tab: VIDEO_TAB_TYPE.CUSTOMER },
                target: "#customerVideo",
              },
              {
                cond: { type: "CheckTab", tab: VIDEO_TAB_TYPE.YOUR },
                target: "#yourVideo",
              },
              {
                target: "#yourVideo",
              },
            ],
          },
          yourVideo: {
            id: "yourVideo",
            initial: "idle",
            states: {
              idle: {
                on: {
                  [getStartedEventEnum.SCROLL_LOAD]: {
                    target: "scrollLoad",
                  },
                  [getStartedEventEnum.CHANGE_FILTER]: {
                    actions: "UpdateFilter",
                    target: "fetchingVideos",
                  },
                },
              },
              fetchingVideos: {
                id: "fetchingVideos_yours",
                ...fetchState("fetchingVideos_yours_invoke", "idle"),
              },
              scrollLoad: {
                id: "scrollLoad_yours",
                ...scrollState("scrollLoad_yours_invoke"),
              },
            },
            on: {
              [getStartedEventEnum.SWITCH_TAB]: [
                {
                  cond: (_, { upload }) => !upload,
                  actions: [...resetSwitchTabValue(VIDEO_TAB_TYPE.CUSTOMER)],
                  target: "#fetchingVideos_user",
                },
              ],
              [getStartedEventEnum.FINISH_GET_STARTED]: {
                ...finishEvent,
              },
            },
          },
          customerVideo: {
            id: "customerVideo",
            initial: "idle",
            states: {
              idle: {
                on: {
                  [getStartedEventEnum.SCROLL_LOAD]: {
                    target: "scrollLoad",
                  },
                  [getStartedEventEnum.CHANGE_FILTER]: {
                    actions: "UpdateFilter",
                    target: "fetchingVideos",
                  },
                },
              },
              fetchingVideos: {
                id: "fetchingVideos_user",
                ...fetchState("fetchingVideos_user_invoke", "idle"),
              },
              scrollLoad: {
                id: "scrollLoad_user",
                ...scrollState("scrollLoad_user_invoke"),
              },
            },
            on: {
              [getStartedEventEnum.SWITCH_TAB]: {
                actions: [...resetSwitchTabValue(VIDEO_TAB_TYPE.YOUR)],
                target: "#fetchingVideos_yours",
              },
              [getStartedEventEnum.FINISH_GET_STARTED]: {
                ...finishEvent,
              },
            },
          },
          done: {
            type: "final",
          },
        },
      },
      loading: {
        ...LoadingState,
      },
    },
    on: {
      [getStartedEventEnum.START_UPLOAD]: {
        actions: [
          "UpdateAdsContext",
          "FilterUploadVideo",
          send({ type: getStartedEventEnum.SWITCH_TAB, upload: true }),
          "HandleDataAndSave",
        ],
      },
      [getStartedEventEnum.UPDATE_PARENT_CONTEXT]: {
        actions: "UpdateAdsContext",
      },
      [getStartedEventEnum.FINISH_UPLOAD]: {
        actions: "UpdateUploadVideo",
      },
      [getStartedEventEnum.SWITCH_ADS_TYPE]: {
        actions: ["ResetContext", "UpdateAdsTypeFromSelect"],
        target: "#default",
      },
    },
  },
  options
);
export default getStartedMachine;
