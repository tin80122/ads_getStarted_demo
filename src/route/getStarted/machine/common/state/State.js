import {
  USER_VIDEOS_FILTERS,
  MY_VIDEOS_FILTERS,
  VIDEO_TAB_TYPE,
  GET_STARTED_DEFAULT_DATA
} from 'assets/constant'
import { actions } from 'xstate'

const { choose, log } = actions

export const checkHasTabState = {
  id: 'checkHasTab',
  entry: [
    log('entry checkHasTabState'),
    'showLoadingComponent',
    'RestAxiosToken'
  ],
  exit: ['closeLoadingComponent'],
  invoke: {
    src: {
      type: 'FetchingVideosAPI',
      payload: {
        tab: VIDEO_TAB_TYPE.CUSTOMER,
        filter: USER_VIDEOS_FILTERS[0].key
      }
    },
    onDone: {
      actions: choose([
        {
          cond: 'HasVideos',
          actions: ['UpdateTemporaryVideos', 'UpdateHasTab']
        }
      ]),
      target: 'checkFlow'
    },
    onError: { actions: ['handleApiError'] }
  }
}

export const resetSwitchTabValue = tab => [
  {
    type: 'UpdateTab',
    tab
  },
  {
    type: 'ResetFilter',
    tab
  }
]

const handleOrSaveDataActions = choose([
  {
    cond: { type: 'HasPicked', hasPicked: true },
    actions: [log('HasPicked hasPicked true'), 'HandleDataAndSave']
  },
  {
    cond: { type: 'HasPicked', hasPicked: false },
    actions: [log('HasPicked hasPicked false'), 'UpdateVideos']
  }
])

export const checkDefaultFlowState = {
  id: 'checkFlow',
  entry: [log('entry checkDefaultFlowState')],
  always: [
    {
      cond: {
        type: 'IdentifyFilter',
        isDefaultFilter: true,
        hasDraft: true
      },
      actions: log('all,has draft'),
      target: '#checkDraftTabIsMy'
    },
    {
      cond: {
        type: 'IdentifyFilter',
        isDefaultFilter: true,
        hasDraft: false
      },
      actions: log('filter all, no draft'),
      target: '#checkHasMyVideo'
    },
    {
      cond: {
        type: 'IdentifyFilter',
        isDefaultFilter: false
      },
      actions: [
        log('filter other'),
        'HandleShouldSwitchTab',
        'HandleShouldResetFilter'
      ],
      target: 'fetchVideo'
    }
  ]
}

export const checkDraftTabIsMyState = {
  id: 'checkDraftTabIsMy',
  always: [
    {
      cond: { type: 'CheckDraftTabIsMy', DraftTabIsMy: true },
      actions: log('DraftTabIsMy: true'),
      target: '#fetchVideo'
    },
    {
      cond: { type: 'CheckDraftTabIsMy', DraftTabIsMy: false },
      actions: [
        log('DraftTabIsMy: false'),
        {
          type: 'UpdateTab',
          tab: VIDEO_TAB_TYPE.CUSTOMER
        },
        'HandleShouldResetFilter',
        'ReplaceTemporaryVideoToVideo'
      ],
      target: 'done'
    }
  ]
}

export const setDefaultVideoState = {
  id: 'setDefaultVideo',
  always: [
    {
      actions: [
        choose([
          {
            cond: { type: 'HasContextVideos', hasData: true },
            actions: ['SendDraftAssetToParent']
          },
          {
            cond: { type: 'HasContextVideos', hasData: false },
            actions: [
              ...resetSwitchTabValue(GET_STARTED_DEFAULT_DATA.tab),
              'SendDraftAssetToParent'
            ]
          }
        ])
      ],
      target: 'done'
    }
  ]
}
export const checkHasMyVideoState = {
  id: 'checkHasMyVideo',
  entry: ['showLoadingComponent', 'RestAxiosToken'],
  exit: ['closeLoadingComponent'],
  invoke: {
    src: {
      type: 'FetchingVideosAPI',
      payload: {
        tab: VIDEO_TAB_TYPE.YOUR,
        filter: MY_VIDEOS_FILTERS[0].key
      }
    },
    onDone: [
      {
        cond: { type: 'HasVideos', hasData: true },
        actions: [handleOrSaveDataActions],
        target: '#setDefaultVideo'
      },
      {
        cond: { type: 'HasVideos', hasData: false },
        actions: [
          log('hasData false'),
          ...resetSwitchTabValue(VIDEO_TAB_TYPE.CUSTOMER),
          'ReplaceTemporaryVideoToVideo'
        ],
        target: '#setDefaultVideo'
      }
    ],
    onError: { actions: ['handleApiError'] }
  }
}

export const fetchState = (id, target, payload) => ({
  entry: ['showLoadingComponent', 'ResetVideos', 'RestAxiosToken'],
  exit: ['closeLoadingComponent'],
  invoke: {
    id,
    src: {
      type: 'FetchingVideosAPI',
      payload
    },
    onDone: {
      actions: [handleOrSaveDataActions],
      target
    },
    onError: { actions: ['handleApiError'] }
  }
})

export const scrollState = id => ({
  entry: ['showLoadingComponent', 'RestAxiosToken'],
  exit: ['closeLoadingComponent'],
  invoke: {
    id,
    src: 'FetchingVideosAPI',
    onDone: {
      target: 'idle',
      actions: ['UpdateVideos']
    },
    onError: { actions: ['handleApiError'] }
  }
})
