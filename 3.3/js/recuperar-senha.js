//Recuperar senha

$('#recuperar-senha-ajax').submit(function (e) { //

	e.preventDefault(); //	Anula o submit
	
	if ($('#bt_recuperar').val() == 'Enviando...') {
		return(false);
	}

	$('#bt_recuperar').val("Enviando..."); //	Definindo o valor para "Enviando..."

	$.ajax({
		url: 'http://192.168.1.50:8081/GaveteiroApi/senha/recuperar',
		method: 'POST',
		dataType: 'json',
		crossDomain: true, 
		contentType:'application/json',
		data: JSON.stringify({
			email: $('#recuperar-senha').val(), //	Método, é o valor que eu vou filtrar
		}),
		statusCode: {
			400: function(){
				$('#modalRecuperar .modal-body p').text("E-mail não encontrado!");
				$('#modalRecuperar').modal("show");	
			},

			500: function(){
				$('#modalRecuperar .modal-body p').text("Serviço indisponível, tente novamente mais tarde. ");
				$('#modalRecuperar').modal("show");
			}

		}
	}).done(function(data){
			
		$('#modalRecuperar .modal-body p').text("Sua senha foi redefinida com sucesso! Verifique o seu e-mail.");
		$('#modalRecuperar').modal("show");

	});

	$('#bt_recuperar').val("Redefinir minha senha...");
	
	return false;
	
	

});