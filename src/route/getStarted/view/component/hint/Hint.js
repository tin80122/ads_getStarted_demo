import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { VIDEO_LIMIT } from 'assets/constant'
import './Hint.scss'

const Hint = ({ adsType }) => {
  const { t } = useTranslation()

  return (
    <div className='upload-rule'>
      {t('campaign.add_video.rule_aspect_ratio')}
      <br />
      {adsType === 'brand'
        ? t('campaign.add_video.rule_length', {
            min: VIDEO_LIMIT.brand.minLength,
            max: VIDEO_LIMIT.brand.maxLength
          })
        : t('campaign.add_video.rule_length', {
            min: VIDEO_LIMIT.promote.minLength,
            max: VIDEO_LIMIT.promote.maxLength
          })}
    </div>
  )
}

export default memo(Hint)
