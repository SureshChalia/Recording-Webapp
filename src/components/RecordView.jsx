import { ReactMediaRecorder } from "react-media-recorder-2";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};


function Reader(input) {
  const filereader = new FileReader();
  filereader.readAsDataURL(input);
  filereader.onloadend = function (event) {
    const videoURl = event.target.result;
    console.log("video encoded", videoURl);
    localStorage.setItem("videoUrl", JSON.stringify(videoURl));
  };
}

const RecordView = ({ permission }) => {
  const [srcData, setSrcData] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [Recording, setRecording] = useState(false);
  const [Pause, setPause] = useState(false);
  useEffect(() => {
    console.log(permission)
  }, [])
  return (
    <div className="">
      <ReactMediaRecorder
        video={permission.video}
        audio={permission.audio}
        screen={permission.screen}
        onStart={() => {
          setRecording(true);
          toast.success("Recording Started")
        }}
        onStop={(blobString, blob) => {
          setRecording(false);
          Reader(blob);
          toast.error("Recording Stoped")
          localStorage.setItem("video", JSON.stringify(blob));
        }}
        render={({
          status,
          startRecording,
          stopRecording,
          pauseRecording,
          resumeRecording,
          mediaBlobUrl,
          error,
        }) => (
          <div>
            <p className="mb-6 border-2 border-r-indigo-500  py-2   text-white font-bold bg-blue-500 rounded text-center">{"Status : " + status}</p>
            <div className="flex flex-col gap-5">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  if (Recording) {
                    stopRecording();
                  } else {
                    startRecording();
                  }
                  setRecording(!Recording);
                }
                }
              >
                {Recording ? "Stop Recording" : "Start Recording"}
              </button>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  if (Pause) {
                    resumeRecording();

                  } else {
                    pauseRecording();
                  }
                  setPause(!Pause);
                }
                }
              >
                {Pause ? "Resume Recording" : "Pause Recording"}
              </button>
            </div>
          </div>
        )
        }
      />
      < div >
        {/* show video from file Reader */}
        < button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 w-full"
          onClick={async () => {
            const newBlogObj = JSON.parse(localStorage.getItem("videoUrl"));
            setSrcData(newBlogObj);
            setShowVideo(true);
          }}
        >
          Show Recording
        </button >
        {/* show video */}
        {showVideo && <video src={srcData} controls autoPlay></video>}
      </div >
    </div >
  );
};
export default RecordView;
