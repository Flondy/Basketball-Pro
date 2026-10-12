(function(){
  'use strict';
  const buttons=document.querySelectorAll('[data-language-button]');
  const elements=document.querySelectorAll('[data-language]');
  function setLang(lang){
    lang=lang==='en'?'en':'de';
    document.documentElement.lang=lang;
    for(const el of elements){el.hidden=el.getAttribute('data-language')!==lang;}
    for(const b of buttons){b.textContent=lang==='de'?'EN':'DE';b.setAttribute('aria-label',lang==='de'?'Switch to English':'Auf Deutsch wechseln');}
    try{const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);}catch(e){}
  }
  const fromUrl=new URLSearchParams(location.search).get('lang');
  setLang(fromUrl==='en'?'en':'de');
  for(const b of buttons){b.addEventListener('click',()=>setLang(document.documentElement.lang==='de'?'en':'de'));}
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  // Accessible simple artwork viewer, no tracking or third-party scripts.
  const gallery=document.querySelectorAll('[data-open-image]');
  if(gallery.length){
    const modal=document.createElement('div');modal.className='lightbox';modal.hidden=true;modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Artwork preview');
    modal.innerHTML='<button class="lightbox-close" type="button" aria-label="Close image">×</button><img alt=""><div class="lightbox-title"></div>';
    document.body.appendChild(modal);
    const closeBtn=modal.querySelector('button');const image=modal.querySelector('img');const title=modal.querySelector('.lightbox-title');let prevFocus=null;
    function close(){modal.hidden=true;document.body.style.overflow='';if(prevFocus)prevFocus.focus();}
    closeBtn.addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});
    document.addEventListener('keydown',e=>{if(!modal.hidden&&e.key==='Escape')close();});
    for(const item of gallery){item.addEventListener('click',()=>{prevFocus=document.activeElement;const im=item.querySelector('img');image.src=im.src;image.alt=im.alt;title.textContent=item.querySelector('h3')?.textContent||im.alt;modal.hidden=false;document.body.style.overflow='hidden';closeBtn.focus();});}
  }
})();
