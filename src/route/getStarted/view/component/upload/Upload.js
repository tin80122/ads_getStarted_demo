import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { ReactComponent as UploadIcon } from "assets/icon/upload.svg";
import { VIDEO_LIMIT, STATIC_VIDEO_DURATION } from "assets/constant/Constant";
import MaskDispatchType from "assets/helper/maskDispatchType";
import { MaskContext } from "context/mask";
import useTracker from "hooks/useTracker";
import "./Upload.scss";

const Upload = ({ send, type }) => {
  const { t } = useTranslation();
  const MP4Box = require("mp4box");
  const mp4boxfile = MP4Box.createFile();
  const { setEventTracker } = useTracker();
  const { dispatchMask } = useContext(MaskContext);
  const videoRef = useRef();
  const inputRef = useRef();
  const submitRef = useRef();
  const canvasRef = useRef();
  const localUrl = useRef();
  const fileRaw = useRef();
  const [isHVCVideo, setIsHVCVideo] = useState(false);
  const durationRef = useRef();
  const acceptType = [
    "video/mp4",
    "video/quicktime",
    "image/jpg",
    "image/jpeg",
    "image/png",
  ];

  const checkVideoDuration = (duration) => {
    let content = "";

    if (duration < VIDEO_LIMIT[type].minLength) {
      content = t("campaign.add_video.wrong_duration", {
        min: VIDEO_LIMIT[type].minLength,
        max: VIDEO_LIMIT[type].maxLength,
      });
    }

    if (content !== "") {
      dispatchMask(
        MaskDispatchType.update({
          content,
          dismiss: {
            name: t("common.cancel"),
          },
        })
      );

      setEventTracker(
        "CreateAds",
        // (duration > VIDEO_LIMIT[type].maxLength &&
        // 'GetStarted_UploadError_LengthLong') ||
        duration < VIDEO_LIMIT[type].minLength &&
          "GetStarted_UploadError_LengthShort",
        `DialogShow`
      );

      inputRef.current.value = "";
      return false;
    } else {
      return true;
    }
  };

  const readFile = (file) => {
    return new Promise((res, rej) => {
      // create file reader
      let reader = new FileReader();

      // register event listeners
      reader.addEventListener("loadend", (e) => res(e.target.result));
      reader.addEventListener("error", rej);

      // read file
      reader.readAsArrayBuffer(file);
    });
  };

  const checkIsHVCVideo = async () => {
    let fileArrayBuffer = await readFile(fileRaw.current);
    fileArrayBuffer.fileStart = 0;
    mp4boxfile.onError = function (e) {};
    mp4boxfile.onReady = function (info) {
      mp4boxfile.start();
      const mime = info.mime.split(";");
      const type = fileRaw.current.name.split(".")[1];
      const pattern = /"([a-zA-Z0-9.,]+)"/;
      const codecs = pattern.exec(mime[1].trim())[1];
      const duration = info.duration / info.timescale;
      durationRef.current = duration;

      setEventTracker(
        "CreateAds",
        "GetStarted_YourVideosUpload",
        `${type}_${codecs}`
      );
      const ary = info.tracks.filter((track) => track.codec.includes("hvc"));

      if (ary.length > 0) {
        /*
        HEVC file doesn't need to load on the browser ,
        so doesn't need to set to video src attribute.
        load info of video through mp4box library
        */
        const isPass = checkVideoDuration(duration);
        if (isPass) {
          setIsHVCVideo(true);
          submitRef.current.click();
          inputRef.current.value = "";
        }
      } else {
        /*
        other type of files load info of video through onLoadedDta of video tag
        */
        setIsHVCVideo(false);
        videoRef.current.setAttribute("src", localUrl.current);
      }
    };
    mp4boxfile.appendBuffer(fileArrayBuffer);
    mp4boxfile.flush();
  };

  const handleOnChange = (e) => {
    fileRaw.current = e.target.files[0];
    if (fileRaw.current.length === 0) return;
    if (!acceptType.includes(fileRaw.current.type)) {
      dispatchMask(
        MaskDispatchType.update({
          content: t("campaign.add_file.type_wrong"),
          dismiss: {
            name: t("common.cancel"),
          },
        })
      );
      setEventTracker(
        "CreateAds",
        "GetStarted_UploadError_FileNotSupport",
        "DialogShow"
      );
      return;
    }

    window.URL = window.URL || window.webkitURL;
    localUrl.current = window.URL.createObjectURL(fileRaw.current);

    fileRaw.current.type.includes("video")
      ? checkIsHVCVideo()
      : handleUploadImage();
  };

  const handleLoadedData = async (e) => {
    const video = e.target;
    videoRef.current = video;
    video.pause(); // pause autoplay
    // NOTE: Capture frame picture may failed on iOS device,
    //       to prevent this, must add `autoplay` attribute on video element,
    //       when changing `src` attribute value, will trigger `onLoadedData`
    //       this time we can make sure that video file is loaded and ready.
    //       You can use `videoElement.readyState` to see the load state.
    //       `preload` attribute default value may different on different OS type devices,
    //       so I add a fixed value `auto`, make sure `onLoadedData` is triggered after (automatically) `onLoadedMetadata`
    //       ref: https://github.com/google/shaka-player/issues/2483#issuecomment-624881015
    //       Adding `playsInline` and `webkit-playsinline` attribute preventing auto fullscreen play on iOS device.

    const isPass = checkVideoDuration(video.duration);
    if (isPass) {
      submitRef.current.click();
      inputRef.current.value = "";
    }
  };

  const returnEl = () => {
    return {
      video: videoRef.current,
      canvas: canvasRef.current,
    };
  };

  const handleUploadImage = () => {
    // send(adsEventEnum.UPLOAD, {
    //   file: inputRef.current.files[0],
    //   duration: STATIC_VIDEO_DURATION
    // })
    inputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { video } = returnEl();

    // send(adsEventEnum.UPLOAD, {
    //   getEl: returnEl,
    //   file: inputRef.current.files[0],
    //   localVideo: localUrl.current,
    //   duration: video.duration || durationRef.current,
    //   isHVCVideo
    // })
  };

  return (
    <div className="upload-post">
      <div className="upload-wrapper">
        <canvas
          id="canvas"
          ref={canvasRef}
          style={{ overflow: "auto", display: "none" }}
        ></canvas>

        <form
          encType="multipart/form-data"
          className="upload-form"
          onSubmit={handleSubmit}
        >
          <label className="upload-container">
            <UploadIcon alt="upload" />
            <span>{t("campaign.upload_video_or_image")}</span>
            <video
              onLoadedData={handleLoadedData}
              autoPlay
              muted
              preload="auto"
              playsInline
              webkit-playsinline="true"
              ref={videoRef}
              type="video/mp4,video/quicktime"
            />
            <input
              hidden
              type="file"
              className="upload"
              accept={acceptType.join(",")}
              onChange={handleOnChange}
              ref={inputRef}
            />
          </label>
          <button ref={submitRef} type="submit" hidden />
        </form>
      </div>
    </div>
  );
};

Upload.propTypes = {
  type: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired,
};

export default Upload;
