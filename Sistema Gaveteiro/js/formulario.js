//formulario.js

$('#formulario-login-ajax').submit(function (e) { //

	e.preventDefault(); //Anula o submit
	
	if ($('#btn_logar').val() == 'Enviando...') {
		return(false);
	}

	$('#btn_logar').val ("Enviando..."); //Definindo o valor para "Enviando..."

	$.ajax({
		url: 'http://192.168.2.72:80/GaveteiroApi/login',
		type: 'POST', //Melhor usar post pois não tem limite de dados
		dataType: 'json', 
		crossDomain: true,
		data: {
			'email': $('#logar-email').val(),
			'senha': $('#logar-senha').val()
		},
		
		contentType: 'application/json;charset=utf8'


	}).done(function(data){

		alert(data);
		data = JSON.parse(data);
		console.log(data);
		$('#btn_logar').val('Entrar');
		$('#logar-email').val('');


	});

	return false;

});

