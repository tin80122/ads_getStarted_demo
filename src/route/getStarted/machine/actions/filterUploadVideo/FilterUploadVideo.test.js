import { FilterUploadVideo } from './FilterUploadVideo'

describe('FilterUploadVideo', () => {
  it('Should Filter out items with isUploaded:true', () => {
    expect(
      FilterUploadVideo({
        videos: {
          list: [
            {
              key: 0,
              isUploaded: true
            },
            {
              key: 1
            },
            {
              key: 2
            }
          ]
        }
      })
    ).toEqual({
      videos: {
        list: [
          {
            key: 1
          },
          {
            key: 2
          }
        ]
      }
    })
  })

  it('Should not filter items with isUploaded:false', () => {
    expect(
      FilterUploadVideo({
        videos: {
          list: [
            {
              key: 0
            },
            {
              key: 1
            },
            {
              key: 2,
              isUploaded: false
            }
          ]
        }
      })
    ).toEqual({
      videos: {
        list: [
          {
            key: 0
          },
          {
            key: 1
          },
          {
            key: 2,
            isUploaded: false
          }
        ]
      }
    })
  })

  it('Should not filter out items without property isUploaded', () => {
    expect(
      FilterUploadVideo({
        videos: {
          list: [
            {
              key: 0
            },
            {
              key: 1
            },
            {
              key: 2
            }
          ]
        }
      })
    ).toEqual({
      videos: {
        list: [
          {
            key: 0
          },
          {
            key: 1
          },
          {
            key: 2
          }
        ]
      }
    })
  })
})
