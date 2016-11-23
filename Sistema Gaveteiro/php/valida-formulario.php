<?php
		

	if(strcasecmp('formulario-ajax', $_POST['metodo']) == 0){
	
		$html .= 'Email: '.$_POST['logar-email'];
		$html .= "\n";
		$html = 'Senha: '.$_POST['logar-senha'];
		$html .= "\n\n Obrigado pelo cadastro.";
		
		echo $html;
	}



?>