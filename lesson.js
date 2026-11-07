'use strict';

const vocabData = {
            detective: { word: 'detective', ipa: '/dɪˈtek.tɪv/', pos: 'noun', def: 'A person whose job is to investigate crimes and find out what happened.', examples: ['The detective looked for clues at the bank.', 'She wants to be a detective.'], translation: 'детектив, сыщик' },
            suspect: { word: 'suspect', ipa: '/ˈsʌs.pekt/', pos: 'noun', def: 'A person who the police think was involved in a crime.', examples: ['The police had one suspect: a man in a black coat.', 'He was the main suspect in the robbery.'], translation: 'подозреваемый' },
            robbery: { word: 'robbery', ipa: '/ˈrɒb.ər.i/', pos: 'noun', def: 'A crime when someone steals money or things from a person, bank, or shop.', examples: ['There was a robbery at the bank yesterday.', 'The robbery happened at 3 o\'clock.'], translation: 'ограбление' },
            prison: { word: 'prison', ipa: '/ˈprɪz.ən/', pos: 'noun', def: 'A place where people are kept as punishment for a crime.', examples: ['The suspect was in prison for two days.', 'He went to prison last year.'], translation: 'тюрьма' },
            pub: { word: 'pub', ipa: '/pʌb/', pos: 'noun', def: 'A place in Britain where people go to drink alcohol and talk.', examples: ['They met at the pub at 7 o\'clock.', 'We were in a pub last night.'], translation: 'паб, бар' },
            alone: { word: 'alone', ipa: '/əˈləʊn/', pos: 'adjective', def: 'By yourself, with no other people.', examples: ['She was at home alone.', 'Were you alone?'], translation: 'один, одна' },
            tired: { word: 'tired', ipa: '/ˈtaɪəd/', pos: 'adjective', def: 'Feeling that you need to rest or sleep.', examples: ['He was tired last night.', 'Sarah and Emma were tired this morning.'], translation: 'уставший' },
            singer: { word: 'singer', ipa: '/ˈsɪŋ.ər/', pos: 'noun', def: 'A person who sings, especially as a job.', examples: ['Was she a singer?', 'He was a singer with Queen.'], translation: 'певец, певица' },
            actor: { word: 'actor', ipa: '/ˈæk.tər/', pos: 'noun', def: 'A person who performs in films, plays, or television.', examples: ['Was Freddie Mercury an actor?', 'He wants to be an actor.'], translation: 'актёр' },
            meeting: { word: 'meeting', ipa: '/ˈmiː.tɪŋ/', pos: 'noun', def: 'An occasion when people come together to talk about something.', examples: ['I was in a meeting until 7.00.', 'She was at a meeting at 3 o\'clock.'], translation: 'встреча, совещание' },
            film: { word: 'film', ipa: '/fɪlm/', pos: 'noun', def: 'A story told with moving pictures, shown at the cinema or on TV.', examples: ['It was a terrible film.', 'We were at the cinema last night.'], translation: 'фильм' },
            'shopping centre': { word: 'shopping centre', ipa: '/ˈʃɒp.ɪŋ ˌsen.tər/', pos: 'noun', def: 'A large building with many shops inside.', examples: ['I was at the shopping centre.', 'We were in a shopping centre on Saturday.'], translation: 'торговый центр' },
            wife: { word: 'wife', ipa: '/waɪf/', pos: 'noun', def: 'The woman that a man is married to.', examples: ['His wife says he was out.', 'Where was Jason\'s wife?'], translation: 'жена' },
            friend: { word: 'friend', ipa: '/frend/', pos: 'noun', def: 'A person you like and enjoy spending time with.', examples: ['I was with a friend.', 'Jason\'s friend Kevin was at the pub.'], translation: 'друг' },
            famous: { word: 'famous', ipa: '/ˈfeɪ.məs/', pos: 'adjective', def: 'Known by many people.', examples: ['They were famous in the 60s.', 'She was a famous singer.'], translation: 'знаменитый' },
            beach: { word: 'beach', ipa: '/biːtʃ/', pos: 'noun', def: 'An area of sand or stones next to the sea.', examples: ['I was on the beach.', 'We were on the beach last summer.'], translation: 'пляж' },
            at: { word: 'at', ipa: '/æt/', pos: 'preposition', def: 'Used for specific times and places.', examples: ['The meeting was at 3 o\'clock.', 'I was at home.'], translation: 'в, у (о времени и месте)' },
            on: { word: 'on', ipa: '/ɒn/', pos: 'preposition', def: 'Used for days, dates, and surfaces/transport.', examples: ['I was at work on Monday.', 'She was on a bus.'], translation: 'в (о днях), на' },
            in: { word: 'in', ipa: '/ɪn/', pos: 'preposition', def: 'Used for months, years, parts of the day, and enclosed spaces.', examples: ['She was at the park in the afternoon.', 'He was in the kitchen.'], translation: 'в (о месяцах, частях дня, внутри)' },
            was: { word: 'was', ipa: '/wɒz/', pos: 'verb (past of "be")', def: 'Past form of "be" for I, he, she, it.', examples: ['He was at the office.', 'I was tired yesterday.'], translation: 'был, была, было' },
            were: { word: 'were', ipa: '/wɜː/', pos: 'verb (past of "be")', def: 'Past form of "be" for you, we, they.', examples: ['They were at the cinema.', 'We were happy.'], translation: 'были' }
        };

const STORE = 'ef-beginner-10b-v3';
const sections = ['Start & goals','Now → yesterday','Story words','Jason’s story','Notice the grammar','Build sentences','Say it & Kevin','Place phrases','Maisie’s day','Sentence rhythm','Detective role play','Buildings with a past','Review & exit ticket','Homework'];
const exerciseIds = ['vocabMatch','jasonGist','dialogueEx','noticeEx','chartEx','practiceA','practiceB','pronEx','kevinGist','kevinEx','storyCheck','inatEx','inatPractice','maisieEx','hotelGist','hotelEx','reviewEx','hwPast','hwQuestions','hwConversations','hwPlaces','hwPron','hwWords'];
let currentScreen = 1, selectedMatchItem = null, currentExerciseId = null, previousFocus = null, audioContext;
const $ = id => document.getElementById(id);
const normalize = text => text.toLowerCase().replace(/,/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘`]/g,"'").replace(/\bwas not\b/g,"wasn't").replace(/\bwere not\b/g,"weren't").replace(/[.!?]+\s*$/g,'').replace(/\b(1[0-2]|[1-9])[:.]00\b/g,'$1').replace(/\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|1[0-2]|[1-9])\s+o'?clock\b/g,'$1').replace(/\s+/g,' ').trim();
function accepted(input) {const variants=[input.dataset.answer,...JSON.parse(input.dataset.alternatives||'[]'),...(input.dataset.answer==='seven'?['7']:[])];return variants.some(x=>normalize(input.value)===normalize(x));}
function isAssignedResponse(input){return !input.closest('details.extra-practice:not([open])');}
function errorHint(input){
  const expected=normalize(input.dataset.answer),value=normalize(input.value),exercise=input.dataset.responseKey?.split(':')[0];
  if(/^(was|were)\b/.test(expected)&&!/^(was|were)\b/.test(value))return 'Start the question with was or were.';
  if(/\b(wasn't|weren't)\b/.test(expected)&&!/\b(wasn't|weren't)\b/.test(value))return 'Make this answer negative.';
  if((/\bwas(?:n't)?\b/.test(expected)&&/\bwere(?:n't)?\b/.test(value))||(/\bwere(?:n't)?\b/.test(expected)&&/\bwas(?:n't)?\b/.test(value)))return 'Check the subject: I/he/she/it → was; you/we/they → were.';
  if(['in','on','at'].includes(expected)||exercise==='maisieEx')return 'Check the place phrase: in / on / at.';
  if(exercise==='jasonGist')return 'Listen for a change in Jason’s answer.';
  if(exercise==='kevinGist')return 'Listen for Kevin’s location at seven.';
  if(['dialogueEx','kevinEx','inatEx','hwPron'].includes(exercise))return 'Listen again for the missing detail. Check the spelling.';
  if(['hotelEx','hotelGist'].includes(exercise))return 'Watch again and match the detail to this sentence.';
  if(exercise==='hwWords')return 'Choose a word from the list that fits the meaning.';
  if(/^(was|were)\b/.test(expected))return 'Check the order: was / were + subject + the rest?';
  if(/\b(was|were|wasn't|weren't)\b/.test(expected))return 'Use the past form of be and all the words in the cue.';
  return 'Check the cue and your spelling, then try again.';
}
function resizeAnswerFields(root=document){
  root.querySelectorAll('textarea.full-response').forEach(field=>{if(!field.offsetParent)return;field.style.height='auto';field.style.height=Math.max(42,field.scrollHeight+2)+'px';});
}
function updateBottomNav(){
  document.querySelectorAll('.bottom-nav').forEach((nav,index)=>{nav.querySelector('[data-bottom-prev]').disabled=index===0;nav.querySelector('[data-bottom-next]').disabled=index===sections.length-1;nav.querySelector('.bottom-section-name').textContent=(index+1)+' / '+sections.length+' · '+sections[index];});
}
function setupLessonPolish(){
  document.querySelectorAll('.screen').forEach(screen=>{
    const nav=document.createElement('nav');nav.className='bottom-nav';nav.setAttribute('aria-label','Navigation at the end of this section');
    const prev=document.createElement('button');prev.type='button';prev.className='nav-btn prev';prev.dataset.bottomPrev='';prev.textContent='← Back';prev.addEventListener('click',prevScreen);
    const title=document.createElement('span');title.className='bottom-section-name';
    const next=document.createElement('button');next.type='button';next.className='nav-btn next';next.dataset.bottomNext='';next.textContent='Next →';next.addEventListener('click',nextScreen);
    nav.append(prev,title,next);screen.append(nav);
  });
  document.querySelectorAll('[data-go-screen]').forEach(button=>button.addEventListener('click',()=>goToScreen(Number(button.dataset.goScreen))));
  document.querySelectorAll('details').forEach(detail=>detail.addEventListener('toggle',()=>{
    if(detail.classList.contains('extra-practice'))exerciseIds.forEach(id=>{const result=$(id+'Result');if(result?.textContent)updateResult(id);});
    requestAnimationFrame(()=>resizeAnswerFields(detail));
    if(detail.dataset.extraKey)saveProgress();
  }));
  let resizePending=false;
  window.addEventListener('resize',()=>{if(resizePending)return;resizePending=true;requestAnimationFrame(()=>{resizePending=false;resizeAnswerFields();});});
}

function feedback(input,text) {input.nextElementSibling.textContent=text;input.setAttribute('aria-invalid',input.dataset.state==='incorrect'?'true':'false');}
function setInputState(input,state) {input.dataset.state=state;input.classList.remove('correct','incorrect','revealed');if(state)input.classList.add(state);input.readOnly=false;feedback(input,({correct:'✓',incorrect:errorHint(input)})[state]||'');}
function checkExercise(id) {const box=$(id);let hasError=false,checked=0;[...box.querySelectorAll('.fill-input')].filter(isAssignedResponse).forEach(input=>{if(!input.value.trim()){setInputState(input,'');hasError=true;return;}checked++;const ok=accepted(input);if(!ok)hasError=true;if(!input.dataset.firstResult)input.dataset.firstResult=input.dataset.assisted==='true'?'assisted':ok?'correct':'incorrect';setInputState(input,ok?'correct':'incorrect');});updateResult(id);if(checked)playSound(hasError?'error':'correct');saveProgress();}
function showAnswers(id) {const inputs=[...$(id).querySelectorAll('.fill-input')].filter(isAssignedResponse);const show=inputs.some(input=>input.dataset.hintVisible!=='true');inputs.forEach(input=>{input.dataset.hintVisible=String(show);input.parentElement.querySelector('.model-answer').hidden=!show;if(show&&input.dataset.state!=='correct')input.dataset.assisted='true';});syncAnswerButton(id);saveProgress();}
function syncAnswerButton(id){const button=document.querySelector('[data-answers-for="'+id+'"]');if(button)button.textContent=$(id).querySelector('[data-hint-visible="true"]')?'Hide answers':'Show answers';}
function updateResult(id) {const box=$(id),result=$(id+'Result');if(!box||!result)return;const fields=[...box.querySelectorAll('.fill-input')],zones=[...box.querySelectorAll('.drop-zone')];const items=fields.length?fields.filter(isAssignedResponse):zones;if(!items.length){result.hidden=true;result.style.display='none';return;}const correct=items.filter(x=>x.dataset.state==='correct').length,first=items.filter(x=>x.dataset.firstResult==='correct').length;result.hidden=false;result.style.display='block';result.textContent=correct+' / '+items.length+' correct · '+first+' correct on first check without help'+(correct===items.length?' · Complete':'');}
function resetExercise(id) {const box=$(id);if(!box)return;box.querySelectorAll('.fill-input').forEach(input=>{input.value='';delete input.dataset.firstResult;delete input.dataset.assisted;delete input.dataset.hintVisible;input.parentElement.querySelector('.model-answer').hidden=true;setInputState(input,'');});box.querySelectorAll('.match-item').forEach(x=>{x.classList.remove('selected','correct','incorrect','locked');x.setAttribute('aria-pressed','false');});box.querySelectorAll('.drop-zone').forEach(zone=>{zone.textContent=zone.dataset.originalText;zone.classList.remove('filled','incorrect-flash','drag-over');delete zone.dataset.state;delete zone.dataset.firstResult;});selectedMatchItem=null;currentExerciseId=null;syncAnswerButton(id);const result=$(id+'Result');if(result){result.hidden=true;result.style.display='none';}saveProgress();}
function resetPracticeAB(){resetExercise('practiceA');resetExercise('practiceB');}function resetPracticeAB2(){resetExercise('pronEx');resetExercise('kevinEx');}function resetInAt(){resetExercise('inatEx');resetExercise('inatPractice');}
function selectMatchItem(item,id) {if(item.classList.contains('locked'))return;const same=selectedMatchItem===item;document.querySelectorAll('.match-item.selected').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false');});selectedMatchItem=same?null:item;currentExerciseId=same?null:id;if(!same){item.classList.add('selected');item.setAttribute('aria-pressed','true');}}
function dropToZone(zone,id){if(!selectedMatchItem||currentExerciseId!==id||zone.dataset.state)return;const item=selectedMatchItem,ok=item.dataset.word===zone.dataset.answer;if(!zone.dataset.firstResult)zone.dataset.firstResult=ok?'correct':'incorrect';if(ok){zone.textContent=zone.dataset.originalText+' → '+item.dataset.word;zone.dataset.state='correct';zone.classList.add('filled');item.classList.add('correct','locked');item.classList.remove('selected');item.setAttribute('aria-pressed','false');selectedMatchItem=null;currentExerciseId=null;}else{zone.classList.add('incorrect-flash');setTimeout(()=>zone.classList.remove('incorrect-flash'),600);}playSound(ok?'correct':'error');updateResult(id);saveProgress();}
function goToScreen(number){if(!Number.isInteger(number)||number<1||number>sections.length)return;document.querySelectorAll('.screen').forEach((x,i)=>x.classList.toggle('active',i+1===number));currentScreen=number;$('navTitle').textContent=`${number} / ${sections.length}`;$('sectionSelect').value=number;$('prevBtn').disabled=number===1;$('nextBtn').disabled=number===sections.length;document.querySelectorAll('.screen-dot').forEach((x,i)=>{x.classList.toggle('active',i+1===number);x.setAttribute('aria-current',i+1===number?'step':'false');});updateBottomNav();requestAnimationFrame(()=>resizeAnswerFields());document.querySelectorAll('audio,video').forEach(x=>x.pause());if('speechSynthesis'in window)speechSynthesis.cancel();window.scrollTo(0,0);saveProgress();}
function nextScreen(){goToScreen(currentScreen+1);}function prevScreen(){goToScreen(currentScreen-1);}
function toggleRef(type){const target=$(type==='vocab'?'vocabRef':'grammarRef');const open=!target.classList.contains('active');document.querySelectorAll('.ref-section').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.ref-card').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-expanded','false');});if(open){target.classList.add('active');const card=document.querySelectorAll('.ref-card')[type==='vocab'?0:1];card.classList.add('active');card.setAttribute('aria-expanded','true');}}
function openReference(type){const clone=$(type==='vocab'?'vocabRef':'grammarRef').cloneNode(true);clone.removeAttribute('id');$('referenceContent').replaceChildren(clone);$('referenceDialog').showModal();makeKeyboardAccessible(clone);}
function showVocabCard(key){const data=vocabData[key];if(!data)return;previousFocus=document.activeElement;for(const [id,value]of Object.entries({vcWord:data.word,vcIpa:data.ipa,vcPos:data.pos,vcDef:data.def,vcTranslation:data.translation}))$(id).textContent=value;$('vcExamples').replaceChildren(...data.examples.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));$('vcTranslation').classList.remove('show');$('vcTransBtn').textContent='View translation';const overlay=$('vocabOverlay');if($('referenceDialog').open)$('referenceDialog').append(overlay);overlay.classList.add('active');overlay.querySelector('.close-btn').focus();}
function closeVocabCard(event){if(event&&event.target!==$('vocabOverlay'))return;$('vocabOverlay').classList.remove('active');if(previousFocus?.isConnected)previousFocus.focus();}
function toggleTranslation(){const shown=$('vcTranslation').classList.toggle('show');$('vcTransBtn').textContent=shown?'Hide translation':'View translation';}
function playVocabAudio(){if(!('speechSynthesis'in window)){ $('vcIpa').textContent+=' — speech unavailable';return;}speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance($('vcWord').textContent);utterance.lang='en-GB';utterance.rate=.8;const voice=speechSynthesis.getVoices().find(x=>x.lang==='en-GB');if(voice)utterance.voice=voice;speechSynthesis.speak(utterance);}
function playSound(type){if(!$('soundToggle').checked)return;try{audioContext ||= new(window.AudioContext||window.webkitAudioContext)();audioContext.resume();const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.connect(gain);gain.connect(audioContext.destination);osc.frequency.value=type==='correct'?523:200;gain.gain.setValueAtTime(.05,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.15);osc.start();osc.stop(audioContext.currentTime+.15);osc.onended=()=>{osc.disconnect();gain.disconnect();};}catch{}}
function saveProgress(){
  try {
    const fields={};
    document.querySelectorAll('.fill-input').forEach(input=>fields[input.dataset.responseKey]={answer:input.dataset.answer,value:input.value,state:input.dataset.state||'',first:input.dataset.firstResult||'',assisted:input.dataset.assisted==='true',hintVisible:input.dataset.hintVisible==='true'});
    const notes={},checks={},zones={};
    document.querySelectorAll('[data-note-key]').forEach(x=>notes[x.dataset.noteKey]=x.value);
    document.querySelectorAll('[data-check-key]').forEach(x=>checks[x.dataset.checkKey]=x.checked);
    document.querySelectorAll('.drop-zone').forEach(x=>zones[x.dataset.answer]={state:x.dataset.state||'',first:x.dataset.firstResult||''});
    localStorage.setItem(STORE,JSON.stringify({version:3,extras:[...document.querySelectorAll('[data-extra-key]')].filter(x=>x.open).map(x=>x.dataset.extraKey),screen:currentScreen,sound:$('soundToggle').checked,fields,notes,checks,zones}));
    $('saveStatus').textContent='Progress saved on this device';
  } catch { $('saveStatus').textContent='Progress cannot be saved in this browser'; }
}
function legacyProgress(){
  const old=JSON.parse(localStorage.getItem('ef-beginner-10b-v2')||'null');if(!old)return null;
  const fields={};
  for(const [id,start,count] of [['chartEx',7,4],['practiceB',21,13],['inatPractice',49,6]]){
    $(id).querySelectorAll('.fill-input').forEach((input,i)=>{const entry=old.fields?.[start+i];if(i<count&&entry)fields[id+':'+i]={...entry,answer:input.dataset.answer};});
  }
  $('dialogueEx').querySelectorAll('.fill-input').forEach((input,i)=>{if([0,4].includes(i))return;const entry=old.fields?.[i];if(entry)fields['dialogueEx:'+i]={...entry,answer:input.dataset.answer};});
  const plane=old.fields?.[46];if(plane)fields['inatEx:0']={...plane,answer:'plane'};
  const zones={};['robbery','detective','suspect','prison','pub'].forEach((word,i)=>{if(old.zones?.[i])zones[word]=old.zones[i];});
  return {screen:({9:11,10:13,11:14})[old.screen]||old.screen,sound:old.sound,fields,zones,notes:{'previous-notes':(old.notes||[]).filter(Boolean).join('\n\n')},checks:{}};
}
function restoreProgress(){
  try{
    const data=JSON.parse(localStorage.getItem(STORE)||'null')||legacyProgress();if(!data)return;
    document.querySelectorAll('[data-extra-key]').forEach(x=>x.open=(data.extras||[]).includes(x.dataset.extraKey));$('soundToggle').checked=!!data.sound;
    document.querySelectorAll('.fill-input').forEach(input=>{
      const entry=data.fields?.[input.dataset.responseKey];if(!entry||entry.answer!==input.dataset.answer)return;
      input.value=entry.value||'';input.dataset.firstResult=entry.first||'';
      input.dataset.assisted=String(!!entry.assisted||entry.state==='revealed');
      input.dataset.hintVisible=String(!!entry.hintVisible||entry.state==='revealed');
      input.parentElement.querySelector('.model-answer').hidden=input.dataset.hintVisible!=='true';
      setInputState(input,entry.state==='revealed'?'':entry.state==='correct'&&!accepted(input)?'':entry.state||'');
    });
    document.querySelectorAll('.drop-zone').forEach(zone=>{const entry=data.zones?.[zone.dataset.answer];if(!entry)return;zone.dataset.firstResult=entry.first||'';if(entry.state==='correct'){zone.dataset.state='correct';zone.textContent=zone.dataset.originalText+' → '+zone.dataset.answer;zone.classList.add('filled');const item=[...$('vocabMatch').querySelectorAll('.match-item')].find(x=>x.dataset.word===zone.dataset.answer);if(item)item.classList.add('correct','locked');}});
    document.querySelectorAll('[data-note-key]').forEach(x=>x.value=data.notes?.[x.dataset.noteKey]||'');
    document.querySelectorAll('[data-check-key]').forEach(x=>x.checked=!!data.checks?.[x.dataset.checkKey]);
    exerciseIds.forEach(id=>{syncAnswerButton(id);if($(id).querySelector('[data-state="correct"],[data-state="incorrect"]'))updateResult(id);});
    if(Number.isInteger(Number(data.screen))&&Number(data.screen)>=1&&Number(data.screen)<=sections.length)currentScreen=Number(data.screen);
  }catch{}
}
function makeKeyboardAccessible(root=document){
  root.querySelectorAll('div[onclick],span[onclick]').forEach(el=>{
    el.setAttribute('role','button');el.tabIndex=0;
    if(el.classList.contains('ref-card'))el.setAttribute('aria-expanded',el.classList.contains('active')?'true':'false');
    el.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();el.click();}});
  });
}
function setupMedia(){
  document.querySelectorAll('.audio-btn').forEach(button=>{
    const track=button.getAttribute('onclick')?.match(/'([\d.]+)'/)?.[1];
    const panel=document.createElement('div');panel.className='audio-panel';
    const audio=document.createElement('audio');audio.controls=true;audio.preload='metadata';audio.src=button.dataset.audioSrc||(track?'assets/audio/Efb_'+track+'.mp3':'');audio.setAttribute('aria-label',button.getAttribute('aria-label')||button.textContent.trim());
    const label=document.createElement('label');label.textContent='Playback speed ';const select=document.createElement('select');select.className='media-speed';
    for(const speed of [.75,1,1.25])select.append(new Option(speed+'×',speed,speed===1,speed===1));
    select.addEventListener('change',()=>audio.playbackRate=Number(select.value));label.append(select);
    const error=document.createElement('p');error.className='media-error';error.hidden=true;
    audio.addEventListener('error',()=>{error.hidden=false;error.textContent='Recording unavailable. Keep the assets folder beside the lesson.';});
    panel.append(audio,label,error);button.replaceWith(panel);
  });
  document.querySelectorAll('.video-panel').forEach(panel=>{const video=panel.querySelector('video');panel.querySelector('.media-speed').addEventListener('change',event=>video.playbackRate=Number(event.target.value));video.addEventListener('error',()=>panel.querySelector('.media-error').hidden=false);});
  document.querySelectorAll('audio,video').forEach(media=>media.addEventListener('play',()=>{document.querySelectorAll('audio,video').forEach(other=>{if(other!==media)other.pause();});if('speechSynthesis'in window)speechSynthesis.cancel();}));
}
function init(){
  const legacy=document.createElement('details');legacy.className='lesson-notes';
  const summary=document.createElement('summary');summary.textContent='Notes from the earlier lesson version';
  const textarea=document.createElement('textarea');textarea.className='writing-area';textarea.dataset.noteKey='previous-notes';textarea.setAttribute('aria-label','Earlier saved notes');legacy.append(summary,textarea);$('screen14').querySelector('.card').append(legacy);
  sections.forEach((name,i)=>{
    const option=document.createElement('option');option.value=i+1;option.textContent=(i+1)+'. '+name;$('sectionSelect').append(option);
    const dot=document.createElement('button');dot.type='button';dot.className='screen-dot';dot.setAttribute('aria-label',name);dot.addEventListener('click',()=>goToScreen(i+1));$('screenDots').append(dot);
  });
  $('sectionSelect').addEventListener('change',event=>goToScreen(Number(event.target.value)));
  let counter=0;
  exerciseIds.forEach(id=>{
    const box=$(id);if(!box)throw Error('Missing exercise: '+id);
    box.querySelectorAll('.fill-input').forEach((input,i)=>{
      input.id='response-'+counter;input.dataset.responseKey=id+':'+i;input.autocomplete='off';input.spellcheck=false;
      const context=input.closest('label,.fill-sentence,.ex-row,.dialogue-line,.info-row,.info-sentence,.conv-line,.picture-task');
      input.setAttribute('aria-label',context?.textContent.trim()||sections[Number(input.closest('.screen').id.slice(6))-1]+' answer '+(i+1));
      const wrapper=document.createElement('span');wrapper.className='answer-field';wrapper.style.width=input.style.width||'140px';input.style.width='100%';input.before(wrapper);
      const model=document.createElement('span');model.className='model-answer';model.id='model-'+counter;model.hidden=true;
      model.textContent=input.tagName==='SELECT'?[...input.options].find(x=>x.value===input.dataset.answer)?.textContent||input.dataset.answer:input.dataset.answer;
      const status=document.createElement('span');status.className='answer-feedback';status.id='feedback-'+counter;status.setAttribute('aria-live','polite');
      wrapper.append(model,input,status);input.setAttribute('aria-describedby',model.id+' '+status.id);counter++;
      const onEdit=()=>{resizeAnswerFields(input.parentElement);setInputState(input,'');updateResult(id);saveProgress();};
      input.addEventListener(input.tagName==='SELECT'?'change':'input',onEdit);
      input.addEventListener('keydown',event=>{if(event.key==='Enter'&&input.tagName!=='SELECT'){event.preventDefault();checkExercise(id);}});
    });
    const result=$(id+'Result');result.setAttribute('role','status');result.setAttribute('aria-live','polite');
    if(id==='vocabMatch'){
      const hint=document.createElement('p');hint.className='exercise-hint';hint.textContent='Choose a word, then its meaning. You can also use Tab and Enter. Wrong choices stay available.';box.before(hint);return;
    }
    const controls=document.createElement('div');controls.className='exercise-actions';
    for(const [label,action]of [['Check',()=>checkExercise(id)],['Show answers',()=>showAnswers(id)],['Reset',()=>resetExercise(id)]]){
      const button=document.createElement('button');button.type='button';button.textContent=label;if(label==='Check')button.className='check-button';if(label==='Show answers')button.dataset.answersFor=id;button.addEventListener('click',action);controls.append(button);
    }
    result.after(controls);
  });
  document.querySelectorAll('.drop-zone').forEach(zone=>zone.dataset.originalText=zone.textContent.trim());
  document.querySelectorAll('.match-item').forEach(item=>item.setAttribute('aria-pressed','false'));
  document.querySelectorAll('[data-note-key]').forEach(x=>x.addEventListener('input',saveProgress));
  document.querySelectorAll('[data-check-key]').forEach(x=>x.addEventListener('change',saveProgress));
  document.querySelectorAll('[data-open-homework]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const target=$(link.dataset.openHomework);target.open=true;target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}));
  setupLessonPolish();$('soundToggle').addEventListener('change',saveProgress);setupMedia();makeKeyboardAccessible();
  document.addEventListener('keydown',event=>{
    const overlay=$('vocabOverlay');if(!overlay.classList.contains('active'))return;
    if(event.key==='Escape'){event.preventDefault();event.stopPropagation();closeVocabCard();}
    if(event.key==='Tab'){const items=[...overlay.querySelectorAll('button')];if(event.shiftKey&&document.activeElement===items[0]){event.preventDefault();items.at(-1).focus();}else if(!event.shiftKey&&document.activeElement===items.at(-1)){event.preventDefault();items[0].focus();}}
  },true);
  $('referenceDialog').addEventListener('cancel',event=>{if($('vocabOverlay').classList.contains('active')){event.preventDefault();closeVocabCard();}});
  $('referenceDialog').addEventListener('close',()=>{closeVocabCard();document.body.append($('vocabOverlay'));});
  restoreProgress();legacy.hidden=!textarea.value;goToScreen(currentScreen);
}
document.addEventListener('DOMContentLoaded',init);
