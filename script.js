const menuButton=document.querySelector('.menu-button');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.querySelector('span').textContent='+';}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);menuButton.querySelector('span').textContent=open?'−':'+';});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
const copyButton=document.querySelector('.copy-email');
copyButton.addEventListener('click',async()=>{const status=document.querySelector('.copy-status');try{await navigator.clipboard.writeText(copyButton.dataset.copy);status.textContent='Email copied';}catch{status.textContent='Select the email above to copy it.';}window.clearTimeout(window.copyTimeout);window.copyTimeout=window.setTimeout(()=>{status.textContent='';},5000);});
