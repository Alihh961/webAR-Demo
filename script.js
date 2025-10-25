console.log("toto")


// ...existing code...
const video = document.getElementById('camera');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const captureBtn = document.getElementById('captureBtn');
const canvas = document.getElementById('photo');

let stream = null;

async function startCamera() {
  try {
    const constraints = {
      video: { facingMode: { ideal: "environment" } }, // prefer back camera
      audio: false
    };

    // help mobile autoplay / inline playback
    video.playsInline = true;
    video.muted = true;

    stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;
    await video.play(); // ensure playback starts on mobile
    canvas.hidden = true;
  } catch (err) {
    console.error('Camera error:', err);
    alert('Could not access camera: ' + err.message);
  }
}

function stopCamera() {
  if (!stream) return;
  stream.getTracks().forEach(track => track.stop());
  video.srcObject = null;
  stream = null;
}

function capturePhoto() {
  if (!stream) return alert('Start the camera first');
  const w = video.videoWidth;
  const h = video.videoHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, w, h);
  canvas.hidden = false;
  // get image data URL if needed:
  // const dataUrl = canvas.toDataURL('image/png');
}

startBtn.addEventListener('click', startCamera);
stopBtn.addEventListener('click', stopCamera);
captureBtn.addEventListener('click', capturePhoto);
// ...existing code...