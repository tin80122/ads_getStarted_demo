import uuid from "uuid/v1";
import { ADS_TYPE_OPTIONS } from "assets/constant";

export default function GenerateAdsTypeOption(t) {
  const currentItem = ADS_TYPE_OPTIONS.map((item) => ({
    name: t(`campaign.title.${item.lang}`),
    value: item.value.toString(),
    key: uuid(),
  }));

  return currentItem;
}
