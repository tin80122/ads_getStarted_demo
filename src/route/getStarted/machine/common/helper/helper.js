import {
  USER_VIDEOS_FILTERS,
  MY_VIDEOS_FILTERS,
  PROVIDE_BY_TYPE,
  VIDEO_LIMIT,
  VIDEO_TAB_TYPE
} from 'assets/constant'

export const getSelfInfo = config => {
  return {
    uid: config.uid,
    profile_image_url: config.profile_image_url,
    followers_count: 0,
    is_verified: config.user_level >= 4
  }
}

export const hasPickedCond = draft => draft?.asset?.id !== ''

export const selectedVideoOrUploadedAssetCond = draft =>
  draft.id === '' && draft.asset?.id !== ''
export const hasDraftCond = draft =>
  (draft.id !== '' && draft.asset?.id !== '') ||
  selectedVideoOrUploadedAssetCond(draft)

export const formateResponseVideo = (adsContext, data) => {
  let list = []
  data.map(row =>
    list.push({
      state: adsContext,
      key: row.id,
      post: {
        id: row.id,
        cover_url: row.cover_url,
        video_url: row.video_url,
        description: row.description,
        created_at: row.created_at
      },
      provider: {
        uid: row.owner?.uid,
        profile_image_url: row.owner?.profile_image_url,
        followers_count: row.owner?.followers_count,
        is_verified: row.owner?.is_verified
      },
      place: {
        id: row.place?.id,
        name: row.place?.name,
        address: row.place?.address,
        coordinates: row.place?.coordinates
      }
    })
  )
  return list
}

export const handleResponse = (context, data, param = {}) => {
  const { shouldFilter = true } = param
  const {
    utils: { config },
    draft
  } = context.adsContext

  const {
    tab,
    videos: { list }
  } = context

  let fetchEnd = false
  let newList = []
  const selfInfo = getSelfInfo(config)

  if (data.videos?.length < VIDEO_LIMIT.common.fetchSize) {
    fetchEnd = true
  }
  //default selected video: draft.id:'',draft.asset.id:'id123', should not filter
  let FilteredData =
    selectedVideoOrUploadedAssetCond(draft) || !shouldFilter
      ? data.videos
      : data.videos.filter(row => row.id !== draft.asset?.id)
  FilteredData = FilteredData.map(row => {
    if (tab === 'my') {
      return { ...row, owner: selfInfo }
    }
    return row
  })
  newList =
    FilteredData.length === 0
      ? FilteredData
      : formateResponseVideo(context.adsContext, FilteredData)

  newList = list.concat(newList)

  return {
    fetchEnd,
    list: newList,
    pageToken: data.page_token
  }
}

/**
 * If video meet this situation, must show.
 * videoStatus.status === 'remote' : video is uploaded to backend now
 * videoStatus.status === 'local' : video is still uploading to backend now
 * videoStatus.status === null && draft.uploaded_asset.id : video has uploaded to backend, then leave and reenter createAds machine
 */
export const handleUploadingVideo = adsContext => {
  const {
    utils: { config },
    draft
  } = adsContext
  const selfInfo = getSelfInfo(config)
  const videoStatus = adsContext.uploadedVideoStatus
  const remoteVideo = adsContext.draft.uploaded_asset ?? {}
  const localVideo = adsContext.localVideo ?? {}
  const hasUploadedVideo =
    videoStatus || (videoStatus === null && draft.uploaded_asset.id)

  const video = {
    state: adsContext,
    isUploaded: true,
    key:
      videoStatus === 'remote'
        ? remoteVideo?.id
        : videoStatus === null
        ? draft.uploaded_asset?.id
        : localVideo?.id,
    post: {
      id:
        videoStatus === 'remote'
          ? remoteVideo?.id
          : videoStatus === null
          ? draft.uploaded_asset?.id
          : localVideo?.id,
      cover_url:
        videoStatus === 'remote'
          ? remoteVideo?.snapshots[localVideo?.index]
          : videoStatus === null
          ? draft.uploaded_asset?.cover_url
          : localVideo?.snapshots[localVideo?.index],
      video_url:
        videoStatus === 'remote'
          ? remoteVideo?.video_url
          : videoStatus === null
          ? draft.uploaded_asset?.video_url
          : localVideo?.file,
      description:
        videoStatus === 'remote'
          ? remoteVideo?.description
          : videoStatus === null
          ? draft.uploaded_asset?.description || ''
          : '',
      created_at: ''
    },
    source: 'my',
    provider: {
      uid: selfInfo.uid,
      profile_image_url: selfInfo.profile_image_url,
      followers_count: selfInfo.followers_count,
      is_verified: selfInfo.is_verified
    },
    place: {
      id:
        videoStatus === 'remote'
          ? remoteVideo?.place?.id
          : videoStatus === null
          ? draft.uploaded_asset?.place?.id ?? ''
          : '',
      name:
        videoStatus === 'remote'
          ? remoteVideo?.place?.name
          : videoStatus === null
          ? draft.uploaded_asset?.place?.name ?? ''
          : '',
      address:
        videoStatus === 'remote'
          ? remoteVideo?.place?.address
          : videoStatus === null
          ? draft.uploaded_asset?.place?.address ?? ''
          : '',
      coordinates:
        videoStatus === 'remote'
          ? remoteVideo?.place?.coordinates
          : videoStatus === null
          ? draft.uploaded_asset?.place?.coordinates ?? ''
          : ''
    }
  }
  return hasUploadedVideo ? video : {}
}

/**
 * If video meet this situation, must show.
 * firstLoadAsset property only set when from duplicate
 */
export const handleDuplicatedVideo = adsContext => {
  const {
    utils: { config },
    firstLoadAsset
  } = adsContext
  const selfInfo = getSelfInfo(config)
  // const hasDuplicatedVideo = firstLoadAsset?.id ?? false

  const video = {
    state: adsContext,
    key: firstLoadAsset?.id,

    post: {
      id: firstLoadAsset?.id,
      cover_url: firstLoadAsset?.cover_url,
      video_url: firstLoadAsset?.video_url,
      description: firstLoadAsset?.description,
      created_at: firstLoadAsset?.created_at
    },
    provider: { ...selfInfo },
    source: 'my',
    place: {
      id: firstLoadAsset?.place.id,
      name: firstLoadAsset?.place.name,
      address: firstLoadAsset?.place.address,
      coordinates: firstLoadAsset?.place.coordinates
    }
  }
  return video
}

/**
 * show video when meet those conditions below :
 * 1. pick one (draft.asset )!== uploading one
 * 2. pick one (draft.asset )!== duplicated one
 * 3. filter condition === true
 */
export const handlePickedVideo = (adsContext, context) => {
  const { draft, firstLoadAsset, claimedList } = adsContext
  const { filter, tab } = context
  const videoStatus = adsContext.uploadedVideoStatus
  const remoteVideo = adsContext.draft.uploaded_asset ?? {}
  const localVideo = adsContext.localVideo ?? {}
  const filterCond =
    tab === VIDEO_TAB_TYPE.YOUR
      ? filter === MY_VIDEOS_FILTERS[0].key ||
        (filter === MY_VIDEOS_FILTERS[1].key &&
          claimedList.some(item => item.id === draft.asset?.place.id)) ||
        (filter === draft.asset?.place.id &&
          claimedList.some(item => item.id === draft.asset?.place.id))
      : filter === USER_VIDEOS_FILTERS[0].key ||
        filter === draft.asset?.place.id

  const show =
    draft.asset?.id !==
      (videoStatus === 'remote'
        ? remoteVideo
        : videoStatus === null
        ? draft.uploaded_asset
        : localVideo
      ).id &&
    draft.asset?.id !== firstLoadAsset?.id &&
    draft.asset?.provided_by !== PROVIDE_BY_TYPE.TEXT_BASED_ADS //TODO: text based ads 不會出現在 list 中，待重構
  filterCond && checkTab(draft, tab)

  const video = {
    state: adsContext,
    key: draft.asset?.id,
    post: {
      id: draft.asset?.id,
      cover_url: draft.asset?.cover_url,
      video_url: draft.asset?.video_url,
      description: draft.asset?.description,
      created_at: draft.asset?.created_at
    },
    provider: {
      uid: draft.asset?.owner?.uid,
      profile_image_url: draft.asset?.owner?.profile_image_url,
      followers_count: draft.asset?.owner?.followers_count,
      is_verified: draft.asset?.owner?.is_verified
    },
    place: {
      id: draft.asset?.place?.id,
      name: draft.asset?.place?.name,
      address: draft.asset?.place?.address,
      coordinates: draft.asset?.place?.coordinates
    }
  }
  return show ? video : {}
}

const addRow = (list, row) => {
  list.push(row)
}

const checkPickedData = (newList, pickedVideo) => {
  if (pickedVideo.post?.id) {
    addRow(newList, pickedVideo)
  }
}

const checkDuplicateData = (newList, duplicatedVideo, pickedVideo) => {
  if (duplicatedVideo.post?.id) {
    addRow(newList, duplicatedVideo)
  }
  checkPickedData(newList, pickedVideo)
}

const handleRestVideo = (newList, restVideo) => {
  restVideo.forEach(row => {
    newList.push(row)
  })
}

const filterSameVideo = (newList, restVideo) => {
  const ids = newList.map(row => row.post.id)

  const filter = restVideo.reduce((accumulator, currentItem) => {
    if (!ids.includes(currentItem.post?.id)) accumulator.push(currentItem)
    return accumulator
  }, [])
  return filter
}

export const setOrderOfList = (
  uploadedVideo,
  duplicatedVideo,
  pickedVideo,
  restVideo
) => {
  const newList = []

  if (uploadedVideo.post?.id) {
    addRow(newList, uploadedVideo)
    checkDuplicateData(newList, duplicatedVideo, pickedVideo)
  } else {
    checkDuplicateData(newList, duplicatedVideo, pickedVideo)
  }

  const restVideoWithFiltered = filterSameVideo(newList, restVideo)
  handleRestVideo(newList, restVideoWithFiltered)
  return newList
}

const checkTab = (draft, tab) => {
  return (
    (draft.asset?.provided_by === PROVIDE_BY_TYPE.CUSTOMER_VIDEO &&
      tab === 'user') ||
    (draft.asset?.provided_by !== PROVIDE_BY_TYPE.CUSTOMER_VIDEO &&
      tab === 'my')
  )
}

export const getDefaultFilterVal = tab => {
  return tab === VIDEO_TAB_TYPE.CUSTOMER
    ? USER_VIDEOS_FILTERS[0].key
    : MY_VIDEOS_FILTERS[0].key
}

export const isDefaultFilter = (filter, tab) =>
  filter === getDefaultFilterVal(tab)
