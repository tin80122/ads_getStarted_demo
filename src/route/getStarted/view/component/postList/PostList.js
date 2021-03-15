import React, { useCallback, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useService } from "@xstate/react";
import { useTranslation } from "react-i18next";
import { MaskContext } from "context/mask";
import { BuilderContext } from "context/builder";
import MaskDispatchType from "assets/helper/maskDispatchType";
import PreviewContentTypeGenerator from "assets/helper/PreviewContentTypeGenerator";
import useTracker from "hooks/useTracker";
import Tab from "component/tab";
import ScrollLoader from "component/scrollLoader";
import Filter from "../filter";
import Post from "../post";
import { getStartedEventEnum } from "../../../machine/common/eventEnum";
import { PROVIDE_BY_TYPE, VIDEO_TAB_TYPE } from "assets/constant";
// import Upload from '../upload'
import TextBaseAds from "../textBaseAds";

function PostList(props) {
  const { state, send, config, getStartedMachine } = props;
  const { draft, claimedList } = state.context;

  const { dispatchMask } = useContext(MaskContext);
  const { submit } = useContext(BuilderContext);
  const { t } = useTranslation();
  const { setEventTracker } = useTracker();
  const [getStartedState, getStartedSend] = useService(getStartedMachine);
  const {
    context: {
      filter,
      hasTab,
      tab,
      videos: { list: lists, fetchEnd } = {},
    } = {},
  } = getStartedState;

  const closePreview = useCallback(() => {
    dispatchMask(MaskDispatchType.clear());
  }, [dispatchMask]);

  const pickAndNext = useCallback(
    (e, previewData) => {
      e.stopPropagation();

      const additionData = {
        asset: previewData.asset,
      };
      submit({ additionData });
      closePreview();
    },
    [closePreview, submit]
  );

  const showPreview = useCallback(
    (previewData) => {
      dispatchMask({
        type: "VIDEO_PREVIEW",
        detail: {
          previewData: {
            type: "simple",
            contentType: PreviewContentTypeGenerator(
              previewData.asset.provided_by
            ),
            videoUrl: previewData.asset.video_url,
            ...(previewData.asset.provided_by === PROVIDE_BY_TYPE.UPLOAD_IMAGE
              ? { imageUrl: previewData.asset.cover_url }
              : {}),
            owner: {
              profileImageUrl: previewData.asset.owner.profile_image_url,
              uid: previewData.asset.owner.uid,
              showTickmark: previewData.asset.owner.is_verified,
              showDot: previewData.asset.owner.showDot,
            },
            sponsor: {
              uid: config.uid,
              profileImageUrl: config.profile_image_url,
              message: previewData.message,
              showTickmark: config.user_level >= 4,
            },
            description: previewData.asset.description,
            createdAt: previewData.created_at,
            placeName: previewData.asset.place.name,
            pickAndNext: (e) => pickAndNext(e, previewData),
            hasCloseIcon: true,
            handleClose: closePreview,
          },
        },
      });
    },
    [closePreview, config, dispatchMask, pickAndNext]
  );

  useEffect(() => {
    // it's workaround
    // update current context to getStartedMachine on parent machine context mutated
    getStartedSend({
      type: getStartedEventEnum.UPDATE_PARENT_CONTEXT,
      payload: state.context,
    });
  }, [getStartedSend, state.context]);

  return (
    <>
      {hasTab && (
        <Tab
          activeIndex={["my", "user"].indexOf(tab)}
          tabs={[
            {
              text: t("campaign.add_video.source.self"),
              callback: () => {
                setEventTracker(
                  "CreateAds",
                  "GetStarted_YourVideosTab",
                  "TabSwitch"
                );
                getStartedSend(getStartedEventEnum.SWITCH_TAB);
              },
            },
            {
              text: t("campaign.add_video.source.user"),
              callback: () => {
                setEventTracker(
                  "CreateAds",
                  "GetStarted_CustomerVideosTab",
                  "TabSwitch"
                );
                getStartedSend(getStartedEventEnum.SWITCH_TAB);
              },
            },
          ]}
        />
      )}

      {hasTab && config.claimed_places > 1 && (
        <Filter
          {...{
            source: tab,
            claimedList,
            filter,
            setFilter: (e) =>
              getStartedSend({
                type: getStartedEventEnum.CHANGE_FILTER,
                filter: e,
              }),
          }}
        />
      )}

      <div className="wrapper">
        <ScrollLoader
          {...{
            callback: () => getStartedSend(getStartedEventEnum.SCROLL_LOAD),
            fetchEnd,
            option: { thresholds: 0.3 },
            fetching: getStartedState.matches?.("loading.loading"),
          }}
        >
          <div className="post-list">
            {tab === VIDEO_TAB_TYPE.YOUR && (
              <TextBaseAds
                {...{
                  draft,
                  send,
                  state,
                }}
              />
            )}
            {lists?.map((list) => (
              <Post
                key={list.post.id}
                post={{
                  id: list.post.id,
                  cover_url: list.post.cover_url,
                  video_url: list.post.video_url,
                  description: list.post.description,
                  created_at: list.post.created_at,
                }}
                provider={{
                  uid: list.provider.uid,
                  profile_image_url: list.provider.profile_image_url,
                  followers_count: list.provider.followers_count,
                  is_verified: list.provider.is_verified,
                }}
                place={{
                  id: list.place.id,
                  name: list.place.name,
                  address: list.place.address,
                  coordinates: list.place.coordinates,
                }}
                {...{
                  draft,
                  source: tab,
                  setPreview: showPreview,
                  send,
                  state,
                }}
              />
            ))}
          </div>
        </ScrollLoader>
      </div>
    </>
  );
}

PostList.propTypes = {
  state: PropTypes.object.isRequired,
  send: PropTypes.func.isRequired,
  config: PropTypes.object.isRequired,
  getStartedMachine: PropTypes.object.isRequired,
  adsType: PropTypes.number.isRequired,
};

export default PostList;
