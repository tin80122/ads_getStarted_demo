import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

// import useTracker from 'hooks/useTracker'

import { TEXT_BASED_AD_BACKGROUND } from "assets/constant";
import { ReactComponent as Picked } from "assets/icon/chat_room_select.svg";
import { ReactComponent as Unselect } from "assets/icon/chat_room-unselect.svg";
import { PROVIDE_BY_TYPE } from "assets/constant";

import "./TextBaseAds.scss";

const TextBaseAds = ({ send, draft }) => {
  const { t } = useTranslation();
  // const { setEventTracker } = useTracker()
  const {
    asset: { provided_by },
  } = draft;

  const isPicked = provided_by === PROVIDE_BY_TYPE.TEXT_BASED_ADS;

  const handleOnClick = useCallback((e) => {
    e.stopPropagation();
    const asset = {
      id: "tmpTextBasedAdId",
      description: "",
      provided_by: PROVIDE_BY_TYPE.TEXT_BASED_ADS,
      place: {
        id: "",
        name: "",
        address: "",
        coordinates: [],
      },
      cover_url: "",
      video_url: "",
      created_at: "",
      owner: {},
    };

    //send({ type: adsEventEnum.UPDATE_POST_SELECT, payload: asset })
  }, []);
  return (
    <div className={"textBaseAds"}>
      <div className={"container"}>
        <div className={"cover"}>
          <img src={TEXT_BASED_AD_BACKGROUND} alt={"text-Based Ad"} />
          <div className={"title"}>{t("common.text_based_ad")}</div>
          <div className={"gradient"} />
          {isPicked ? (
            <Picked name="select" onClick={handleOnClick} />
          ) : (
            <Unselect name="unselect" onClick={handleOnClick} />
          )}
        </div>
      </div>
    </div>
  );
};

TextBaseAds.propTypes = {};

TextBaseAds.defaultProps = {};

export default TextBaseAds;
