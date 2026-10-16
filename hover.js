(() => {
  const DWELL_MS=1000, SLIDE_MS=2000;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-hover-preview], [data-extension-gallery]').forEach(media=>{
    const overlay=media.querySelector('.hover-content');
    const slides=[...media.querySelectorAll(overlay?'.hover-slide':'img')];
    if(!slides.length)return;
    const title=media.closest('article').querySelector('h3').textContent;
    let index=0,timer=null,hovered=false,focused=false,inView=false;
    const badge=document.createElement('span');badge.className='preview-badge';badge.setAttribute('aria-hidden','true');media.querySelector('.hover-hint')?.remove();media.append(badge);
    function show(i){index=i;slides.forEach((s,n)=>{s.classList.toggle(overlay?'is-preview-active':'is-active',n===i);s.setAttribute('aria-hidden',String(n!==i));if(s.tagName==='IMG'&&n===i&&!s.alt)s.alt=`${title} screenshot ${n+1}`;});}
    function stop(){clearTimeout(timer);timer=null;}
    function reset(){stop();show(0);media.classList.remove('is-previewing');badge.textContent='HOVER TO PREVIEW';if(overlay)overlay.setAttribute('aria-hidden',String(matchMedia('(hover: hover)').matches));}
    function advance(){timer=null;if(!eligible()){reset();return;}media.classList.add('is-previewing');if(overlay)overlay.setAttribute('aria-hidden','false');show(slides.length>1?(index+1)%slides.length:0);badge.textContent=slides.length>1?`${index+1} / ${slides.length}`:'PREVIEW';if(slides.length>1&&!reduced.matches)timer=setTimeout(advance,SLIDE_MS);}
    function eligible(){return (hovered||focused)&&inView&&!document.hidden&&!media.closest('article').hidden;}
    function sync(){if(!eligible()){reset();return;}if(timer!==null||media.classList.contains('is-previewing'))return;timer=setTimeout(advance,DWELL_MS);}
    media.addEventListener('mouseenter',()=>{hovered=true;sync();});media.addEventListener('mouseleave',()=>{hovered=false;sync();});
    media.addEventListener('focus',()=>{focused=true;sync();});media.addEventListener('blur',()=>{focused=false;sync();});
    new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;sync();},{threshold:.1}).observe(media);
    document.addEventListener('visibilitychange',sync);document.addEventListener('gallery-filter',sync);
    reduced.addEventListener('change',()=>{reset();sync();});reset();
  });
})();
