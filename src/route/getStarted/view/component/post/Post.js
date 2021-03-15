import React, { useCallback, useMemo } from "react";

import { useTranslation } from "react-i18next";
import CountToKMB from "assets/helper/CountToKMB";
import IsUploadFromAds from "assets/helper/IsUploadFromAds";
import useTracker from "hooks/useTracker";
import clsx from "clsx";

import { ReactComponent as Picked } from "assets/icon/chat_room_select.svg";
import { ReactComponent as Unselect } from "assets/icon/chat_room-unselect.svg";
import { ReactComponent as NoPhoto } from "assets/icon/no_photo.svg";
import { PROVIDE_BY_TYPE } from "assets/constant";
import "./Post.scss";

const Post = ({
  draft,
  post,
  source,
  provider,
  place,
  setPreview,
  state,
  send,
}) => {
  const { setEventTracker } = useTracker();
  const { t } = useTranslation();

  const generateProvidedBy = useMemo(() => {
    let result;
    if (source === "user") {
      result = PROVIDE_BY_TYPE.CUSTOMER_VIDEO;
    } else {
      result = PROVIDE_BY_TYPE.OWN_VIDEO;

      if (
        post.id === state.context.draft.uploaded_asset.id ||
        post.id === state.context.localVideo.id
      ) {
        result =
          state.context.draft.uploaded_asset.provided_by ||
          PROVIDE_BY_TYPE.UPLOAD_VIDEO;
      }

      if (post.id === state.context.firstLoadAsset?.id) {
        result =
          state.context.firstLoadAsset.provided_by ||
          PROVIDE_BY_TYPE.UPLOAD_VIDEO;
      }
    }
    return result;
  }, [source, post.id, state.context]);

  const handleOnClick = useCallback(
    (e) => {
      e.stopPropagation();
      const asset = {
        id: post.id,
        description: post.description,
        provided_by: generateProvidedBy,
        cover_url: post.cover_url,
        video_url: post.video_url,
        place: {
          id: place.id,
          name: place.name,
          address: place.address,
          coordinates: place.coordinates,
        },
        owner: {
          uid: provider.uid,
          profile_image_url: provider.profile_image_url,
          followers_count: provider.followers_count,
          is_verified: provider.is_verified,
          showDot: !IsUploadFromAds(generateProvidedBy),
        },
        created_at: post.created_at,
      };

      //send({ type: adsEventEnum.UPDATE_POST_SELECT, payload: asset })
    },
    [
      place.address,
      place.coordinates,
      place.id,
      place.name,
      post.cover_url,
      post.created_at,
      post.description,
      post.id,
      post.video_url,
      provider.followers_count,
      provider.profile_image_url,
      provider.uid,
      generateProvidedBy,
      provider.is_verified,
    ]
  );

  return (
    <div className={`post-item${source === "user" ? " user" : ""}`}>
      <div
        className={`post${post.id === draft.asset.id ? " picked" : ""}`}
        onClick={() => {
          source === "user"
            ? setEventTracker(
                "CreateAds",
                "GetStarted_CustomerVideosClick",
                "VideoSelect"
              )
            : setEventTracker(
                "CreateAds",
                "GetStarted_YourVideosClick",
                "VideoSelect"
              );
          post.cover_url &&
            setPreview({
              asset: {
                id: post.id,
                description: post.description,
                cover_url: post.cover_url,
                video_url: post.video_url,
                provided_by: generateProvidedBy,
                owner: {
                  uid: provider.uid,
                  profile_image_url: provider.profile_image_url,
                  followers_count: provider.followers_count,
                  is_verified: provider.is_verified,
                  showDot: !IsUploadFromAds(generateProvidedBy),
                },
                place: {
                  id: place.id,
                  name: place.name,
                  address: place.address,
                  coordinates: place.coordinates,
                },
              },
              created_at: post.created_at,
              message: post.message,
            });
        }}
      >
        <div className={clsx("cover", { self: source === "my" })}>
          <img
            src={post.cover_url}
            alt={post.id}
            data-missing={`${t("video.uploading.processing")}…`}
          />
          {post.id === draft.asset.id ? (
            <Picked
              name="select"
              onClick={(e) => {
                handleOnClick(e);
              }}
            />
          ) : (
            <Unselect
              name="unselect"
              onClick={(e) => {
                handleOnClick(e);
              }}
            />
          )}
          {!post.cover_url && (
            <div className="cover-blocker">
              <span>{`${t("video.uploading.processing")}…`}</span>
            </div>
          )}
        </div>
        {source === "user" && (
          <div className="provider">
            <div className="headshot">
              {provider.profile_image_url ? (
                <img src={provider.profile_image_url} alt={provider.uid} />
              ) : (
                <NoPhoto name="no-photo" />
              )}
            </div>
            <div className="info">
              <div className="name">{provider.uid}</div>
              <div className="sub">
                {CountToKMB(provider.followers_count)}{" "}
                <font>
                  {provider.followers_count < 2
                    ? t("common.follower")
                    : t("common.followers")}
                </font>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Post;
