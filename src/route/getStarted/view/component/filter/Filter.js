import React, { useState, useCallback, useEffect } from "react";
import Select from "component/select";
import { useTranslation } from "react-i18next";
import useTracker from "hooks/useTracker";
import { USER_VIDEOS_FILTERS, MY_VIDEOS_FILTERS } from "assets/constant";
import uuid from "uuid/v1";

import "./Filter.scss";

const Filter = ({ source, claimedList, filter, setFilter }) => {
  const { setEventTracker } = useTracker();
  const { t } = useTranslation();
  const [optionsHolder, setOptionsHolder] = useState([]);

  const filterClickGATracker = useCallback(() => {
    setEventTracker(
      "CreateAds",
      "GetStarted_LocationListClick",
      "LocationSelect"
    );
  }, [setEventTracker]);

  const filterSelectGATracker = useCallback(() => {
    setEventTracker(
      "CreateAds",
      "GetStarted_LocationListSelect",
      "LocationSelect"
    );
  }, [setEventTracker]);

  useEffect(() => {
    setOptionsHolder(
      source === "my"
        ? Array.from(MY_VIDEOS_FILTERS, (x, index) => ({
            name:
              x.key === "all" ? t("common.all_videos") : t(`filters.${x.key}`),
            value: x.key,
            key: uuid(),
          })).concat(claimedList)
        : Array.from(USER_VIDEOS_FILTERS, (x) => ({
            name: x.key === "all" ? t(`filters.claimed`) : "",
            value: x.key,
            key: uuid(),
          })).concat(claimedList)
    );
  }, [claimedList, source, t]);

  return (
    <div className="filter">
      <Select
        {...{
          className: optionsHolder.length === 0 ? "disabled" : "",
          onClick: filterClickGATracker,
          selected: filter,
          setter: (e) => {
            setFilter(e);
            filterSelectGATracker();
          },
          options: optionsHolder.map((option) => ({
            value: option.value,
            key: option.key,
            name: option.name,
          })),
        }}
      />
    </div>
  );
};
export default Filter;
