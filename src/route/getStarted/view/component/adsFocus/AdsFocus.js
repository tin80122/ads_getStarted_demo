import React from 'react'
import { useTranslation } from 'react-i18next'
import { Controller } from 'react-hook-form'

import FormItem from 'component/formItem'
import Select from 'component/select'
import Phone from 'component/input/phone'
import Email from 'component/input/email'
import Url from 'component/input/url'

import { ADS_FOCUS_API } from 'assets/constant'

import './AdsFocus.scss'

const AdsFocus = ({
  focus_type,
  web,
  phoneValue,
  setPhoneValue,
  email,
  control,
  register,
  trigger,
  errors,
  watch,
  clearErrors,
  options
}) => {
  const { t } = useTranslation()

  const watchFocusType = watch('focus_type')

  return (
    <>
      <FormItem
        className={{
          container: 'ads-focus'
        }}
        label={t('common.ads_focus')}
      >
        <Controller
          control={control}
          name='focus_type'
          defaultValue={focus_type || ADS_FOCUS_API.PROFILE_VISITS}
          render={({ onChange, ref, value }) => (
            <>
              <Select
                {...{
                  options,
                  setter: e => {
                    onChange(e)
                    clearErrors('email')
                    clearErrors('web')
                    clearErrors('phone')
                  },
                  selected: value,
                  ref
                }}
              />
            </>
          )}
        />
      </FormItem>

      {watchFocusType === ADS_FOCUS_API.RECEIVE_CALLS && (
        <Phone
          {...{
            control,
            errors,
            setPhoneValue,
            phoneValue,
            trigger,
            placeholder: t('campaign.get_started.phone.placeholder'),
            required: true,
            defaultVal: phoneValue.country_code + phoneValue.phone
          }}
        />
      )}
      {watchFocusType === ADS_FOCUS_API.RECEIVE_EMAILS && (
        <Email
          {...{
            errors,
            register,
            control,
            showDot: false,
            checkEmailToggle: false,
            trimMaxLen: true,
            title: '',
            required: true,
            defaultVal: email,
            placeholder: t('common.enter_email')
          }}
        />
      )}

      {watchFocusType === ADS_FOCUS_API.WEBSITE_VISITS && (
        <Url
          {...{
            control,
            errors,
            title: t('common.website'),
            placeholder: t('campaign.enter_url.placeHolder'),
            required: true,
            defaultVal: web
          }}
        />
      )}
    </>
  )
}
export default AdsFocus
