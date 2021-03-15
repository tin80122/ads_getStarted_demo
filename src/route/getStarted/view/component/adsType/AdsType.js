import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'

import FormItem from 'component/formItem'
import Select from 'component/select'
import GenerateAdsTypeOption from '../../helper/GenerateAdsTypeOption'
import { convertAdsTypeNumberToString } from 'assets/helper/ConvertAdsTypeNumberToString'

import './AdsType.scss'

const AdsType = ({ type, control, handleAdsTypeChange, clearErrors }) => {
  const { t } = useTranslation()
  const options = useMemo(() => GenerateAdsTypeOption(t), [t])
  const stringType = convertAdsTypeNumberToString(type)

  return (
    <>
      <FormItem
        className={{
          container: 'ads-type'
        }}
        label={t('common.ads_type')}
        message={t(`campaign.get_started.ads_type.${stringType}.description`)}
      >
        <Controller
          control={control}
          name='ads_type'
          defaultValue={type.toString()}
          render={({ onChange, ref, value }) => (
            <Select
              {...{
                options,
                setter: value => {
                  onChange(value)
                  clearErrors('email')
                  clearErrors('web')
                  clearErrors('phone')
                  if (typeof handleAdsTypeChange === 'function')
                    handleAdsTypeChange(value)
                },
                selected: value,
                ref
              }}
            />
          )}
        />
      </FormItem>
    </>
  )
}
export default AdsType
