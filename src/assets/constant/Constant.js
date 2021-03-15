import countries from './countries'

const region = {
  na: '163005.uc.r',
  emea: 'emea.ew.r',
  apac: 'apac.an.r'
}

export const ACCOUNT_API_PREFIX =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? 'https://account-dot-framy-cloud-163005.uc.r.appspot.com'
    : process.env.REACT_APP_ENVIRONMENT === 'sandbox'
    ? 'https://account-sandbox-dot-framy-cloud-163005.uc.r.appspot.com'
    : process.env.REACT_APP_ENVIRONMENT === 'staging'
    ? 'https://account-stage-dot-framy-stage.uc.r.appspot.com'
    : 'https://account-dev-dot-framy-stage.uc.r.appspot.com'

export const ADS_API_PREFIX =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? `https://ads-dot-framy-cloud-${
        window._env_ ? region[window._env_.REGION] : region.na
      }.appspot.com`
    : process.env.REACT_APP_ENVIRONMENT === 'sandbox'
    ? 'https://ads-sandbox-dot-framy-cloud-163005.uc.r.appspot.com'
    : process.env.REACT_APP_ENVIRONMENT === 'staging'
    ? 'https://ads-stage-dot-framy-stage.uc.r.appspot.com'
    : 'https://ads-dev-dot-framy-stage.uc.r.appspot.com'

export const EVENTS_API_PREFIX =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? `https://ads-ext-dot-framy-cloud-${
        window._env_ ? region[window._env_.REGION] : region.na
      }.appspot.com`
    : process.env.REACT_APP_ENVIRONMENT === 'sandbox'
    ? 'https://ads-ext-sandbox-dot-framy-cloud-163005.uc.r.appspot.com'
    : process.env.REACT_APP_ENVIRONMENT === 'staging'
    ? 'https://ads-ext-stage-dot-framy-stage.uc.r.appspot.com'
    : 'https://ads-ext-dev-dot-framy-stage.uc.r.appspot.com'

export const MEDIA_API_PREFIX =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? 'https://media-dot-framy-cloud-163005.uc.r.appspot.com'
    : process.env.REACT_APP_ENVIRONMENT === 'sandbox'
    ? 'https://media-sandbox-dot-framy-cloud-163005.uc.r.appspot.com/'
    : process.env.REACT_APP_ENVIRONMENT === 'staging'
    ? 'https://media-stage-dot-framy-stage.appspot.com'
    : 'https://media-dev-dot-framy-stage.appspot.com'

export const BASE_URL =
  process.env.REACT_APP_ENVIRONMENT === 'development'
    ? 'http://localhost:3000'
    : process.env.REACT_APP_ENVIRONMENT === 'testing'
    ? 'https://ads-builder-test-dot-framy-web-stage.uc.r.appspot.com'
    : process.env.REACT_APP_ENVIRONMENT === 'staging'
    ? 'https://ads-builder-dot-framy-web-stage.uc.r.appspot.com'
    : process.env.REACT_APP_ENVIRONMENT === 'production'
    ? 'https://business.playsee.co'
    : process.env.REACT_APP_ENVIRONMENT === 'sandbox'
    ? 'https://ads-builder-sandbox-dot-framy-web-stage.uc.r.appspot.com'
    : '/'

export const DELAY_MS = 300

export const MAP_CENTER = [18.7533963496217, 62.883783839643]

export const STRIPE_PUBLICKEY =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLICKEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLICKEY_TEST

export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export const CURRENCY = [
  {
    key: 'AED',
    decimal: 2
  },
  {
    key: 'ARS',
    decimal: 2
  },
  {
    key: 'AUD',
    decimal: 2
  },
  {
    key: 'BRL',
    decimal: 2
  },
  {
    key: 'CAD',
    decimal: 2
  },
  {
    key: 'CLP',
    decimal: 0
  },
  {
    key: 'COP',
    decimal: 0
  },
  {
    key: 'EGP',
    decimal: 2
  },
  {
    key: 'EUR',
    decimal: 2
  },
  {
    key: 'GBP',
    decimal: 2
  },
  {
    key: 'HKD',
    decimal: 2
  },
  {
    key: 'IDR',
    decimal: 0
  },
  {
    key: 'INR',
    decimal: 2
  },
  {
    key: 'IQD',
    decimal: 0
  },
  {
    key: 'JPY',
    decimal: 0
  },
  {
    key: 'KRW',
    decimal: 0
  },
  {
    key: 'MXN',
    decimal: 2
  },
  {
    key: 'MYR',
    decimal: 2
  },
  {
    key: 'NGN',
    decimal: 2
  },
  {
    key: 'NZD',
    decimal: 2
  },
  {
    key: 'PEN',
    decimal: 2
  },
  {
    key: 'PHP',
    decimal: 2
  },
  {
    key: 'PLN',
    decimal: 2
  },
  {
    key: 'RUB',
    decimal: 2
  },
  {
    key: 'SAR',
    decimal: 2
  },
  {
    key: 'SGD',
    decimal: 2
  },
  {
    key: 'THB',
    decimal: 2
  },
  {
    key: 'TRY',
    decimal: 2
  },
  {
    key: 'TWD',
    decimal: 0
  },
  {
    key: 'UAH',
    decimal: 2
  },
  {
    key: 'USD',
    decimal: 2
  },
  {
    key: 'VND',
    decimal: 0
  }
]

export const TIMEZONE = [
  {
    key: 'Pacific/Midway'
  },
  {
    key: 'Pacific/Honolulu'
  },
  {
    key: 'America/Anchorage'
  },
  {
    key: 'America/Los_Angeles'
  },
  {
    key: 'America/Tijuana'
  },
  {
    key: 'America/Chihuahua'
  },
  {
    key: 'America/Denver'
  },
  {
    key: 'America/Phoenix'
  },
  {
    key: 'America/Chicago'
  },
  {
    key: 'America/Costa_Rica'
  },
  {
    key: 'America/Mexico_City'
  },
  {
    key: 'America/Regina'
  },
  {
    key: 'America/Bogota'
  },
  {
    key: 'America/New_York'
  },
  {
    key: 'America/Barbados'
  },
  {
    key: 'America/Caracas'
  },
  {
    key: 'America/Halifax'
  },
  {
    key: 'America/Manaus'
  },
  {
    key: 'America/Santiago'
  },
  {
    key: 'America/St_Johns'
  },
  {
    key: 'America/Argentina/Buenos_Aires'
  },
  {
    key: 'America/Godthab'
  },
  {
    key: 'America/Montevideo'
  },
  {
    key: 'America/Sao_Paulo'
  },
  {
    key: 'Atlantic/South_Georgia'
  },
  {
    key: 'Atlantic/Azores'
  },
  {
    key: 'Atlantic/Cape_Verde'
  },
  {
    key: 'Europe/London'
  },
  {
    key: 'Africa/Casablanca'
  },
  {
    key: 'Europe/Amsterdam'
  },
  {
    key: 'Europe/Belgrade'
  },
  {
    key: 'Europe/Brussels'
  },
  {
    key: 'Europe/Sarajevo'
  },
  {
    key: 'Africa/Brazzaville'
  },
  {
    key: 'Africa/Windhoek'
  },
  {
    key: 'Asia/Amman'
  },
  {
    key: 'Europe/Athens'
  },
  {
    key: 'Asia/Beirut'
  },
  {
    key: 'Africa/Cairo'
  },
  {
    key: 'Europe/Helsinki'
  },
  {
    key: 'Asia/Jerusalem'
  },
  {
    key: 'Africa/Harare'
  },
  {
    key: 'Europe/Minsk'
  },
  {
    key: 'Asia/Baghdad'
  },
  {
    key: 'Asia/Kuwait'
  },
  {
    key: 'Europe/Moscow'
  },
  {
    key: 'Africa/Nairobi'
  },
  {
    key: 'Asia/Tehran'
  },
  {
    key: 'Asia/Baku'
  },
  {
    key: 'Asia/Dubai'
  },
  {
    key: 'Asia/Tbilisi'
  },
  {
    key: 'Asia/Yerevan'
  },
  {
    key: 'Asia/Kabul'
  },
  {
    key: 'Asia/Karachi'
  },
  {
    key: 'Asia/Oral'
  },
  {
    key: 'Asia/Yekaterinburg'
  },
  {
    key: 'Asia/Calcutta'
  },
  {
    key: 'Asia/Colombo'
  },
  {
    key: 'Asia/Katmandu'
  },
  {
    key: 'Asia/Almaty'
  },
  {
    key: 'Asia/Rangoon'
  },
  {
    key: 'Asia/Bangkok'
  },
  {
    key: 'Asia/Krasnoyarsk'
  },
  {
    key: 'Asia/Hong_Kong'
  },
  {
    key: 'Asia/Irkutsk'
  },
  {
    key: 'Asia/Kuala_Lumpur'
  },
  {
    key: 'Australia/Perth'
  },
  {
    key: 'Asia/Shanghai'
  },
  {
    key: 'Asia/Taipei'
  },
  {
    key: 'Asia/Seoul'
  },
  {
    key: 'Asia/Tokyo'
  },
  {
    key: 'Asia/Yakutsk'
  },
  {
    key: 'Australia/Adelaide'
  },
  {
    key: 'Australia/Darwin'
  },
  {
    key: 'Australia/Brisbane'
  },
  {
    key: 'Australia/Hobart'
  },
  {
    key: 'Pacific/Guam'
  },
  {
    key: 'Australia/Sydney'
  },
  {
    key: 'Asia/Vladivostok'
  },
  {
    key: 'Asia/Magadan'
  },
  {
    key: 'Pacific/Auckland'
  },
  {
    key: 'Pacific/Fiji'
  },
  {
    key: 'Pacific/Majuro'
  },
  {
    key: 'Pacific/Tongatapu'
  }
]

export const COUNTRY_CODE = countries

export const COUNTDOWN = 60

export const GOOGLE_STYLE = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#e9e9e9'
      }
    ]
  },
  {
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#a8b6d0'
      }
    ]
  },
  {
    featureType: 'administrative',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c1cadc'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#85e484'
      },
      {
        lightness: 75
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'administrative.province',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#94a1ba'
      },
      {
        lightness: 35
      }
    ]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f3f3f3'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    stylers: [
      {
        color: '#e8e8e8'
      }
    ]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'landscape.natural.terrain',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#eeeeee'
      },
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
      {
        color: '#d2dcd8'
      },
      {
        lightness: 25
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b0b0b0'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f2f2f2'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b4e9d0'
      },
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'simplified'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#b5afb1'
      },
      {
        lightness: 30
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f7e5dd'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.highway',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#f5f5f5'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'on'
      }
    ]
  },
  {
    featureType: 'transit.line',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#abbbc4'
      },
      {
        saturation: 5
      },
      {
        lightness: 40
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#b0c3e6'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b0c4e6'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  }
]

export const GOOGLE_SETTING = {
  center: { lat: MAP_CENTER[0], lng: MAP_CENTER[1] },
  zoom: 2,
  disableDefaultUI: true,
  styles: GOOGLE_STYLE
}

export const GA_KEY =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? process.env.REACT_APP_GA_ID_PUBLIC
    : process.env.REACT_APP_GA_ID_STAGE

export const COUNTRY_WITHOUT_ZIPCODE = [
  'AO',
  'AG',
  'AW',
  'BS',
  'BZ',
  'BJ',
  'BW',
  'BF',
  'BI',
  'CM',
  'CF',
  'KM',
  'CG',
  'CD',
  'CK',
  'CI',
  'DJ',
  'DM',
  'GQ',
  'ER',
  'FJ',
  'TF',
  'GM',
  'GH',
  'GD',
  'GN',
  'GY',
  'HK',
  'IE',
  'JM',
  'KE',
  'KI',
  'MO',
  'MW',
  'ML',
  'MR',
  'MU',
  'MS',
  'NR',
  'AN',
  'NU',
  'KP',
  'PA',
  'QA',
  'RW',
  'KN',
  'LC',
  'ST',
  'SA',
  'SC',
  'SL',
  'SB',
  'SO',
  'ZA',
  'SR',
  'SY',
  'TZ',
  'TL',
  'TK',
  'TO',
  'TT',
  'TV',
  'UG',
  'AE',
  'VU',
  'YE',
  'ZW'
]

export const STRIPE_SCRIPT_URL = 'https://js.stripe.com/v3/'

export const CDN_URL = 'https://g-web.framy.co'

export const APP_DOWNLOAD_LINKS = {
  apple:
    'https://apps.apple.com/app/apple-store/id1466926345?pt=102301809&ct=Search%20ads%20-%20Business&mt=8',
  android:
    'https://play.google.com/store/apps/details?id=com.framy.placey&referrer=utm_source%3DGoogle%26utm_medium%3Dsearch%2520ads%26utm_term%3DBusiness%26utm_campaign%3DWeb2App%2520Business'
}

export const COMPANY_SIZE = [
  {
    api: 'local',
    lang: 'local_brand'
  },
  { api: 'regional', lang: 'regional_or_national_brand' },
  { api: 'intl', lang: 'international_brand' }
]

export const LOCATIONS = [
  {
    api: '1',
    lang: '1'
  },
  {
    api: '2-5',
    lang: '2_to_5'
  },
  {
    api: '6-10',
    lang: '6_to_10'
  },
  {
    api: '11-50',
    lang: '11_to_50'
  },
  {
    api: '51-100',
    lang: '51_to_100'
  },
  {
    api: '100+',
    lang: '100+'
  },
  {
    api: 'no_loc',
    lang: 'no_physical_location'
  }
]

export const INDUSTRY = [
  { api: 'food', lang: 'food' },
  { api: 'drinks', lang: 'drinks' },
  { api: 'entertainment', lang: 'entertainment' },
  { api: 'outdoors', lang: 'outdoors_recreations' },
  { api: 'shop_service', lang: 'shop_services' },
  { api: 'nightlife', lang: 'nightlife' },
  { api: 'lodging', lang: 'lodging' },
  { api: 'travel_service', lang: 'travel_services' },
  { api: 'school', lang: 'school' },
  { api: 'others', lang: 'others' }
]

export const ACCOUNT_TYPE = [
  { api: '2', lang: 'business' },
  { api: '1', lang: 'creator' }
]

export const VIDEO_LIMIT = {
  brand: {
    minLength: 3,
    maxLength: 60
  },
  promote: {
    minLength: 3,
    maxLength: 60
  },
  common: {
    uploadedSize: 150,
    sliceSize: 8,
    sliceWidth: 448,
    sliceHeight: 768,
    fetchSize: 6
  }
}

export const IMAGE_LIMIT = {
  contact: {
    uploadedSize: 10,
    fileAmount: 3
  },
  common: {
    uploadedSize: 5
  }
}

export const START_LIMIT_DAYS = 30
export const END_LIMIT_DAYS = 90
export const PROVIDE_BY_TYPE = {
  UPLOAD_VIDEO: 0,
  OWN_VIDEO: 1,
  CUSTOMER_VIDEO: 2,
  UPLOAD_IMAGE: 3,
  TEXT_BASED_ADS: 4
}
export const VIDEO_TAB_TYPE = {
  YOUR: 'my',
  CUSTOMER: 'user'
}
export const GET_STARTED_DEFAULT_DATA = {
  tab: VIDEO_TAB_TYPE.YOUR,
  provided_by: PROVIDE_BY_TYPE.OWN_VIDEO,
  lasted_video_index: 0
}

export const USER_VIDEOS_FILTERS = [
  {
    key: 'all'
  }
]

export const MY_VIDEOS_FILTERS = [
  {
    key: 'all'
  },
  {
    key: 'claimed'
  }
]
export const EMBEDDED_COOKIE_KEY = 'embedded'

export const TEST_MODE = process.env.NODE_ENV === 'test'

export const CREATE_ADS_TYPE = {
  PROMOTE: 1,
  BRAND: 2
}

/***
 * Ads'focus options
 */
export const ADS_FOCUS_API = {
  PROFILE_VISITS: '01',
  WEBSITE_VISITS: '05',
  RECEIVE_DIRECT_MESSAGES: '02',
  RECEIVE_CALLS: '03',
  RECEIVE_EMAILS: '04'
}

export const ADS_FOCUS = [
  {
    api: ADS_FOCUS_API.PROFILE_VISITS,
    lang: 'profile_visits',
    show: [CREATE_ADS_TYPE.BRAND, CREATE_ADS_TYPE.PROMOTE]
  },
  {
    api: ADS_FOCUS_API.WEBSITE_VISITS,
    lang: 'website_visits',
    show: [CREATE_ADS_TYPE.BRAND]
  },
  {
    api: ADS_FOCUS_API.RECEIVE_DIRECT_MESSAGES,
    lang: 'receive_direct_messages',
    show: [CREATE_ADS_TYPE.PROMOTE]
  },
  {
    api: ADS_FOCUS_API.RECEIVE_CALLS,
    lang: 'receive_calls',
    show: [CREATE_ADS_TYPE.PROMOTE]
  },
  {
    api: ADS_FOCUS_API.RECEIVE_EMAILS,
    lang: 'receive_emails',
    show: [CREATE_ADS_TYPE.PROMOTE]
  }
]

/**
 * Ads Type 選項
 */

export const ADS_TYPE_OPTIONS = [
  {
    value: CREATE_ADS_TYPE.BRAND,
    lang: 'brand'
  },

  { value: CREATE_ADS_TYPE.PROMOTE, lang: 'promote' }
]

/**
 * Call to Action 選項
 */
export const CALL_TO_ACTION = [
  { api: '01', lang: 'learn_more' },
  { api: '02', lang: 'shop_now', hide: [CREATE_ADS_TYPE.PROMOTE] },
  { api: '03', lang: 'watch_more', hide: [CREATE_ADS_TYPE.PROMOTE] },
  { api: '04', lang: 'contact_us' },
  { api: '05', lang: 'book_now' },
  { api: '06', lang: 'sign_up' },
  { api: '07', lang: 'apply_now', hide: [CREATE_ADS_TYPE.PROMOTE] },
  { api: '08', lang: 'get_now' },
  {
    api: '09',
    lang: 'call_now',
    hide: [CREATE_ADS_TYPE.BRAND],
    focus: '03'
  },
  {
    api: '10',
    lang: 'send_message',
    hide: [CREATE_ADS_TYPE.BRAND],
    focus: '02'
  },
  {
    api: '11',
    lang: 'send_mail',
    hide: [CREATE_ADS_TYPE.BRAND],
    focus: '04'
  }
]

export const PAYMENT_METHOD = {
  UNSPECIFIED: 0,
  CREDIT_CARD: 1,
  PREPAY_BANK: 2,
  PAYPAL: 4
}

export const PAYMENT_ERROR = {
  NO_ERROR: 0,
  WARNING: 1,
  ERROR: 2
}

export const PROMO_ERROR = {
  NO_ERROR: 0,
  WARNING: 1,
  ERROR: 2
}

export const PROMO_ACTIVE = {
  UNSPECIFIED: 0,
  ACTIVE: 1
}

export const CREATE_ADS_STEP_LOCAL_STORAGE_KEY = 'createAds_step'

export const STRIPE_INPUT_STYLE = {
  style: {
    base: {
      color: '#314146',
      '::placeholder': {
        color: 'rgba(42, 74, 84, 0.6)'
      }
    },
    invalid: {
      color: '#ff765c'
    }
  }
}

export const POST_ENGAGEMENTS = 'post_engagements'

export const VIDEO_CUT_OFF_TIME = 60

export const CREATE_ADS_URL_PARAM = {
  TYPE: 'type'
}

export const ONLY_ENABLED_IN_STAGE =
  process.env.REACT_APP_ENVIRONMENT !== 'production'

export const MASK_TYPE = {
  clear: 'clear',
  loading: 'loading',
  authExpired: 'authExpired',
  unexpectedError: 'unexpectedError',
  downloadApp: 'downloadApp',
  timezoneCurrency: 'timezoneCurrency',
  changeEmail: 'changeEmail',
  changePwd: 'changePwd',
  welcome: 'welcome',
  transparent: 'transparent',
  addPromoCode: 'addPromoCode',
  videoPreview: 'videoPreview',
  promoLowBalance: 'promoLowBalance',
  addLocationExist: 'addLocationExist',
  paymentFailure: 'paymentFailure',
  targetAreaError: 'targetAreaError',
  update: 'update',
  continueAdDraft: 'continueAdDraft',
  sessionExpired: 'sessionExpired',
  goVerifyYourEmail: 'goVerifyYourEmail'
}

export const PAYPAL_CLIENT_ID =
  'AT39XkmUb6h2Bs_BUbZNOGMz2HH5LcalJdDAZsjcaB7lmItFwEjJ5Pa5jHAumbQPO8rsRHgok0woXipO'
export const INSIGHT_ENUM = {
  scene: {
    default: 0,
    info: 1
  },
  tab: {
    default: 0,
    detail: 1
  }
}

export const UPLOAD_IMAGE_BLUR_RADIUS = 50

export const CANVAS_RENDER_TYPE = {
  cover: 'cover',
  contain: 'contain'
}

export const MEDIA_CATEGORY = {
  ad_image: 'ad_image',
  ad_video: 'ad_video',
  ad_text: 'ad_text',
  profile_image: 'profile_image',
  profile_cover: 'profile_cover'
}

export const STATIC_VIDEO_DURATION = 10

export const SUSPENSION_SCENE = {
  TemporarySuspension: 'TemporarySuspension',
  TemporarySuspensionWithPaymentError: 'TemporarySuspensionWithPaymentError',
  TemporarySuspensionWithViolation: 'TemporarySuspensionWithViolation',
  PermanentSuspensionWithViolation: 'PermanentSuspensionWithViolation',
  PermanentSuspensionWithBothReason: 'PermanentSuspensionWithBothReason'
}

export const CALL_APP_COMMAND = {
  embeddedClose: 'embeddedClose'
}

export const TEXT_BASED_AD_BACKGROUND = `${CDN_URL}/business/textBasedAd_background_9_16.jpg`
