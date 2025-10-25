const video = document.getElementById('camera');
const cameraContainer = document.getElementById('cameraContainer');
const menuScreen = document.getElementById('menuScreen');
const viewer = document.getElementById('viewer');
const choiceButtons = document.querySelectorAll('.choiceBtn');

let stream = null;

async function startCamera() {
  try {
    // ✅ Force rear camera (environment)
    const constraints = {
      video: { facingMode: { exact: "environment" } },
      audio: false
    };

    stream = await navigator.mediaDevices.getUserMedia(constraints);
    video.srcObject = stream;

    await video.play();

    // ✅ Show 3D model only after camera starts
    viewer.style.display = 'block';
  } catch (err) {
    alert('Cannot access rear camera: ' + err.message);
  }
}

choiceButtons.forEach(btn => {
  btn.addEventListener('click', async (e) => {
    const choice = e.target.dataset.choice;
    console.log("User selected:", choice);

    // You can change model based on choice if needed
    // viewer.src = choice === 'Choice 1' ? 'plate.glb' : 'cup.glb';

    menuScreen.style.display = 'none';
    cameraContainer.style.display = 'block';
    viewer.style.display = 'none';

    await startCamera();
  });
});
