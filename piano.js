const whiteKeys = document.querySelectorAll('.whiteKey');
const blackKeys = document.querySelectorAll('.blackKey');
const octave1Buttons = document.querySelectorAll('#octave1Menu button');
const octave2Buttons = document.querySelectorAll('#octave2Menu button');
var octave1 = 3, octave2 = 4;

function playNoteClick(){
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
    audio.play();
}

function playNoteKey(e){
    if(!"zxcvbnmsdghjyuiop[]780-=".includes(e.key))
        return;
    const binds = 'zxcvbnmsdghjyuiop[]780-=';
    const notes = [
        'C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1',
        'Db1', 'Eb1', 'Gb1', 'Ab1', 'Bb1',
        'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2',
        'Db2', 'Eb2', 'Gb2', 'Ab2', 'Bb2',
    ]
    var pressedNote = notes[binds.indexOf(e.key)];

    var octave = pressedNote[1];
    var note = pressedNote[0];
    if(octave === 'b'){
        octave = pressedNote[2];
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
    audio.play();

    const keyVisual = document.getElementById(`${pressedNote}`);
    keyVisual.classList.add('hovered');
    setTimeout(() => {
        keyVisual.classList.remove('hovered');
    }, 150);
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


whiteKeys.forEach(key => key.addEventListener('click', playNoteClick));
blackKeys.forEach(key => key.addEventListener('click', playNoteClick));
octave1Buttons.forEach(button => button.addEventListener('click', switchOctave));
octave2Buttons.forEach(button => button.addEventListener('click', switchOctave));
window.addEventListener('keydown', playNoteKey);