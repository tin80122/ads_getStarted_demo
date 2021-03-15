import { loadingEventEnum } from "./eventEnum";

export const LoadingState = {
  initial: "loading",
  states: {
    idle: {
      on: {
        [loadingEventEnum.LOADING]: "loading",
        [loadingEventEnum.DONE]: "done",
      },
    },
    loading: {
      on: {
        [loadingEventEnum.IDLE]: "idle",
        [loadingEventEnum.DONE]: "done",
      },
    },
    done: {
      type: "final",
    },
  },
};
export default LoadingState;
