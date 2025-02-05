console.log("Welcome to spotify");

//initialize the variables
let audioElement = new Audio('RADWIMPS - Suzume (Lyrics) ft. Toaka.mp3');
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('progressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Roadwimps" , filePath:"RADWIMPS - Suzume (Lyrics) ft. Toaka.mp3", coverPath: "roadwimps.png" },
    {songName: "Dan da Dan" , filePath:"DAN DA DAN - Opening  Otonoke by Creepy Nuts.mp3", coverPath: "dan da dan.png" },
    {songName: "Attack on Titan" , filePath:"aot.mp3", coverPath: "aot.png" },
    {songName: "Roadwimps" , filePath:"RADWIMPS - Suzume (Lyrics) ft. Toaka.mp3", coverPath: "roadwimps.png" }
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
        //list play
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
        //list play
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-pause');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-play');
    }
    masterSongName.innerText = songs[songIndex].songName;
})


//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update progress bar
    progress = parseInt( (audioElement.currentTime/audioElement.duration)*100 );
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        
    })
}

Array.from(document.getElementsByClassName('songItemPlay')). forEach((element)=>{
    element.addEventListener('click', (e)=>{
        
        if(e.target.classList.contains('fa-circle-pause')) {
            gif.style.opacity = 0;
            
            audioElement.pause();
            //lsit play
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            //master play
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }
        else{
            makeAllPlays();
            
            gif.style.opacity = 1;
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            let selectedSong = songs[songIndex];
            masterSongName.innerText = songs[songIndex].songName;
            let filePath = selectedSong.filePath;
            audioElement.src = filePath;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    })
})

//prev
document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    let selectedSong = songs[songIndex];
    let filePath = selectedSong.filePath;
    audioElement.src = filePath;
    audioElement.play();
    
    //master play
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    // list play
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
})


//next
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=songs.length-1){
        songIndex = songs.length-1;
    }
    else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
    let selectedSong = songs[songIndex];
    let filePath = selectedSong.filePath;
    audioElement.src = filePath;
    audioElement.play();
    //master play
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    //list play
    makeAllPlays();
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
})