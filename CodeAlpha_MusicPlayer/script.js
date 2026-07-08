const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        src: "songs/song1.mp3",
        cover: "images/cover1.jpg"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        src: "songs/song2.mp3",
        cover: "images/cover2.jpg"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        src: "songs/song3.mp3",
        cover: "images/cover3.jpg"
    }
];

const audio = document.getElementById("audio");

const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const current = document.getElementById("current");
const duration = document.getElementById("duration");

const playlist = document.querySelectorAll("#playlist li");

let currentSong = 0;
let isPlaying = false;

// Load Song

function loadSong(index){

    audio.src = songs[index].src;

    cover.src = songs[index].cover;

    title.innerText = songs[index].title;

    artist.innerText = songs[index].artist;

    playlist.forEach(item=>{
        item.classList.remove("active");
    });

    playlist[index].classList.add("active");

}

loadSong(currentSong);

// Play Song

function playSong(){

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
    '<i class="fa-solid fa-pause"></i>';

}

// Pause Song

function pauseSong(){

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
    '<i class="fa-solid fa-play"></i>';

}

// Play Button

playBtn.addEventListener("click",()=>{

    if(isPlaying){

        pauseSong();

    }

    else{

        playSong();

    }

});

// Next Song

nextBtn.addEventListener("click",()=>{

    currentSong++;

    if(currentSong>=songs.length){

        currentSong=0;

    }

    loadSong(currentSong);

    playSong();

});

// Previous Song

prevBtn.addEventListener("click",()=>{

    currentSong--;

    if(currentSong<0){

        currentSong=songs.length-1;

    }

    loadSong(currentSong);

    playSong();

});

// Progress Bar

audio.addEventListener("timeupdate",()=>{

    if(audio.duration){

        progress.value =
        (audio.currentTime/audio.duration)*100;

        current.innerText =
        formatTime(audio.currentTime);

        duration.innerText =
        formatTime(audio.duration);

    }

});

// Seek Song

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value/100)*audio.duration;

});

// Volume

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

// Auto Next Song

audio.addEventListener("ended",()=>{

    nextBtn.click();

});

// Playlist Click

playlist.forEach((item,index)=>{

    item.addEventListener("click",()=>{

        currentSong=index;

        loadSong(currentSong);

        playSong();

    });

});

// Format Time

function formatTime(time){

    let min =
    Math.floor(time/60);

    let sec =
    Math.floor(time%60);

    if(sec<10){

        sec="0"+sec;

    }

    return min+":"+sec;

}

// Keyboard Shortcuts

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(isPlaying){

            pauseSong();

        }

        else{

            playSong();

        }

    }

    if(e.key==="ArrowRight"){

        nextBtn.click();

    }

    if(e.key==="ArrowLeft"){

        prevBtn.click();

    }

});