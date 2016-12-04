// SELECT
$(document).ready(function() {
   $("#search").click(function (){
        // desabilitando o campo 
	$('#combobox').attr("disabled", true);
	// mudando a cor do campo
        $('#combobox').css("background-color", "#F5F5F5");

        	
        });

        $('#combobox').click(function() {
        	$('#search').attr('disabled', false);

        	$('#search').css('background-color', '000000');
        }); 
   });

$(document).ready(function() {
	
	$("#combobox").click(function() {

   		$('#search').attr("disabled", true);
	// mudando a cor do campo
        $('#search').css("background-color", "#F5F5F5");

        }); 

	$("#search").click(function() {
		$('#combobox').attr('readonly', false);

		$('#search').css('background-color', '#ffffff');
	});


   });
/*
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "192.168.2.70/GaveteiroAPi/status",
            data: { empresa: $("#combobox").val() },
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (obj) {
                if (obj != null) {
                    var data = obj.data;
                    var selectbox = $('#combobox');
                    selectbox.find('option').remove();
                    $.each(data, function (i, d) {
                        $('<option>').val(d.idStatus).text(d.descricao).appendTo(selectbox);
                    });
                }
            }
        });
    })
*/

//Populando LISTA



$(document).ready(function(){

        var token="";
        var empresaSolicitante = "";
        var todosOsPedidos = [];

    function logar(){

    $.ajax({
            
        type:"post",
        url: 'http://192.168.2.70/GaveteiroApi/login',
        data: '{"email": "oliveira.dev1997@gmail.com", "senha" : "abc"}',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        success: function (retorno) {
            console.log(retorno);
            //return false;
                token=retorno.token;
                empresaSolicitante = retorno.usuario.empresa.razaoSocial;

            if(token.length > 0){

                getPedido();
            }
        },
        error : function(error){
            console.log(error);
            }
        });

    function getPedido(){
        
        $.ajax({

            url: 'http://192.168.2.70/GaveteiroApi/pedido',
            type:'get',
            headers:{ "Authorization": token},
            crossDomain: true,
            contentType: "application/json",
            success : function(jsonRetornado){
                todosOsPedidos = jsonRetornado;
                console.log(jsonRetornado);
                montaTemplateListagem();
            },
            error : function(error){
                console.log(error);
            }
        });
    }

    function montaTemplateListagem(){
        dados = todosOsPedidos;

        var template = "";

        for (var i = 0; i < dados.length; i++){

            var d = new Date(dados[i].dataPedido);
            var dataPedido = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();


            template += '<tr>';
            template +=     '<td>'+dados[i].idPedido+'</td>';
            template +=     '<td>'+empresaSolicitante+'</td>';
            template +=     '<td>'+dataPedido+'</td>';
            template +=     '<td>'+dados[i].total+'</td>';
            template +=     '<td>'+dados[i].status.descricao+'</td>';
            template +=     '<td>';
            template +=     '<td class="centralizar-linha">';
            template +=     '<input type="button"  class="btn btn-primary itemPedido" idDoPedido="'+dados[i].idPedido+'" data-toggle="modal" data-target="#myModal" value="Ver detalhes">';
            template +=     '</td>';
            template += '<tr>';
        }

        //document.getElementById('tbody_listagem').innerHTML = template;

        $('#tbody_listagem').html(template).delay(500);
      }
    }



$(document).delegate('.itemPedido', 'click',function(e){
    //e.preventDefault();
    //console.log($(this).attr('idDoPedido'));

    //return false;
});
    logar();
});//FIM DO READY