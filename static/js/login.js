submit = document.getElementById('submit');

submit.addEventListener('click',(e)=>{
    // e.preventDefault();
   
   var  name=document.getElementById('name').value;
   localStorage.setItem('name',name);
    
});

localStorage.setItem('href',window.location.href);