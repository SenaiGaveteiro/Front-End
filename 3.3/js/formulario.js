//formulario.js

$('#formulario-login-ajax').submit(function (e) { //

	e.preventDefault(); //	Anula o submit
	
	if ($('#btn_logar').val() == 'Enviando...') {
		return(false);
	}

	$('#bt_logar').val("Enviando..."); //	Definindo o valor para "Enviando..."
	//alert($('#logar-email').val());
	$.ajax({
		url: 'http://192.168.1.50:8081/GaveteiroApi/login',
		method: 'POST',
		dataType: 'json', 
		contentType:'application/json',
		data: JSON.stringify({
			email: $('#logar-email').val(),
			senha: $('#logar-senha').val()	//	Método, é o valor que eu vou filtrar
		}),
		statusCode: {
			200: function(){
			}	
		}
	}).done(function(data){

		console.log(data);
		window.sessionStorage.setItem("id", data.usuario.idUsuario);
		window.sessionStorage.setItem("token", data.token);
		window.sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
		window.sessionStorage.setItem("email", $('#logar-email').val().toString());
		window.sessionStorage.setItem("senha", $('#logar-senha').val().toString());
		window.location.assign("menu.html");

	});

	$('#bt_logar').val("Entrar"); //	Definindo o valor para "Enviando..."
	return false;

});