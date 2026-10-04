document.querySelector('#year').textContent=new Date().getFullYear();
const copyButton=document.querySelector('.copy-email');
copyButton.addEventListener('click',async()=>{const status=document.querySelector('.copy-status');try{await navigator.clipboard.writeText(copyButton.dataset.copy);status.textContent='Email copied';}catch{status.textContent='Select the email above to copy it.';}window.clearTimeout(window.copyTimeout);window.copyTimeout=window.setTimeout(()=>{status.textContent='';},5000);});
