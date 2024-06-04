const songImage = document.querySelector("img");
const audio = document.querySelector("audio");
const songTitle = document.querySelector("#songTitle");
const songStart = document.querySelector("#startTime");
const songDuration = document.querySelector(".duration")
const backIcon = document.querySelector("#back");
const playIcon= document.querySelector("#play");
const forwardIcon= document.querySelector("#forward");
const heart = document.querySelector("#heart");
const artistName = document.querySelector(".artistName")
const songLoading = document.querySelector("#playerLoadingBoxInner")




let isPlaying = false;
function play(){
    audio.play()
    isPlaying = true;
    playIcon.classList.replace("fa-play","fa-pause");
}

const pause = ()=>{
    audio.pause()
    isPlaying = false;
    playIcon.classList.replace("fa-pause","fa-play");
}


playIcon.addEventListener("click",()=>{
    // playIcon.play();
    if(isPlaying){
        pause()
    }else{
        play()
    }
})


const audioDetails = [
    {
        image: "assets/images/img2.jpg",
        audio: "assets/audio/music2.m4a",
        singerName: "Guy Penroid",
        songName: "Old Rugged Cross"
    },
    {
        image: "assets/images/img3.jpg",
        audio: "assets/audio/music3.m4a",
        singerName: "Gaither vocal band",
        songName: "Hear my song lord"
    },
    {
        image: "assets/images/img4.jpeg",
        audio: "assets/audio/music4.m4a",
        singerName: "The Kings Heralds",
        songName: "Dry bones"
    },
    {
        image: "assets/images/img5.jpg",
        audio: "assets/audio/music5.m4a",
        singerName: "Reedemed Quartet",
        songName: "Just a little talk"
    }
]
const audioDetailsIndex = audioDetails.length;
let audioStart = 0;

const changeData = (info)=>{
    audio.src = info.audio
    songImage.src = info.image
    songTitle.innerHTML = info.songName
    artistName.innerHTML = info.singerName
}

forwardIcon.addEventListener("click", ()=>{

    if(audioStart > audioDetailsIndex -1){
        audioStart = 0;
    }
    changeData(audioDetails[audioStart]);
    play();
    audioStart++;
})
backIcon.addEventListener("click", ()=>{ 
    if(audioStart < 0){
        audioStart = audioDetailsIndex -1;
    } 
    audioStart -- ;
    changeData(audioDetails[audioStart])
    play()
})

audio.addEventListener("timeupdate",(output)=>{
    // get time update of the audio playing and convert from milliseconds to seconds
    let timeInMilliseconds = Math.floor(output.target.currentTime%60)
    if(timeInMilliseconds < 10){
        timeInMilliseconds = `0${timeInMilliseconds}`
    }

    let mediaCurrentTime = `${Math.floor(output.target.currentTime/60)}: ${timeInMilliseconds}`
    let mediaTotalTime = `${Math.floor(output.target.duration/60)}: ${Math.floor(output.target.duration%60)}`
    let percentagePlayed = (output.target.currentTime / output.target.duration) * 100;
    songStart.innerHTML = mediaCurrentTime
    songDuration.innerHTML = mediaTotalTime
    songLoading.style.width = `${percentagePlayed}%`
})

const heartIcon = document.querySelector("#heart");
heartIcon.addEventListener("click",()=>{
    heart.style.color = "red";
    localStorage.setItem(artistName.textContent, songTitle.textContent);

})

const shuffle = document.querySelector("#shuffle");
shuffle.addEventListener("click",()=>{
    let shuffleIndex = Math.floor(Math.random() * audioDetails.length);
    changeData(audioDetails[shuffleIndex]);
    play();
})