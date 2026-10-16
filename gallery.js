(() => {
  const cards=[...document.querySelectorAll('#project-gallery .project-card')];
  const filters=[...document.querySelectorAll('[data-filter]')];
  const more=document.querySelector('#show-all'),status=document.querySelector('#gallery-status');
  const grid=document.querySelector('#project-gallery');
  let category='all';
  const groups=[['data','01 / DATA & BI','Turning data into decisions.'],['tools','02 / EXTENSIONS & AUTOMATION','Tools for everyday frustrations.'],['basketball','03 / BASKETBALL ANALYTICS','Exploring the game through data.']];
  const headings=groups.map(([key,label,title])=>{const h=document.createElement('div');h.className='collection-heading';h.innerHTML=`<span>${label}</span><h2>${title}</h2>`;grid.append(h);cards.filter(c=>c.dataset.category===key).forEach(c=>grid.append(c));return {key,h};});
  function render(){
    grid.classList.toggle('is-filtered',category!=='all');
    const matching=cards.filter(c=>category==='all'||c.dataset.category===category);
    cards.forEach(c=>{c.hidden=!matching.includes(c);});
    headings.forEach(({key,h})=>{h.hidden=!cards.some(c=>!c.hidden&&c.dataset.category===key);});
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===category)));
    more.hidden=true;status.textContent=`${matching.length} projects`;document.dispatchEvent(new Event('gallery-filter'));
  }
  filters.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;render();}));render();
})();
