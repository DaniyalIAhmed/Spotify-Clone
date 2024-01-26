let currentSong = new Audio(); 
function s2m(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  
    const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
    return formattedTime;
  }
async function getSongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("/songs/")[1]);
        }
    }
    return songs
}
const playMusic = (e)=>{
    currentSong.src  = "/songs/" + e + ".mp3";
    let sInfo = document.querySelector(".sInfo");
    sInfo.innerHTML = "<h5>"+ e +"</h5>"
    currentSong.play()
    spbtn.src = "pause.svg";
}
async function main() {
    let songs = await getSongs();
    // console.log(songs);
    // let audio = new Audio(songs[0])
    let sUl = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        sUl.innerHTML = sUl.innerHTML + `<li class="l1"><div class="c1">
        <img src="music.svg" class="invert"></img>${song.replaceAll("%20", " ").replace(".mp3", "")}
        </div>
        <div class="c2">
            <img src="play.svg" class="invert s1"></img>
        </div>
    </li>`;
    }
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", ()=>{
            // console.log(e.innerText + ".mp3")
            playMusic(e.innerText);
        })
    })
    // let playBtn = document.getElementById("spbtn");
    spbtn.addEventListener("click", ()=>{
        console.log(currentSong.src);
        if(currentSong.paused){
            if(currentSong.src==""){
                alert("Please select a song!")
            }
            else{

                currentSong.play();
                spbtn.src = "pause.svg";
            }
        }
        else{
            currentSong.pause();
            spbtn.src = "play.svg";
        }
    })
    currentSong.addEventListener("timeupdate", ()=>{
        // console.log(s2m(currentSong.currentTime))
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 +"%";
    })
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let dr = (e.offsetX/e.target.getBoundingClientRect().width)*100 - 0.8;
        document.querySelector(".circle").style.left = (dr) +"%";
        currentSong.currentTime = (currentSong.duration * dr)/100;
    })
    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = 0
    })
    document.querySelector(".x").addEventListener("click",()=>{
        document.querySelector(".left").style.left = -130+"%"
    })
}
main()
console.log("Let's write some Javascript")