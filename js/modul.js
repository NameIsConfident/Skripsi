function shuffle(array){
for(let i=array.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[array[i],array[j]]=[array[j],array[i]];
}
return array;
}

/* =========================
GET USER GROUP
========================= */

const userGroup = sessionStorage.getItem("userGroup") || "mahasiswa";

const userName = sessionStorage.getItem("userName");

if(!userName){
window.location.href = "index.html";
}

/* =========================
INTERACTIVE FACE
========================= */

const char=document.getElementById("char");
const eyes=document.querySelectorAll(".eye");

let clickCount=0;

const messages=[
"Martabat sesama perlu dijaga.",
"Setiap pilihan memiliki dampak sosial.",
"Nilai Poangka-angkataka dibangun melalui empati.",
"Setiap keputusan membawa konsekuensi sosial.",
"Martabat sosial tercermin melalui sikap."
];

const easter=[
"Pesan tersembunyi berhasil ditemukan.",
"Empati merupakan inti dari Poangka-angkataka.",
"Kemampuan observasi telah ditunjukkan.",
"Martabat sesama perlu terus dijaga."
];

const bubble=document.createElement("div");
bubble.style.position="absolute";
bubble.style.bottom="130px";
bubble.style.left="50%";
bubble.style.transform="translateX(-50%)";
bubble.style.background="rgba(0,0,0,.8)";
bubble.style.padding="8px 14px";
bubble.style.borderRadius="20px";
bubble.style.fontSize="12px";
bubble.style.display="none";

char.appendChild(bubble);

char.addEventListener("click",()=>{

clickCount++;

let text;

if(clickCount>=5){
text=easter[Math.floor(Math.random()*easter.length)];
clickCount=0;
}else{
text=messages[Math.floor(Math.random()*messages.length)];
}

bubble.innerText=text;
bubble.style.display="block";

setTimeout(()=>{
bubble.style.display="none";
},2000);

});


/* =========================
EYES FOLLOW
========================= */

document.addEventListener("mousemove",(e)=>{

const rect=char.getBoundingClientRect();

const centerX=rect.left+rect.width/2;
const centerY=rect.top+rect.height/2;

const angle=Math.atan2(
e.clientY-centerY,
e.clientX-centerX
);

const moveX=Math.cos(angle)*4;
const moveY=Math.sin(angle)*4;

eyes.forEach(eye=>{
eye.style.transform=`translate(${moveX}px,${moveY}px)`;
});

});


/* =========================
BLINK
========================= */

setInterval(()=>{

eyes.forEach(eye=>{
eye.style.transform="scaleY(.1)";
});

setTimeout(()=>{
eyes.forEach(eye=>{
eye.style.transform="scaleY(1)";
});
},150);

},4000);


/* =========================
SCENARIO BUILDER
========================= */

function makeScenario(text, good, bad, a,b,c){

let choices = [
{ text:a, correct:false},
{ text:b, correct:false},
{ text:c, correct:false}
];

const correctIndex = Math.floor(Math.random()*3);
choices[correctIndex].correct = true;

return {
text:text,
reactionGood:good,
reactionBad:bad,
choices:choices
};

}


/* =========================
SCENARIOS SD
========================= */

const scenariosSD = shuffle([

{
text:"Pada waktu istirahat, terlihat seorang peserta didik berdiri sendiri di dekat lapangan. Keinginan untuk ikut bermain tampak terlihat, namun kelompok lain telah memulai permainan.",
reactionGood:"Perasaan diterima mulai dirasakan dan interaksi sosial dapat terjalin.",
reactionBad:"Perasaan terabaikan mulai muncul dalam situasi tersebut.",
choices:[
{ text:"Kesempatan untuk bergabung diberikan", correct:true},
{ text:"Permainan tetap dilanjutkan tanpa melibatkan peserta tersebut", correct:false},
{ text:"Peserta tersebut diarahkan mencari kelompok lain", correct:false}
]
},

{
text:"Pada saat pembelajaran berlangsung, seorang peserta didik memberikan jawaban yang kurang tepat. Beberapa peserta lain mulai tertawa pelan.",
reactionGood:"Kepercayaan diri tetap terjaga dan keberanian untuk mencoba kembali muncul.",
reactionBad:"Rasa malu muncul sehingga keinginan untuk mencoba kembali berkurang.",
choices:[
{ text:"Dukungan diberikan agar tetap berani mencoba", correct:true},
{ text:"Tawa ikut diberikan agar suasana dianggap santai", correct:false},
{ text:"Situasi dibiarkan tanpa respons", correct:false}
]
},

{
text:"Dalam kegiatan kelompok, terlihat seorang peserta mengalami kesulitan dalam memahami tugas yang diberikan.",
reactionGood:"Perasaan terbantu muncul dan partisipasi dalam kelompok meningkat.",
reactionBad:"Perasaan tidak dianggap mulai dirasakan dalam kelompok.",
choices:[
{ text:"Penjelasan diberikan dengan sabar", correct:true},
{ text:"Tugas langsung diambil alih tanpa penjelasan", correct:false},
{ text:"Situasi diabaikan dan pekerjaan dilanjutkan", correct:false}
]
},

{
text:"Saat waktu makan, seorang peserta membawa bekal sederhana dan mulai dibandingkan oleh peserta lain.",
reactionGood:"Rasa nyaman tetap terjaga dalam kebersamaan.",
reactionBad:"Perasaan minder mulai muncul dalam diri peserta tersebut.",
choices:[
{ text:"Pemahaman bahwa setiap bekal memiliki nilai yang sama disampaikan", correct:true},
{ text:"Perbandingan terhadap bekal lain ikut dilakukan", correct:false},
{ text:"Situasi dibiarkan tanpa respons", correct:false}
]
},

{
text:"Dalam kegiatan bermain, seorang peserta mengalami kekalahan dan terlihat kecewa hingga memilih duduk sendiri.",
reactionGood:"Semangat untuk kembali bermain mulai tumbuh.",
reactionBad:"Keinginan untuk ikut bermain semakin berkurang.",
choices:[
{ text:"Dukungan diberikan agar semangat kembali muncul", correct:true},
{ text:"Komentar yang merendahkan kemampuan diberikan", correct:false},
{ text:"Permainan tetap dilanjutkan tanpa perhatian", correct:false}
]
},

{
text:"Pada waktu istirahat, terlihat seorang peserta duduk sendirian sementara peserta lain bermain bersama.",
reactionGood:"Perasaan ditemani dan dihargai mulai dirasakan.",
reactionBad:"Perasaan kesepian tetap dirasakan.",
choices:[
{ text:"Interaksi sosial mulai dibangun dengan peserta tersebut", correct:true},
{ text:"Peserta tersebut dibiarkan sendiri", correct:false},
{ text:"Interaksi dihindari agar tidak merasa canggung", correct:false}
]
},

{
text:"Saat kegiatan bermain berlangsung, seorang peserta terjatuh dan terlihat kesakitan.",
reactionGood:"Perasaan diperhatikan dan dibantu mulai dirasakan.",
reactionBad:"Perasaan diabaikan muncul dalam situasi tersebut.",
choices:[
{ text:"Bantuan segera diberikan dan kondisi ditanyakan", correct:true},
{ text:"Situasi dianggap lucu dan ditertawakan", correct:false},
{ text:"Permainan tetap dilanjutkan", correct:false}
]
},

{
text:"Pada saat kegiatan membaca di depan kelas, seorang peserta terlihat gugup dan membaca dengan pelan.",
reactionGood:"Kepercayaan diri meningkat dan keberanian tetap terjaga.",
reactionBad:"Rasa gugup semakin meningkat dan kegiatan terhenti.",
choices:[
{ text:"Perhatian dan dukungan diberikan dengan tenang", correct:true},
{ text:"Permintaan untuk membaca lebih cepat diberikan", correct:false},
{ text:"Cara membaca dijadikan bahan tertawaan", correct:false}
]
},

{
text:"Saat pembelajaran dimulai, seorang peserta tidak membawa alat tulis.",
reactionGood:"Perasaan terbantu mulai dirasakan.",
reactionBad:"Perasaan tidak dipedulikan muncul dalam situasi tersebut.",
choices:[
{ text:"Bantuan berupa alat tulis diberikan", correct:true},
{ text:"Peserta tersebut diarahkan mencari bantuan sendiri", correct:false},
{ text:"Situasi diabaikan", correct:false}
]
},

{
text:"Dalam diskusi kelompok, pendapat seorang peserta tidak langsung diterima sehingga rasa ragu mulai terlihat.",
reactionGood:"Keberanian untuk menyampaikan pendapat kembali muncul.",
reactionBad:"Peserta memilih diam selama diskusi berlangsung.",
choices:[
{ text:"Kesempatan untuk menyampaikan pendapat kembali diberikan", correct:true},
{ text:"Topik diskusi langsung dialihkan", correct:false},
{ text:"Diskusi tetap dilanjutkan tanpa melibatkan peserta tersebut", correct:false}
]
}

]);

/* =========================
SCENARIOS SMP
========================= */

const scenariosSMP = shuffle([

{
text:"Pada grup kelas, sebuah foto seorang peserta dibagikan dengan konteks candaan. Beberapa peserta mulai memberikan respons yang dapat menimbulkan rasa malu.",
reactionGood:"Situasi menjadi lebih kondusif dan martabat individu tetap terjaga.",
reactionBad:"Candaan berkembang lebih jauh dan rasa tidak nyaman mulai muncul.",
choices:[
{ text:"Ajakan untuk menjaga etika komunikasi disampaikan", correct:true},
{ text:"Respons berupa candaan ikut diberikan", correct:false},
{ text:"Topik dialihkan tanpa menyelesaikan situasi", correct:false}
]
},

{
text:"Dalam diskusi kelompok, pendapat seorang peserta langsung ditolak tanpa diberikan kesempatan untuk menjelaskan lebih lanjut.",
reactionGood:"Kepercayaan diri kembali tumbuh dan diskusi menjadi lebih terbuka.",
reactionBad:"Peserta memilih tidak menyampaikan pendapat kembali.",
choices:[
{ text:"Kesempatan untuk menjelaskan pendapat kembali diberikan", correct:true},
{ text:"Topik diskusi langsung dialihkan", correct:false},
{ text:"Pendapat mayoritas langsung diikuti", correct:false}
]
},

{
text:"Hasil belajar seorang peserta memperoleh nilai yang kurang memuaskan, kemudian mulai dibandingkan dengan peserta lain.",
reactionGood:"Perasaan dihargai tetap dapat dirasakan.",
reactionBad:"Perasaan minder dan tekanan sosial mulai muncul.",
choices:[
{ text:"Pemahaman bahwa proses belajar setiap individu berbeda disampaikan", correct:true},
{ text:"Perbandingan nilai ikut dilakukan", correct:false},
{ text:"Situasi dibiarkan tanpa respons", correct:false}
]
},

{
text:"Dalam kerja kelompok, terlihat seorang anggota kurang aktif karena tampak ragu untuk berbicara.",
reactionGood:"Partisipasi mulai meningkat dan kontribusi mulai diberikan.",
reactionBad:"Peserta semakin menarik diri dari kelompok.",
choices:[
{ text:"Kesempatan untuk menyampaikan pendapat diberikan", correct:true},
{ text:"Tugas langsung diambil alih", correct:false},
{ text:"Keluhan terhadap peserta disampaikan ke anggota lain", correct:false}
]
},

{
text:"Saat presentasi berlangsung, seorang peserta menyampaikan informasi yang kurang tepat dan beberapa peserta lain mulai berbisik.",
reactionGood:"Koreksi dapat diterima tanpa menimbulkan rasa malu.",
reactionBad:"Rasa gugup meningkat dan kepercayaan diri menurun.",
choices:[
{ text:"Koreksi disampaikan dengan bahasa yang sopan", correct:true},
{ text:"Kesalahan langsung ditunjukkan di depan umum", correct:false},
{ text:"Situasi dibiarkan begitu saja", correct:false}
]
},

{
text:"Dalam pembagian kelompok, terlihat seorang peserta belum memperoleh kelompok belajar.",
reactionGood:"Perasaan diterima mulai dirasakan dalam kelompok.",
reactionBad:"Perasaan dikucilkan mulai muncul.",
choices:[
{ text:"Kesempatan untuk bergabung diberikan", correct:true},
{ text:"Situasi dibiarkan karena kelompok dianggap penuh", correct:false},
{ text:"Peserta diarahkan mencari kelompok lain sendiri", correct:false}
]
},

{
text:"Saat diskusi berlangsung, seorang peserta menyampaikan pendapat dengan suara pelan sehingga perhatian peserta lain mulai berkurang.",
reactionGood:"Keberanian untuk berbicara tetap terjaga.",
reactionBad:"Peserta memilih berhenti berbicara.",
choices:[
{ text:"Ajakan untuk mendengarkan dengan baik disampaikan", correct:true},
{ text:"Pendapat lain langsung disampaikan", correct:false},
{ text:"Pembahasan dialihkan ke topik lain", correct:false}
]
},

{
text:"Dalam kerja kelompok, kesalahan kecil terjadi dan seorang anggota mulai disalahkan oleh peserta lain.",
reactionGood:"Suasana diskusi menjadi lebih tenang dan konstruktif.",
reactionBad:"Ketegangan mulai muncul dalam kelompok.",
choices:[
{ text:"Ajakan untuk memperbaiki kesalahan bersama disampaikan", correct:true},
{ text:"Kesalahan ditunjukkan secara langsung", correct:false},
{ text:"Situasi dibiarkan tanpa respons", correct:false}
]
},

{
text:"Perbedaan pendapat muncul dalam diskusi dan salah satu peserta mulai dianggap tidak sejalan dengan kelompok.",
reactionGood:"Diskusi berkembang menjadi lebih terbuka dan sehat.",
reactionBad:"Peserta memilih diam dan tidak berpartisipasi lagi.",
choices:[
{ text:"Pemahaman bahwa perbedaan pendapat merupakan hal wajar disampaikan", correct:true},
{ text:"Pendapat mayoritas langsung diikuti", correct:false},
{ text:"Diskusi dihentikan", correct:false}
]
},

{
text:"Dalam kegiatan kelas, seorang peserta terlihat gugup saat diminta berbicara di depan umum.",
reactionGood:"Kepercayaan diri meningkat dan keberanian mulai tumbuh.",
reactionBad:"Ketegangan semakin meningkat.",
choices:[
{ text:"Dukungan verbal diberikan sebelum berbicara", correct:true},
{ text:"Tugas berbicara langsung diambil alih", correct:false},
{ text:"Situasi hanya diamati tanpa respons", correct:false}
]
}

]);

/* =========================
SCENARIOS MAHASISWA
========================= */

const scenariosMahasiswa = shuffle([

{
text:"Dalam diskusi kelas, sebuah gagasan disampaikan namun langsung ditolak tanpa diberikan kesempatan untuk penjelasan lebih lanjut.",
reactionGood:"Diskusi berkembang menjadi lebih terbuka dan partisipasi tetap terjaga.",
reactionBad:"Keinginan untuk berkontribusi mulai menurun.",
choices:[
{ text:"Kesempatan untuk menjelaskan gagasan lebih lanjut diberikan", correct:true},
{ text:"Diskusi langsung diarahkan ke topik lain", correct:false},
{ text:"Keputusan mayoritas langsung diikuti", correct:false}
]
},

{
text:"Saat presentasi kelompok berlangsung, kesalahan penyampaian data terjadi dan situasi mulai menimbulkan tekanan pada salah satu anggota.",
reactionGood:"Situasi menjadi lebih tenang dan penyampaian materi dapat dilanjutkan.",
reactionBad:"Tekanan meningkat dan rasa percaya diri menurun.",
choices:[
{ text:"Bantuan diberikan tanpa menyalahkan pihak tertentu", correct:true},
{ text:"Kesalahan langsung dikoreksi dengan nada tegas", correct:false},
{ text:"Situasi dibiarkan tanpa dukungan", correct:false}
]
},

{
text:"Dalam kerja tim, terlihat seorang anggota kurang terlibat dalam proses pengambilan keputusan.",
reactionGood:"Partisipasi meningkat dan kontribusi mulai diberikan.",
reactionBad:"Anggota semakin menarik diri dari kelompok.",
choices:[
{ text:"Kesempatan untuk menyampaikan pendapat diberikan", correct:true},
{ text:"Diskusi dilanjutkan tanpa melibatkan anggota tersebut", correct:false},
{ text:"Tanggung jawab langsung diambil alih", correct:false}
]
},

{
text:"Kritik terhadap sebuah ide disampaikan dengan nada keras di depan kelompok sehingga suasana diskusi mulai berubah.",
reactionGood:"Diskusi kembali berjalan secara sehat dan profesional.",
reactionBad:"Ketegangan dalam kelompok semakin meningkat.",
choices:[
{ text:"Arah diskusi dikembalikan pada kritik yang konstruktif", correct:true},
{ text:"Kritik tersebut langsung didukung", correct:false},
{ text:"Diskusi dihentikan sepenuhnya", correct:false}
]
},

{
text:"Salah satu anggota kelompok terlihat gugup saat harus mempresentasikan hasil kerja yang belum sepenuhnya sempurna.",
reactionGood:"Kepercayaan diri meningkat dan presentasi dapat dilanjutkan.",
reactionBad:"Keraguan semakin meningkat.",
choices:[
{ text:"Dukungan diberikan bahwa proses belajar merupakan hal wajar", correct:true},
{ text:"Presentasi langsung diambil alih", correct:false},
{ text:"Presentasi disarankan untuk ditunda", correct:false}
]
},

{
text:"Dalam diskusi daring, sebuah pendapat ditanggapi dengan kalimat yang bersifat merendahkan.",
reactionGood:"Diskusi kembali fokus pada substansi dan berlangsung lebih sehat.",
reactionBad:"Konflik berkembang lebih jauh.",
choices:[
{ text:"Fokus diskusi diarahkan kembali pada isi argumen", correct:true},
{ text:"Respons balasan dengan nada sarkastik diberikan", correct:false},
{ text:"Diskusi langsung ditinggalkan", correct:false}
]
},

{
text:"Dalam kerja kelompok, keterlambatan penyelesaian tugas terjadi dan salah satu anggota mulai disalahkan.",
reactionGood:"Situasi menjadi lebih saling memahami dan solusi mulai dicari.",
reactionBad:"Perasaan dipermalukan mulai muncul.",
choices:[
{ text:"Kendala yang dihadapi ditanyakan terlebih dahulu", correct:true},
{ text:"Teguran langsung diberikan di depan seluruh anggota", correct:false},
{ text:"Keluhan disampaikan tanpa mencari solusi", correct:false}
]
},

{
text:"Sebuah ide yang disampaikan dalam diskusi tidak dipilih sehingga salah satu anggota terlihat kecewa.",
reactionGood:"Perasaan tetap dihargai dan motivasi tetap terjaga.",
reactionBad:"Keinginan untuk berpendapat mulai menurun.",
choices:[
{ text:"Apresiasi terhadap gagasan tetap diberikan sebelum memilih alternatif", correct:true},
{ text:"Ide langsung digantikan tanpa tanggapan", correct:false},
{ text:"Diskusi segera diakhiri", correct:false}
]
},

{
text:"Kesalahan kecil terjadi dalam proses kerja kelompok dan berdampak pada hasil akhir pekerjaan.",
reactionGood:"Perbaikan dapat dilakukan bersama secara profesional.",
reactionBad:"Perasaan disalahkan mulai muncul.",
choices:[
{ text:"Perbaikan dilakukan bersama melalui kerja sama tim", correct:true},
{ text:"Kesalahan langsung ditunjukkan di depan kelompok", correct:false},
{ text:"Seluruh tugas langsung diambil alih", correct:false}
]
},

{
text:"Perbedaan pendapat yang kuat muncul dalam diskusi hingga suasana mulai memanas.",
reactionGood:"Diskusi kembali produktif dan solusi bersama mulai ditemukan.",
reactionBad:"Konflik semakin berkembang dan komunikasi menurun.",
choices:[
{ text:"Upaya mencari titik temu dilakukan bersama", correct:true},
{ text:"Salah satu pihak langsung didukung", correct:false},
{ text:"Diskusi dihentikan tanpa penyelesaian", correct:false}
]
}

]);

/* =========================
PICK SCENARIO
========================= */

let scenarios;

if(userGroup==="sd") scenarios=scenariosSD;
else if(userGroup==="smp") scenarios=scenariosSMP;
else scenarios=scenariosMahasiswa;


/* =========================
ENGINE
========================= */

let index=0;
let benar=0;
let salah=0;
let meter=0;

const scenario=document.getElementById("scenario");
const choicesBox=document.getElementById("choices");
const feedback=document.getElementById("feedback");
const next=document.getElementById("next");
const restart=document.getElementById("restart");
const reaction=document.getElementById("reaction");
const meterFill=document.getElementById("meter");

const benarEl=document.getElementById("benar");
const salahEl=document.getElementById("salah");

const current=document.getElementById("current");
const level=document.getElementById("level");

function setFace(type){
char.classList.remove("happy","sad","neutral");
char.classList.add(type);
}

function updateLevel(){

if(meter<20) level.innerText="Level: Kurang Empati";
else if(meter<40) level.innerText="Level: Mulai Memahami";
else if(meter<60) level.innerText="Level: Menghargai Sesama";
else if(meter<80) level.innerText="Level: Penjaga Martabat";
else level.innerText="Level: Poangka-Angkataka Sejati";

}

function load(){

setFace("neutral");

current.innerText=index+1;

feedback.style.display="none";
next.style.display="none";

const data=scenarios[index];

scenario.innerText=data.text;

choicesBox.innerHTML="";

shuffle([...data.choices]).forEach(c=>{

const btn=document.createElement("button");
btn.className="choice";
btn.innerText=c.text;

btn.onclick=()=>select(btn,c.correct,data);

choicesBox.appendChild(btn);

});

}

function select(btn,correct,data){

document.querySelectorAll(".choice")
.forEach(b=>b.disabled=true);

if(correct){

btn.classList.add("correct");

reaction.innerText=data.reactionGood;
feedback.innerText="Pilihan ini menjaga martabat sesama.";

benar++;
meter+=10;

setFace("happy");

}else{

btn.classList.add("wrong");

reaction.innerText=data.reactionBad;
feedback.innerText="Pilihan ini dapat menurunkan martabat orang lain.";

salah++;
meter-=10;

setFace("sad");

}

meter=Math.max(0,Math.min(100,meter));

meterFill.style.width=meter+"%";

updateLevel();

benarEl.innerText=benar;
salahEl.innerText=salah;

feedback.style.display="block";
next.style.display="inline-block";

}

next.onclick=()=>{

index++;

if(index>=scenarios.length){
ending();
}else{
load();
}

};

restart.onclick=()=>{

index=0;
benar=0;
salah=0;
meter=0;

benarEl.innerText=0;
salahEl.innerText=0;

meterFill.style.width="0%";

scenarios=shuffle(scenarios);

restart.style.display="none";

load();

};

function ending(){

scenario.innerText="Simulasi selesai";
choicesBox.innerHTML="";
reaction.innerText="";

if(meter>=70){

feedback.innerText="Nilai Poangka-Angkataka telah berhasil diterapkan.";
setFace("happy");

}else if(meter>=40){

feedback.innerText="Pemahaman terhadap nilai Poangka-Angkataka telah ditunjukkan dengan baik.";
setFace("neutral");

}else{

feedback.innerText="Pemahaman terhadap nilai Poangka-Angkataka masih perlu ditingkatkan.";
setFace("sad");

}

feedback.style.display="block";
next.style.display="none";
restart.style.display="inline-block";

}

load();

