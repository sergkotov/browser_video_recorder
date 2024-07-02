const oControl = document.getElementById('control');
const oRecorded = document.getElementById('recorded');
const btnStart = document.getElementById('start');
const btnPause = document.getElementById('pause');
const btnResume = document.getElementById('resume');
const btnStop = document.getElementById('stop');
const btnSave = document.getElementById('save');
const btnReset = document.getElementById('reset');
const aDownload = document.getElementById('downLoad');

// videoParams - stores parameters;
// oRec - object-encoder;
// chunks - array for storing video blocks;
// oBlob - file storing recorded video;
// durl - data URL of recerded video;
let videoParams, oRec, chunks = [], oBlob, durl;

// mimetypes fr firefox & chrome are different
if(navigator.userAgent.includes('Firefox'))
    videoParams = {mimeType: 'video/webm;codecs:vp9,opus'};
else
    videoParams = {mimeType: 'video/webm;codecs=vp9,opus'};

(async function() {
    const oStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    oControl.srcObject = oStream;
    oRec = new MediaRecorder(oStream, videoParams);
    oRec.addEventListener('dataavailable', (evt) => {
        chunks.push(evt.data);
    });
})();