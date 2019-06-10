(function() {
  var menu = document.querySelector('aside.book-menu nav');
  addEventListener('beforeunload', function(event) {
    localStorage.setItem('menu.scrollTop', menu.scrollTop)
  });
  menu.scrollTop = localStorage.getItem('menu.scrollTop');

  var siteNav = document.getElementById('site-nav');
  var burgerMenu = document.querySelector('.burger-menu');
  burgerMenu.addEventListener('click', function() {
    siteNav.classList.toggle('menu-opened');
  });
})()
