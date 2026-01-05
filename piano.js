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
    if(currentSongNotes.length)
        checkNote(note);
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

    if(currentSongNotes.length)
        checkNote(note);

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

const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', function(e) {
    const message = document.getElementById('message').value;
    const regex = /\bfuck\b/i;
    if (regex.test(message)) {
        e.preventDefault();
        alert('Please keep the message appropriate.');
    }
});

const openSongsBtn = document.getElementById('openSongsMenu');
const closeSongsBtn = document.getElementById('closeSongsMenu');
const songsMenuOverlay = document.getElementById('songsMenuOverlay');

openSongsBtn.addEventListener('click', function() {
    songsMenuOverlay.classList.remove('menu-hidden');
});

closeSongsBtn.addEventListener('click', function() {
    songsMenuOverlay.classList.add('menu-hidden');
});

songsMenuOverlay.addEventListener('click', function(e) {
    if (e.target === songsMenuOverlay) {
        songsMenuOverlay.classList.add('menu-hidden');
    }
});

songsMenuOverlay.addEventListener('click', function(e) {
    if (e.target === songsMenuOverlay) {
        songsMenuOverlay.classList.add('menu-hidden');
    }
});

const songButtons = document.querySelectorAll('.song-button');
const randomSongBtn = document.getElementById('randomSong');
const songDisplay = document.getElementById('songDisplay');
const songTitle = document.getElementById('songTitle');
const songNotes = document.getElementById('songNotes');
const accuracyText = document.getElementById('songAccuracy');
const resetScoresBtn = document.getElementById('resetScores');
var currentSongNotes = ''
var currentSongId = '';
var currAccuracy = 1, hitNotes = 0, totalNotes = 0;

accuracyText.textContent = "Accuracy: 100.00%"

function loadHighscores() {
    songButtons.forEach(button => {
        const songId = button.dataset.songId;
        const highscore = localStorage.getItem(`highscore_${songId}`);
        const highscoreElement = button.querySelector('.song-highscore');
        
        if (highscore) {
            highscoreElement.textContent = `Highscore: ${parseFloat(highscore).toFixed(2)}%`;
        } else {
            highscoreElement.textContent = 'Not yet played';
        }
    });
}

function saveHighscore(songId, accuracy) {
    const currentHighscore = localStorage.getItem(`highscore_${songId}`);
    const accuracyPercent = accuracy * 100;
    
    if (!currentHighscore || accuracyPercent > parseFloat(currentHighscore)) {
        localStorage.setItem(`highscore_${songId}`, accuracyPercent.toFixed(2));
        loadHighscores();
    }
}

resetScoresBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to reset all highscores?')) {
        songButtons.forEach(button => {
            const songId = button.dataset.songId;
            localStorage.removeItem(`highscore_${songId}`);
        });
        loadHighscores();
        alert('All highscores have been reset!');
    }
});

loadHighscores();

function loadSong(songFile, songId) {
    songsMenuOverlay.classList.add('menu-hidden');
    document.getElementById('octaveSelection').style.marginBottom = '-15%';
    accuracyText.style.transform = 'scale(1.0)';
    accuracyText.textContent = "Accuracy: 100.00%"
    currAccuracy = 1; hitNotes = 0; totalNotes = 0;
    currentSongId = songId;

    fetch(`./songs/${songFile}`)
        .then(response => response.json())
        .then(data => {
            songTitle.textContent = `${data.song_title} - ${data.artist}`;
            
            const notesArray = data.notes.split(' ');
            currentSongNotes = notesArray

            updateSongNotes();
            
            songDisplay.classList.remove('song-display-hidden');
        })
        .catch(error => {
            console.error('Error loading song:', error);
            alert('Could not load song data');
        });
}

function updateSongNotes(){
    let notes = currentSongNotes.slice(0,6).join(' ');
    notes = notes.replace(/Db/g, 'C#').replace(/Eb/g, 'D#').replace(/Gb/g, 'F#').replace(/Ab/g, 'G#').replace(/Bb/g, 'A#');
    let noteArray = notes.split(' ');
    let html = noteArray.map((note, index) => `<span class="note-${index+1}">${note}</span>`).join(' ');
    songNotes.innerHTML = html;
    if(currentSongNotes.length == 0){
        accuracyText.style.transform = 'scale(1.5)';
        saveHighscore(currentSongId, currAccuracy);
    }
}

songButtons.forEach(button => {
    button.addEventListener('click', function() {
        let songFile = 'come_as_you_are.json', songId = 'come_as_you_are'; // default
        if (this.textContent.includes('Fur Elise')) { songFile = 'fur_elise.json'; songId = 'fur_elise'; }
        else if (this.textContent.includes('What')) { songFile = 'what_ive_done.json'; songId = 'what_ive_done'; }
        else if (this.textContent.includes('Join Me')) { songFile = 'join_me.json'; songId = 'join_me'; }
        
        loadSong(songFile, songId);
    });
});

randomSongBtn.addEventListener('click', function() {
    const songs = [
        { file: 'fur_elise.json', id: 'fur_elise' },
        { file: 'come_as_you_are.json', id: 'come_as_you_are' },
        { file: 'what_ive_done.json', id: 'what_ive_done' },
        { file: 'join_me.json', id: 'join_me' }
    ];
    
    const randomIndex = Math.floor(Math.random() * songs.length);
    const selectedSong = songs[randomIndex];
    
    loadSong(selectedSong.file, selectedSong.id);
});

function checkNote(note){
    if(note == currentSongNotes[0]){
        const firstNoteSpan = document.querySelector('.note-1');
        if(firstNoteSpan){
            firstNoteSpan.classList.add('correct');
            setTimeout(() => {
                currentSongNotes.splice(0,1);
                updateSongNotes();
            }, 100);
        }
        hitNotes++;
    }
    else{
        const firstNoteSpan = document.querySelector('.note-1');
        if(firstNoteSpan){
            firstNoteSpan.classList.add('wrong');
            setTimeout(() => {
                firstNoteSpan.classList.remove('wrong');
            }, 200);
        }
    }
    totalNotes++;
    currAccuracy = hitNotes / totalNotes;
    accuracyText.textContent = `Accuracy: ${(currAccuracy*100).toFixed(2)}%`;
}