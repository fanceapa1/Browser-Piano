const whiteKeys = document.querySelectorAll('.whiteKey');
const blackKeys = document.querySelectorAll('.blackKey');


function playNote(){
    const audio = document.querySelector(`audio[data-key="${this.id}"]`);
    if (!audio) return;

    audio.currentTime = 0;
    audio.play();
}

whiteKeys.forEach(key => key.addEventListener('click', playNote));
blackKeys.forEach(key => key.addEventListener('click', playNote));
