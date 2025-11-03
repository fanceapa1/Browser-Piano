const whiteKeys = document.querySelectorAll('.whiteKey');
const blackKeys = document.querySelectorAll('.blackKey');
const octave1Buttons = document.querySelectorAll('#octave1Menu button');
var octave1 = 1, octave2 = 2;

function playNote(){
    var octave = this.id[1];
    var note = this.id[0];
    if(octave === 'b'){
        octave = this.id[2];
        note += 'b';
    }
    if(octave === '1'){
        octave = octave1;
    }
    else octave = octave2;
    const audio = document.querySelector(`audio[data-key="${note}${octave}"]`);
    if (!audio) return;
    audio.currentTime = 0.1;
    audio.play();
}

function switchOctave(){
    octave1Buttons.forEach(button =>{
        button.classList.remove('selected');
    });
    this.classList.add('selected');
    octave1 = this.dataset.octave[1];
}

console.log(octave1Buttons);

whiteKeys.forEach(key => key.addEventListener('click', playNote));
blackKeys.forEach(key => key.addEventListener('click', playNote));
octave1Buttons.forEach(button => button.addEventListener('click', switchOctave));