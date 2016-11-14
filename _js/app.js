document.getElementById('navbar').addEventListener('click', function(e) {

    if (e.target && e.target.classList.contains('js-navbar-menu-btn')) {
	document.getElementsByClassName('js-navbar-menu')[0].classList.toggle('is-active');
    }
    
});
