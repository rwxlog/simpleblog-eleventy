// js/main.js
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.querySelector('.hamburger');
  const navList = document.querySelector('.nav-list');
  if(btn && navList){
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      navList.classList.toggle('show');
    });
    // close menu on link click (mobile)
    navList.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=> navList.classList.remove('show'));
    });
  }
});
