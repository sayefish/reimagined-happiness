/* ======== SECTIONS ======== */
const mainCard = document.getElementById('main-card');
const messagesSection = document.getElementById('messages-section');
const chithiSection = document.getElementById('chithi-section');
const birthdaySection = document.getElementById('birthday-section');

/* ======== MEDIA ======== */
const celebrationAudio = document.getElementById('celebration-audio');
celebrationAudio.volume = 0.3;

/* b1 - ONLY for CHITHI (as requested) */
const b1Audio = new Audio('assets/audio/b1.mp3');
b1Audio.volume = 0.30;
b1Audio.loop = true;

/* b2 - low background music for FRONT PAGE (main) */
const b2Audio = new Audio('assets/audio/b2.mp3');
b2Audio.volume = 0.15; // lower sound
b2Audio.loop = true;

/* birthday section default video element was replaced by two buttons & modal */
const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const modalVideoSrc = document.getElementById('modal-video-src');
const modalClose = document.getElementById('modal-close');

/* utility to pause everything */
function pauseAllMedia(){
  celebrationAudio.pause();
  b1Audio.pause();
  b1Audio.currentTime = 0;
  b2Audio.pause();

  if(!modal.classList.contains('show') && modalVideo){
    modalVideo.pause();
  }
}

/* Show section function */
function showSection(name){
    pauseAllMedia();

    mainCard.style.display = 'none';
    messagesSection.style.display = 'none';
    chithiSection.style.display = 'none';
    birthdaySection.style.display = 'none';

    closeModal();

    if(name === 'main') {
        mainCard.style.display = 'flex';
        b2Audio.play().catch(()=>{});
    }
    else if(name === 'messages') {
        messagesSection.style.display = 'flex';
        celebrationAudio.currentTime = 0;
        celebrationAudio.play().catch(()=>{});
        msgIndex = 0;
        showMessageAndImage(0);
    }
    else if(name === 'chithi') {
        chithiSection.style.display = 'flex';
        b1Audio.currentTime = 0;
        b1Audio.play().catch(()=>{});
        noteIndex = 0;
        showMessage(chithiDiv, chithiNotes[noteIndex]);
    }
    else if(name === 'birthday') {
        birthdaySection.style.display = 'flex';
    }
}

/* Front page buttons */
document.getElementById('btn-messages').onclick = ()=>{ 
    showSection('messages'); 
    launchConfetti(); 
};
document.getElementById('btn-chithi').onclick = ()=>{ 
    showSection('chithi'); 
    launchConfetti(); 
};
document.getElementById('btn-birthday').onclick = ()=>{ 
    showSection('birthday'); 
    launchConfetti(); 
};

/* OPEN CELEBRATION messages + gallery */
const birthdayMessages = [
    "Happyy Birthdayyy Myy Aluuuuuuuuuuuuuu💖💖💖\nThe only Thing that I keep in the special chamber of My Hrt is U😌🌺🌼",
    "I think The Deepest place in the World is Ur Eyes\n            ((এত আকর্ষণ কেমনে create করে ভাই?😩😩))\n  BTW always be the Brainless and Crazy Woman that I Love🤪",
    "Only Ur heart can Fit into my pieces......\nSo plzzz be My Better Half for rest of Our Lives💖🫠🫶",
    "Jst Grab Me like this......I'm never gonna let U go whatever happens.\n              Promise😊\nJst trst on ur Hippoo and let me carry ur Hrt for Whole Life🫴🙆‍♂️"
];
const birthdayImages = [
    "assets/images/img1.jpg",
    "assets/images/img2.jpg",
    "assets/images/img3.jpg",
    "assets/images/img4.jpg"
];
let msgIndex = 0;
const messagesDiv = document.getElementById('messages');
const galleryImgs = document.querySelectorAll('#gallery img');
const nextMsg = document.getElementById('next-msg');
const romanticOverlay = document.getElementById('romantic-overlay');

/* Smooth slower fade transition for messages and images */
function showMessageAndImage(index){
    messagesDiv.classList.remove('show-msg');
    galleryImgs.forEach(img => {
        img.classList.remove('show-img');
        img.style.transition = 'opacity 0.8s ease';
        img.style.opacity = 0;
    });
    romanticOverlay.classList.remove('show');

    setTimeout(() => {
        messagesDiv.textContent = birthdayMessages[index];
        galleryImgs.forEach(img => img.style.display = 'none');

        const currentImg = galleryImgs[index];
        currentImg.style.display = 'block';

        setTimeout(() => {
            currentImg.style.opacity = 1;
            messagesDiv.classList.add('show-msg');
            currentImg.classList.add('show-img');
            romanticOverlay.classList.add('show');
        }, 50);
    }, 800);
}

nextMsg.onclick = ()=>{
    msgIndex = (msgIndex + 1) % birthdayMessages.length;
    showMessageAndImage(msgIndex);
};

/* CHITHI NOTES */
const chithiNotes = [
    "Note 1:Eto Note fote lekhar mto brain apatoto nai...coding kore matha nosto ✨",
    "Note 2:  Ajkk torr dinn....Soo Be Happy and Onk beshi chill kor....jdio amk chara ar kisher chill🤪😗😏....smssa nai otao o krbo eshe....Dua kri Sustho thako....Mentally Stable thako🤪......Ar ei 3rd October aro hajar hajar bar ashuk....Ontoto amr chye 1 bar beshi ashuk....ar Every 3rd October jate amra eksthe Spend krte pari🫠.....Ar... umm🤔...Chocolate ar Chicken khaiyo ajk beshi beshi 😁....",
    "Note 3:Most importantly,Ur Hippo Loves U the Most mossttt and Mossttt...And alsoo missing U sooo soooo sooooo Muchhhhhh ❤️"
];
let noteIndex = 0;
const chithiDiv = document.getElementById('chithi-messages');
const nextChithi = document.getElementById('next-chithi');

nextChithi.onclick = ()=>{
    noteIndex = (noteIndex + 1) % chithiNotes.length;
    showMessage(chithiDiv, chithiNotes[noteIndex]);
};

function showMessage(el, text){
    el.classList.remove('show-msg');
    setTimeout(()=>{ el.textContent = text; el.classList.add('show-msg'); }, 100);
}

/* CONFETTI */
function launchConfetti(){
    const confettiCanvas = document.getElementById('confetti');
    if(!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confettis = [];
    const colors = ["#ff4d94","#ff66b3","#ff1a75","#ff99c2","#ffe6f0"];
    for(let i=0;i<150;i++){
        confettis.push({
            x:Math.random()*window.innerWidth,
            y:Math.random()*window.innerHeight - window.innerHeight,
            r:Math.random()*6+4,
            tilt:Math.random()*10-5,
            tiltAngle:Math.random()*Math.PI*2,
            tiltAngleIncrement:0.05+Math.random()/10,
            color: colors[Math.floor(Math.random()*colors.length)],
            speed: 2+Math.random()*3
        });
    }

    function draw(){
        ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
        confettis.forEach(c=>{
            c.tiltAngle += c.tiltAngleIncrement;
            c.y += c.speed;
            c.tilt = Math.sin(c.tiltAngle)*10;
            ctx.beginPath();
            ctx.moveTo(c.x + c.tilt, c.y);
            ctx.lineTo(c.x + c.tilt + c.r/2, c.y + c.r);
            ctx.strokeStyle = c.color;
            ctx.lineWidth = 2;
            ctx.stroke();
            if(c.y > confettiCanvas.height) c.y = -10;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

/* BUTTON SPARKLE */
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${e.offsetX}px`;
        sparkle.style.top = `${e.offsetY}px`;
        btn.appendChild(sparkle);
        setTimeout(()=>{ sparkle.remove(); },500);
    });
});

/* VIDEO MODAL */
const openBirthday1 = document.getElementById('open-birthday-1');
const openBirthday2 = document.getElementById('open-birthday-2');

openBirthday1.addEventListener('click', ()=> openVideoModal('assets/video/birthday.mp4'));
openBirthday2.addEventListener('click', ()=> openVideoModal('assets/video/birthday2.mp4'));

function openVideoModal(src){
    pauseAllMedia();

    modalVideoSrc.src = src;
    modalVideo.load();
    modal.classList.add('show');
    setTimeout(()=> {
        modalVideo.play().catch(()=>{ });
    }, 120);
    modal.setAttribute('aria-hidden','false');
}

modalClose.addEventListener('click', ()=> {
    closeModal();
    showSection('birthday');
});

modal.addEventListener('click', (e)=>{
    if(e.target === modal) {
        closeModal();
        showSection('birthday');
    }
});

function closeModal(){
    if(!modal) return;
    modal.classList.remove('show');
    try { modalVideo.pause(); modalVideo.currentTime = 0; } catch(e) {}
    modal.setAttribute('aria-hidden','true');
}

/* PAGE VISIBILITY */
document.addEventListener('visibilitychange', () => {
  if(document.hidden) {
    pauseAllMedia();
  } else {
    if(mainCard.style.display !== 'none'){
      b2Audio.play().catch(()=>{});
    }
  }
});

/* INITIAL STATE */
showSection('main');
