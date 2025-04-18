const previousButton = document.querySelector("#prev");
const pauseButton = document.querySelector("#pause");
const playButton = document.querySelector("#play");
const nextButton = document.querySelector("#next");
const loopButton = document.querySelector("#replay");
const muteButton = document.querySelector("#mute");

const range = document.querySelector("#range");
const runningTime = document.querySelector("#runningTime");
const durationTime = document.querySelector("#durationTime");

let displayText = document.querySelector("#displayText");

let songName = ["Surah_Al-Mulk.mp3", "As_Subho_Bada_Min.mp3", "Ghum.mp3"];

let audio = [];
let count = 0;


for(let i = 0; i < songName.length; i++) {
	audio[i] = new Audio(`../../audio/${songName[i]}`);
}
	


playButton.addEventListener("click", () => {
	playAudio(audio[count]);
	durationRange();
});

pauseButton.addEventListener("click", () => {
	pauseAudio(audio[count]);
	durationRange();
});

previousButton.addEventListener("click", () => {
	previousAudio();
	durationRange();
});

nextButton.addEventListener("click", () => {
	nextAudio();
	durationRange();
});

loopButton.addEventListener("click", () => {
	loopAudio();
});

muteButton.addEventListener("click", () => {
	muteAudio();
});


audio[count].addEventListener("ended", () => {
	pauseButton.style.display = "none";
	playButton.style.display = "inline-block";
});


range.addEventListener("change", (e) => {
	audio[count].currentTime = e.target.value;
});



const playAudio = audio => {
	audio.play();
	
	let songName = audio.src.split('/')[4]; 
	displayText.innerHTML = songName;
	
	playButton.style.display = "none";
	pauseButton.style.display = "inline-block";
};

const pauseAudio = audio => {
	audio.pause();
	
	pauseButton.style.display = "none";
	playButton.style.display = "inline-block";
};

const previousAudio = () => {
	count--;
	if(count < 0) {
		count = audio.length - 1;
		pauseAudio(audio[0]);
		playAudio(audio[count]);
	} else {
		pauseAudio(audio[count + 1]);
		playAudio(audio[count]);
	}
	
	reStartingPoint(audio);
};

const nextAudio = () => {
	count++;
	if(count > audio.length - 1) {
		count = 0;
		pauseAudio(audio[audio.length - 1]);
		playAudio(audio[count]);
	} else {
		pauseAudio(audio[count - 1]);
		playAudio(audio[count]);
	}
	
	reStartingPoint(audio);
};

const loopAudio = () => {
	if(audio[count].loop) {
		audio[count].loop = false;
		loopButton.classList.remove('border-bottom');
	} else {
		audio[count].loop = true;
		loopButton.classList.add('border-bottom');
	}
};

const muteAudio = () => {
	if(audio[count].muted) {
		audio[count].muted = false;
		muteButton.classList.remove('border-bottom');
	} else {
		audio[count].muted = true;
		muteButton.classList.add('border-bottom');
	}
};


const reStartingPoint = audio => {
	audio.forEach(x => {
		x.currentTime = 0;
	});
};


const durationRange = () => {
	setInterval(function() {
		range.max = Math.round(audio[count].duration);
		range.value = audio[count].currentTime;
		
		displayDuration(range.max, range.value);
	}, 1000);
};

const displayDuration = (maximum, current) => {
	let minute = 0;
	
	durationTime.innerHTML = `${minute}:${maximum}`;
	
	for(let i = 0; i < 10; i++) {
		if(current > 60*i) {
			runningTime.innerHTML = `${minute + i}:${current - 60*i}`;
			
			if(current < (60*i) + 10) {
				runningTime.innerHTML = `${minute + i}:0${current - 60*i}`;
			}
		}
		
		if(maximum > 60*i) {
			durationTime.innerHTML = `${minute + i}:${maximum - 60*i}`;
			
			if(maximum < (60*i) + 10) {
				durationTime.innerHTML = `${minute + i}:0${maximum - 60*i}`;
			}
		}
	}
};
