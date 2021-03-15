/**
 * @readonly
 * @enum
 */
const errorCode = {
  UNKNOWN_ERROR: 999,
  ACCOUNT_NOT_FOUND: 1,
  INCORRECT_ACCOUNT_OR_PASSWORD: 2,
  INCORRECT_USER_LEVEL: 3,
  ACCOUNT_INFORMATION_IS_INCOMPLETE: 4,
  ACCOUNT_EXISTS: 5,
  INVALID_REQUEST: 6,
  ACCOUNT_NOT_ACTIVATED: 7,
  TEMPORARILY_UNAVAILABLE: 8,
  ACCOUNT_SUSPENSION: 9,
  INVALID_ACCOUNT_TYPE: 11,
  FILE_NOT_FOUND: 31,
  HTML_PARSER_FAIL: 32,
  PDF_GENERATE_FAIL: 33,
  READ_FILE_ERROR: 34,
  EMAIL_NOT_FOUND: 42,
  REQUEST_EMAIL_MISMATCHED: 43,
  REQUEST_EXPIRED: 44,
  EMAIL_EXISTS: 45,
  UID_EXISTS: 46,
  CLIENT_NOT_ALLOWED: 47,
  PROMOTION_CODE_REDEEMED_ALREADY: 85,
  INVALID_COUPON: 86,
  COUPON_IS_NOT_ELIGIBLE: 87,
  PROMOTION_CODE_EXPIRED: 88,
  INVALID_PROMOTION_CODE: 89,
  INVALID_PAYMENT_METHOD: 90,
  UNPAID_BILLS_NOT_FOUND: 91,
  PAYMENT_ERROR: 92,
  UNSUPPORTED_CURRENCY: 93,
  UNPAID_SETTLEMENTS_NOT_FOUND: 94,
  PAYMENT_ISSUES_NOT_FOUND: 95,
  PAYMENT_AMOUNT_TOO_SMALL: 96,
  PAYMENT_AMOUNT_TOO_LARGE: 97,
  UNPAID_INVOICES_NOT_FOUND: 98,
  UNSUPPORTED_COUNTRY: 99,
  API_ERROR: 100,
  OBJECT_NOT_FOUND: 101,
  NOT_SUPPORTED_YET: 102,
  OPERATION_NOT_ALLOWED: 103,
  REQUEST_OBJECT_ID_ERROR: 200,
  RETRIEVE_FILE_ERROR: 201,
  FILE_IS_PROCESSING: 202,
  UNSUPPORTED_MEDIA_CATEGORY: 203,
  UNSUPPORTED_MEDIA_TYPE: 204,
  INVALID_CAMPAIGN_TYPE: 300,
  INVALID_CAMPAIGN_NAME: 301,
  INVALID_AUDIENCE_TARGET: 302,
  INVALID_SCHEDULE_FORMAT: 303,
  INVALID_BUDGET_AMOUNT: 304,
  INVALID_BIDDING_AMOUNT: 305,
  INVALID_CAMPAIGN_LOCATION: 306,
  INVALID_CAMPAIGN_RADIUS: 307,
  CAMPAIGN_NOT_FOUND: 308,
  INVALID_PLACEMENT: 309,
  INVALID_LAT_OR_LNG_BOUNDS: 310,
  CAMPAIGN_AD_NOT_FOUND: 311,
  INVALID_AD_PROVIDER: 312,
  CAMPAIGN_DRAFT_NOT_FOUND: 313,
  INVALID_TIMEZONE: 314,
  PAYMENT_ISSUE_NOT_RESOLVED_YET: 315,
  CAMPAIGN_COMPLETED_ALREADY: 316,
  INVALID_ASSET_PLACE: 317,
  INVALID_ASSET_COORDINATES: 318,
  INVALID_TARGET_AREA: 319,
  PLACE_NOT_FOUND: 330,
  CLAIM_PLACE_ERROR: 331,
  EXCEEDS_THE_CLAIMING_LIMIT: 332,
  PLACE_IS_CLAIMED_ALREADY: 333,
  CLAIM_CODE_IS_EXPIRED: 334,
  CLAIM_CODE_IS_INCORRECT: 335,
  CLAIMING_DRAFT_NOT_FOUND: 336,
  NO_BIDDER_MATCHED: 400,
  INVALID_LAT_OR_LNG_POSITION: 401,
  // INVALID_LAT_OR_LNG_BOUNDS: 402, // TODO: duplicate with 310
  INVALID_SETTLEMENT_AMOUNT: 403,
  BID_SETTLEMENT_NOT_FOUND: 404,
}

export default errorCode