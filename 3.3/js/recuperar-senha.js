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
		contentType:'application/json',
		data: JSON.stringify({
			email: $('#recuperar-senha').val() //	Método, é o valor que eu vou filtrar
		})
	}).done(function(data){
		window.alert("OI");
	});

	$('#bt_recuperar').val("Redefinir minha senha...");
	
	return false;
	
	

});