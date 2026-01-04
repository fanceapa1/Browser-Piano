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
    audio.currentTime = 0;
    audio.volume = 1;
    audio.play();
}

function playNoteKey(e){
    if (document.activeElement.closest('#feedbackForm')) {
        return;
    }
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
    audio.currentTime = 0;
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


//settings tab
const showNotesCheckbox = document.getElementById('showNotes');
const notations = document.querySelectorAll('.notation, .notationB');
const showBindsCheckbox = document.getElementById('showBinds');
const binds = document.querySelectorAll('.keybind, .keybindB');
const notationDropdownButtons = document.querySelectorAll('.notationDropdownButton');
const solfegeButton = document.getElementById('solfegeNotation')
const letterButton = document.getElementById('letterNotation')
const pianoColor = document.getElementById('pianoColor');
const pianoContainer = document.getElementById('pianoContainer');

Object.keys(localStorage).forEach(key => {
    const value = localStorage.getItem(key);
    switch(key){
        case 'notes':
            notations.forEach(notation =>{
                notation.style.opacity = value;
            })
            showNotesCheckbox.checked = value === "1";
            break;
        case 'keybinds':
            binds.forEach(bind =>{
                bind.style.opacity = value;
            })
            showBindsCheckbox.checked = value === "0.4";
            break;
        case 'notation':
            if(value == 'solfege'){
                letterButton.classList.remove('selected')
                solfegeButton.classList.add('selected')
                var solfege = ['Do#', 'Re#', 'Fa#', 'Sol#', 'La#', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
                var solfegeIndex = 0;
                notations.forEach(notation =>{
                    notation.innerHTML = solfege[solfegeIndex % 12];
                    notation.style.fontSize = 'small';
                    solfegeIndex++;
                })
            }
            /// nu trebuie tratat pt notatie cu litere fiindca asa se incarca default
            break;
        case 'color':
            break;
    }
});

function showNotesToggle(){
    if(showNotesCheckbox.checked == 0){
        notations.forEach(notation =>{
            notation.style.opacity = 0;
        })
    }
    else{
        notations.forEach(notation =>{
            notation.style.opacity = 1;
        })
    }
    currOpacity = window.getComputedStyle(notations[0]).getPropertyValue('opacity');
    localStorage.notes = currOpacity;
}

function showBindsToggle(){
    if(showBindsCheckbox.checked == 0){
        binds.forEach(bind =>{
            bind.style.opacity = 0;
        })
    }
    else{
        binds.forEach(bind =>{
            bind.style.opacity = 0.4;
        })
    }
    currOpacity = window.getComputedStyle(binds[0]).getPropertyValue('opacity');
    localStorage.keybinds = currOpacity;
}

function changeNotation(){
    var solfege = ['Do#', 'Re#', 'Fa#', 'Sol#', 'La#', 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];
    var letters = ['C#', 'D#', 'F#', 'G#', 'A#', 'C', 'D', 'E', 'F', 'G', 'A', 'B'];
    notationDropdownButtons.forEach(button =>{
        button.classList.remove('selected');
    })
    this.classList.add('selected');
    var solfegeIndex = 0, letterIndex = 0;
    if(this.id === 'solfegeNotation'){
        notations.forEach(notation =>{
            notation.innerHTML = solfege[solfegeIndex % 12];
            notation.style.fontSize = 'small';
            solfegeIndex++;
        })
        localStorage.notation = 'solfege'
    }
    else{
        notations.forEach(notation =>{
            notation.innerHTML = letters[letterIndex % 12];
            notation.style.fontSize = 'medium';
            letterIndex++;
        })
        localStorage.notation = 'letter'
    }
}

function changeColor(){
    pianoContainer.style.backgroundColor = this.value;
}



showNotesCheckbox.addEventListener('click', showNotesToggle);
showBindsCheckbox.addEventListener('click', showBindsToggle);
notationDropdownButtons.forEach(button =>{
        button.addEventListener('click', changeNotation);
    })
pianoColor.addEventListener('change', changeColor);