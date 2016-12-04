//formulario.js

$('#formulario-login-ajax').submit(function (e) { //

	e.preventDefault(); //	Anula o submit
	
	if ($('#btn_logar').val() == 'Enviando...') {
		return(false);
	}

	$('bt_recuperar').val("Enviando..."); //	Definindo o valor para "Enviando..."

	$.ajax({
		url: 'http://192.168.2.70:80/GaveteiroApi/login',
		method: 'POST',
		dataType: 'json', 
		contentType:'application/json',
		data: JSON.stringify({
			email: $('#logar-email').val(),
			senha: $('#logar-senha').val()	//	Método, é o valor que eu vou filtrar
		})
	}).done(function(data){

		console.log(data);
		//data = JSON.parse(data);
		console.log(data["token"]);
		sessionStorage.setItem("usuario", data.usuario);
		sessionStorage.setItem("token", data.token);
		window.location.assign("menu.html");
	});

	$('bt_recuperar').val("Entrar"); //	Definindo o valor para "Enviando..."
	return false;

});