import uuid from "uuid/v1";
import { ADS_FOCUS } from "assets/constant";

export default function GenerateAdsFocusOption(t, type) {
  return ADS_FOCUS.reduce((accumulator, currentItem) => {
    const { show, api, lang } = currentItem;

    const filtered = show.some((campaignType) => campaignType === type);

    if (filtered) {
      const newItem = {
        name: t(`campaign.get_started.ads_focus.${lang}`),
        value: api,
        key: uuid(),
      };
      return [...accumulator, newItem];
    }

    return accumulator;
  }, []);
}
