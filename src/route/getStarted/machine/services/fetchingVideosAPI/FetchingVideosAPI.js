import axios from "axios";
import { AdsAPI } from "assets/api";
import { VIDEO_LIMIT } from "assets/constant";
import MaskDispatchType from "assets/helper/maskDispatchType";

/** description
 *
 * @param {object} context - xstate machine context
 * @param {object} event
 *
 * @returns {Promise} Promise resolved
 */
export default async function FetchingVideosAPI(context, _, meta) {
  let filter,
    tab = "";
  const {
    utils: { dispatchAuth, dispatchMask },
    draft,
  } = context.adsContext;
  if (meta.src?.payload) {
    tab = meta.src?.payload.tab;
    filter = meta.src?.payload.filter;
  } else {
    tab = context.tab;
    filter = context.filter;
  }

  const {
    adsTypeFromSelect,
    videos: { pageToken, axiosToken },
  } = context;

  try {
    // let { data, withoutError } = await AdsAPI.get(`/v1/videos/${tab}`, {
    //   params: {
    //     size: VIDEO_LIMIT.common.fetchSize,
    //     page_token: pageToken || '',
    //     place_id: filter,
    //     type: adsTypeFromSelect || draft.type
    //   },
    //   cancelToken: axiosToken.token,
    //   bypassErrorResponseInterceptor: true
    // })

    if (withoutError) {
      return data;
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      //dispatchAuth({ type: 'REAUTH' })
    } else if (axios.isCancel(error)) {
      console.log(error);
    } else {
      //dispatchMask(MaskDispatchType.unexpectedError())
    }
  }
}
