const whiteKeys = document.querySelectorAll('.whiteKey');
const blackKeys = document.querySelectorAll('.blackKey');
const octave1Buttons = document.querySelectorAll('#octave1Menu button');
const octave2Buttons = document.querySelectorAll('#octave2Menu button');
var octave1 = 3, octave2 = 4;

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
    audio.volume = 1;
    console.log(audio);
    audio.play();
}

function switchOctave(){
    selectedOctave = this.dataset.octave[0];
    if(selectedOctave == 1){
        octave1Buttons.forEach(button =>{
            button.classList.remove('selected');
        });
        octave1 = this.dataset.octave[1];
    }
    if(selectedOctave == 2){
        octave2Buttons.forEach(button =>{
            button.classList.remove('selected');
        });
        octave2 = this.dataset.octave[1];
    }
    this.classList.add('selected');
}


whiteKeys.forEach(key => key.addEventListener('click', playNote));
blackKeys.forEach(key => key.addEventListener('click', playNote));
octave1Buttons.forEach(button => button.addEventListener('click', switchOctave));
octave2Buttons.forEach(button => button.addEventListener('click', switchOctave));
