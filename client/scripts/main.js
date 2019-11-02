$(document).ready(function($) {
	tab = $('.tabs h3 a');

	tab.on('click', function(event) {
		event.preventDefault();
		tab.removeClass('active');
		$(this).addClass('active');

		tab_content = $(this).attr('href');
		$('div[id$="tab-content"]').removeClass('active');
		$(tab_content).addClass('active');
	});

	if(localStorage.getItem('ft_token')){
		$('.form-wrap').hide();
	}
});

$('#register_submit').click(function(event){
	event.preventDefault();
	$.ajax({
		method: 'post',
		url: 'http://localhost:3000/register',
		data:{
			email: $('#user_email').val(),
			username: $('#user_name').val(),
			password: $('#user_pass').val()
		}
	})
	.done(response=>{
		console.log(response);
	})
	.fail(err=>{
		console.log(err);
	})
});

$('#login_submit').click(function(event){
	event.preventDefault();
	$.ajax({
		method: 'post',
		url: 'http://localhost:3000/signin',
		data:{
			email: $('#user_login_email').val(),
			password: $('#user_login_pass').val()
		}
	})
	.done(response=>{
		console.log(response.token);
		localStorage.setItem('ft_token', response.token);
		$('.form-wrap').hide();
	})
	.fail(err=>{
		console.log(err)
	})
});