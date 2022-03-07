window.onload = LoadImages;

const imageContainer = document.querySelector('.container') as HTMLDivElement;
const image = document.querySelector('.container > img') as HTMLImageElement;
const images: string[] = [];

// Load images from data file
async function LoadImages() {
  const res = await fetch('/data/links.json');
  images.push(...(await res.json()));
  image.src = images[0];
  rangeInput.max = (images.length - 1).toString();
}

const rangeInput = document.querySelector('#range') as HTMLInputElement;

// Change image based on input value
rangeInput.addEventListener('input', () => image.src = images[parseInt(rangeInput.value)]);

const playButton = document.querySelector('#play') as HTMLButtonElement;
const stopButton = document.querySelector('#stop') as HTMLButtonElement;

let playInterval: any;
let playing = false;

// Set this to a low number to begin with to let your browser cache all the images
// Then increase for a smoother playback
const frameRate = 5;

playButton.addEventListener('click', Play);
stopButton.addEventListener('click', Stop);

// Start playing
function Play() {
  if (!playing) {
    playInterval = setInterval(() => {
      const newValue = parseInt(rangeInput.value) + 1;

      // Stop playing if the input has reached the end of the image array
      if (newValue > images.length - 1) return Stop();

      rangeInput.value = newValue.toString();
      rangeInput.dispatchEvent(new Event('input'));
    }, 1e3 / frameRate);

    playing = true;
  }
}

// Stop playing
function Stop() {
  if (playing) {
    clearInterval(playInterval);
    playing = false;
  }
}