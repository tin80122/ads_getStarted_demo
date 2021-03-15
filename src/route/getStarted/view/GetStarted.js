import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
  useMemo,
} from "react";
import { useMachine } from "@xstate/react";
import getStartedMachine from "../machine/getStarted";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import uuid from "uuid/v1";
import clsx from "clsx";
import Upload from "./component/upload";

import {
  VIDEO_LIMIT,
  PROVIDE_BY_TYPE,
  CREATE_ADS_TYPE,
  ADS_FOCUS_API,
} from "assets/constant";
import { setSwitchAdsTypeValue } from "../machine/common/eventEnum";
import { ConfigContext } from "context/config";
import { convertAdsTypeNumberToString } from "assets/helper/ConvertAdsTypeNumberToString";
import { MaskContext } from "context/mask";
import GetLocalDateTime from "assets/helper/GetLocalDateTime";
import MaskDispatchType from "assets/helper/maskDispatchType";
import useTracker from "hooks/useTracker";
import QuestionMarkInfo from "component/questionMarkInfo";
import Name from "component/name";
import AdsFocus from "./component/adsFocus";
import AdsType from "./component/adsType";
import PostList from "./component/postList";
import GenerateAdsFocusOption from "./helper/GenerateAdsFocusOption";

import "./GetStarted.scss";

const GetStarted = () => {
  const [state, send] = useMachine(getStartedMachine);
  const { context } = state;
  const { t } = useTranslation();
  const { config } = useContext(ConfigContext);
  const { mask, dispatchMask } = useContext(MaskContext);
  const { setEventTracker, setScreenTracker } = useTracker();
  const {
    control,
    register,
    errors,
    watch,
    clearErrors,
    trigger,
    setValue,
  } = useFormContext();

  const {
    draft,
    profile,
    utils: { timezone },
  } = context;
  const now = GetLocalDateTime({ timezone });

  const ads_type = Number(watch("ads_type")) || draft?.type;

  const {
    focus_type,
    url: draftUrl,
    phone: draftPhone,
    country_code: draftCountryCode,
    email: draftEmail,
  } = draft;

  const {
    public_country_code: profileCountryCode,
    public_phone: profilePhone,
    public_email: profileEmail,
    redirect_page,
  } = profile;

  const firstDraftName = useRef(draft.name);

  const focusTypeOptions = useMemo(() => GenerateAdsFocusOption(t, ads_type), [
    t,
    ads_type,
  ]);

  const [phoneValue, setPhoneValue] = useState({
    country_code: draftCountryCode ? draftCountryCode : profileCountryCode,
    phone: draftPhone ? draftPhone : profilePhone,
  });

  const handleMapData = useCallback(
    (data, additionData) => {
      const { focus_type, web, email, ads_type } = data;
      const result = {
        draft: {
          type: Number(ads_type),
          name: watch("name").trim(),
          focus_type,
          url: web,
          phone: phoneValue.phone,
          country_code: phoneValue.country_code,
          email,
          ...additionData,
        },
      };
      return result;
    },
    [watch, phoneValue.country_code, phoneValue.phone]
  );

  const handleSelectAVideoPopup = useCallback(() => {
    dispatchMask(
      MaskDispatchType.update({
        topic: t("campaign.add-video.hint.no-video"),
        options: [
          {
            name: t("common.ok"),
            handleClick: () => {
              dispatchMask(MaskDispatchType.clear());
            },
            key: uuid(),
          },
        ],
      })
    );
  }, [dispatchMask, t]);

  const handleProvidedByTracker = useCallback(
    (provided_by) => {
      switch (provided_by) {
        case PROVIDE_BY_TYPE.UPLOAD_VIDEO: {
          setEventTracker(
            "CreateAds",
            "GetStarted_UploadedVideosSelect",
            "AdTypeSelect"
          );
          break;
        }
        case PROVIDE_BY_TYPE.UPLOAD_IMAGE: {
          setEventTracker(
            "CreateAds",
            "GetStarted_UploadedPhotoSelect",
            "AdTypeSelect"
          );
          break;
        }
        case PROVIDE_BY_TYPE.TEXT_BASED_ADS: {
          setEventTracker(
            "CreateAds",
            "GetStarted_TextAdSelect",
            "AdTypeSelect"
          );
          break;
        }
        case PROVIDE_BY_TYPE.OWN_VIDEO: {
          setEventTracker(
            "CreateAds",
            "GetStarted_YourProfileVideosSelect",
            "AdTypeSelect"
          );
          break;
        }
        case PROVIDE_BY_TYPE.CUSTOMER_VIDEO: {
          setEventTracker(
            "CreateAds",
            "GetStarted_CustomerVideosSelect",
            "AdTypeSelect"
          );
          break;
        }
        default:
      }
    },
    [setEventTracker]
  );

  const handleAdsFocusTracker = useCallback(
    (type, adFocus) => {
      switch (adFocus) {
        case "01":
          setEventTracker(
            "CreateAds",
            type === CREATE_ADS_TYPE.PROMOTE
              ? "GetStarted_AdFocus_ProfilePL"
              : "GetStarted_AdFocus_ProfileBA",
            "AdFocusType"
          );
          break;
        case "02":
          setEventTracker(
            "CreateAds",
            "GetStarted_AdFocus_MessagePL",
            "AdFocusType"
          );
          break;
        case "03":
          setEventTracker(
            "CreateAds",
            "GetStarted_AdFocus_CallsPL",
            "AdFocusType"
          );
          break;
        case "04":
          setEventTracker(
            "CreateAds",
            "GetStarted_AdFocus_EmailsPL",
            "AdFocusType"
          );
          break;
        case "05":
          setEventTracker(
            "CreateAds",
            "GetStarted_AdFocus_WebsiteBA",
            "AdFocusType"
          );
          break;
        default:
      }
    },
    [setEventTracker]
  );

  useImperativeHandle(
    ref,
    () => ({
      mapData: handleMapData,
      additionValidate: (callback, additionData) => {
        if (
          !(draft.asset.id || additionData?.asset?.id) &&
          draft.asset.provided_by !== PROVIDE_BY_TYPE.TEXT_BASED_ADS
        ) {
          handleSelectAVideoPopup();
          setEventTracker(
            "CreateAds",
            "GetStarted_VideoEmptyDialogShow",
            "DialogShow"
          );
        } else {
          callback();
        }
      },
      // prevTracker,
      nextTracker: () => {
        setEventTracker("CreateAds", "GetStarted_Next", "NextStep");
        if (draft.focus_type)
          handleAdsFocusTracker(draft.type, draft.focus_type);
      },
      nextDoneTracker: () => {
        if (draft.asset.id) handleProvidedByTracker(draft.asset.provided_by);
      },
      successCallback: () => {
        const { isOpen, type } = mask;
        if (isOpen && type === "videoPreview") {
          // when triggering pick and next
          setEventTracker("CreateAds", "GetStarted_VideoNextClick", "NextStep");
        }
      },
    }),
    [
      handleMapData,
      draft.asset.id,
      draft.asset.provided_by,
      draft.focus_type,
      draft.type,
      handleSelectAVideoPopup,
      setEventTracker,
      handleAdsFocusTracker,
      handleProvidedByTracker,
      mask,
    ]
  );

  const generationDefaultName = useCallback(
    (type) => {
      return `${now.month}${now.day} - ${
        Number(type) === CREATE_ADS_TYPE.BRAND
          ? t("campaign.title.brand")
          : t("campaign.name.placeHolder.promote")
      }`;
    },
    [now.day, now.month, t]
  );

  const handleAdsTypeChange = useCallback(
    (type) => {
      const IsNameChange =
        watch("name") !== generationDefaultName(CREATE_ADS_TYPE.BRAND) &&
        watch("name") !== generationDefaultName(CREATE_ADS_TYPE.PROMOTE);

      const defaultName = generationDefaultName(type);

      if (!IsNameChange || watch("name").trim() === "") {
        setValue("name", defaultName);
        clearErrors("name");
        // send(updateContextEvent({ draft: { ...draft, name: defaultName } }));
      }
      state.children.getStartedMachine.send(setSwitchAdsTypeValue(type));
    },
    [
      draft,
      generationDefaultName,
      clearErrors,
      setValue,
      watch,
      send,
      state.children.getStartedMachine,
    ]
  );

  const handleNameAdsChange = useCallback(
    (value) => {
      //send(updateContextEvent({ draft: { ...draft, name: value.trim() } }));
    },
    [draft, send]
  );

  /** ga event tracker */
  useEffect(() => {
    setScreenTracker("Web_CreateAds_GetStarted");
  }, [send, setScreenTracker]);

  useEffect(() => {
    if (draft.type === CREATE_ADS_TYPE.BRAND) {
      setScreenTracker("Web_CreateAds_GetStartedBA");
    } else if (draft.type === CREATE_ADS_TYPE.PROMOTE) {
      setScreenTracker("Web_CreateAds_GetStartedPL");
    }
  }, [setScreenTracker, draft.type]);

  useEffect(() => {
    const focusType = watch("focus_type") || draft?.focus_type;
    const newFocusType = focusTypeOptions.find((item) => {
      return item.value === focusType;
    });

    setValue("focus_type", newFocusType?.value || ADS_FOCUS_API.PROFILE_VISITS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ads_type]);

  return (
    <div className="get-started">
      {state.matches("ad.getStarted.common.info") && (
        <QuestionMarkInfo
          data={[
            {
              caption: "common.ad_focus",
              content: "ads_builder.info.step2.content_2",
            },
            {
              caption: "ads_builder.info.select_a_video.caption",
              content: "ads_builder.info.select_a_video.content",
            },
            {
              caption: "ads_builder.info.video_specifications.caption",
              content: `${t("campaign.add_video.rule_aspect_ratio")}\n${
                draft.type === CREATE_ADS_TYPE.BRAND
                  ? t("campaign.add_video.rule_length", {
                      min: VIDEO_LIMIT.brand.minLength,
                      max: VIDEO_LIMIT.brand.maxLength,
                    })
                  : t("campaign.add_video.rule_length", {
                      min: VIDEO_LIMIT.promote.minLength,
                      max: VIDEO_LIMIT.promote.maxLength,
                    })
              }`,
            },
          ]}
        />
      )}
      <div
        className={clsx("create-ads-wrapper", {
          collapse: state.matches("ad.getStarted.common.info"),
        })}
      >
        <AdsType
          {...{
            type: ads_type,
            clearErrors,
            control,
            handleAdsTypeChange,
          }}
        />
        <Name
          {...{
            name: "name",
            caption: t("campaign.name.caption"),
            control,
            errors,
            validateRules: {
              validate: {
                required: (value) =>
                  value.trim().length !== 0 || t("common.required"),
              },
            },
            maxInputLength: 40,
            handleChange: handleNameAdsChange,
            defaultName:
              firstDraftName.current || generationDefaultName(ads_type),
          }}
        />
        <AdsFocus
          {...{
            focus_type,
            web: draftUrl ? draftUrl : redirect_page,
            phoneValue,
            setPhoneValue,
            email: draftEmail ? draftEmail : profileEmail,
            type: ads_type,
            control,
            register,
            errors,
            watch,
            clearErrors,
            trigger,
            options: focusTypeOptions,
          }}
        />

        <div className="select-video-caption">{t("common.ad_content")}</div>
        <div className="select-video-description">
          {t("campaign.add_video.ad_description")}
        </div>

        <Upload {...{ send, type: convertAdsTypeNumberToString(ads_type) }} />

        {state.children.getStartedMachine && (
          <PostList
            state={state}
            adsType={ads_type}
            send={send}
            config={config}
            getStartedMachine={state.children.getStartedMachine}
          />
        )}
      </div>
    </div>
  );
};

export default forwardRef(GetStarted);
