// SELECT
var token   = sessionStorage.getItem('token');
var uri     = 'http://192.168.1.50:8081/GaveteiroApi';
var idPedido = "";
var statusAtual = "";
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

        var token              = "";
        var empresaSolicitante = "";
        var todosOsPedidos     = [];
        var todosOsStatus      = [];

    function logar(){

    $.ajax({
            
        type:"post",
        url: 'http://192.168.1.50:8081/GaveteiroApi/login',
        data: '{"email": "oliveira.dev1997@gmail.com", "senha" : "abc"}',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        success: function (retorno) {
            console.log(retorno);
            //return false;
                token=retorno.token;
                empresaSolicitante = retorno.usuario.empresa.razaoSocial;
                var nomeUsuario = retorno.usuario.nome;
                $('#empresa-solicitante').text(empresaSolicitante);
                $('#nome-usuario').text(nomeUsuario);
            if(token.length > 0){

                getPedido();
                getStatus();
            }
        },
        error : function(error){
            console.log(error);
            }
        });

    function getPedido(){
        
        $.ajax({

            url: 'http://192.168.1.50:8081/GaveteiroApi/pedido',
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
            if(i % 10 == 0)
                template += '<div id="page-item-'+ i +'"><tr>';
            else
            template += '<tr>';
            template +=     '<td>'+dados[i].idPedido+'</td>';
            template +=     '<td>'+dados[i].empresa.razaoSocial+'</td>';
            template +=     '<td>'+dataPedido+'</td>';
            template +=     '<td>R$ '+dados[i].total+'</td>';
            template +=     '<td>'+dados[i].status.descricao+'</td>';
            //template +=     '<td>';
            template +=     '<td class="centralizar-linha">';
            template +=     '<input type="button"  class="btn btn-primary itemPedido" idDoPedido="'+dados[i].idPedido+'" data-toggle="modal" data-target="#myModal" value="Ver detalhes">';
            template +=     '</td>';
            if(i % 10 == 9)
                template += '<tr></div>';
            else
                template += '<tr>';
        }

        //document.getElementById('tbody_listagem').innerHTML = template;

        $('#tbody_listagem').html(template).delay(500);
      }

      function getStatus(){

        $.ajax({
            url: 'http://192.168.1.50:8081/GaveteiroApi/status',
            type:'get',
            headers:{ "Authorization": token},
            crossDomain: true,
            contentType: "application/json",
            success : function(jsonRetornado){
                todosOsStatus = jsonRetornado;
                console.log("Status: " + jsonRetornado);
                montaTemplateCombobox();
            },
            error : function(error){
                console.log(error);
            }
        });
    }
    
    function montaTemplateCombobox()
    {   
        var dados = todosOsStatus;
        var template = "";
        template = '<option selected value="status" disabled="disabled"> Selecione um status </option>';
        for (var i = 0; i < dados.length; i++)
            template += '<option value="'+ dados[i].idStatus + '">'+ dados[i].descricao +'</option>';
        
        $('#combobox').html(template).delay(500);
        $('#status-alterar').html(template).delay(500);
    }

    $('#pesquisar').click(function(event) {
        event.preventDefault();

        var status  = $('#combobox').val();
        var empresa = $('#search').val();
        //var token   = sessionStorage.getItem('token');
        var url     = "";
        if(status)
            url = 'http://192.168.1.50:8081/GaveteiroApi/pedido?status='+ status;
        if(empresa)
            url = 'http://192.168.1.50:8081/GaveteiroApi/pedido?empresa='+ empresa;
        
        if(!empresa && !status)
            return false;

        $.ajax({
            url: url,
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
        return false;
    });

 }

$(document).delegate('.itemPedido', 'click',function(e){
    //e.preventDefault();
    //console.log($(this).attr('idDoPedido'));
       idPedido = $(this).attr('iddoPedido');
       //alert(idPedido);
       var todosOsItens = [];
       $('.titulo-pedido span').text("N° do pedido: "+idPedido);
       $.ajax({
           url: uri+'/pedido/'+idPedido,
           type: 'get',
           headers:{ "Authorization": token},
           crossDomain: true,
           contentType: 'application/json',
           success: function(jsonRetornado)
           {
                todosOsItens = jsonRetornado;
                console.log(jsonRetornado);
                 montaTemplateModal();
           }
       });

       function montaTemplateModal(){
         var dados    = todosOsItens.itens;
         var template = "";
         for (var i = 0; i < dados.length; i++){
            template += '<tr>';
            template +=     '<td>'+dados[i].produto.descricao+'</td>';
            template +=     '<td class="centralizar-linha">R$ '+dados[i].produto.precoUnitario+'</td>';
            template +=     '<td class="centralizar-linha">'+dados[i].quantidade+'</td>';
            template += '<tr>';
        }
        statusAtual = todosOsItens.status.idStatus;
        $('.modal-content tbody').html(template).delay(500);
        $('#status-alterar').val(todosOsItens.status.idStatus);
        $('.pedido-total p').text("R$ "+todosOsItens.total);
       }

    $('#alterar').click(function(event) {
    if(statusAtual != $('#status-alterar').val()){
        $.ajax({
        url: uri+'/pedido/'+idPedido+'/status/'+$('#status-alterar').val(),
        method: 'PUT',
        headers:{ "Authorization": token},
        dataType: 'json', 
        contentType:'application/json',
        data: JSON.stringify({
            idUsuario: sessionStorage.getItem("id"),  //  Método, é o valor que eu vou filtrar
        }),
        statusCode: {
            200: function(){
                location.reload();
            }
        }
        });
        statusAtual = $('#status-alterar').val();
        
      }
    });
});
    logar();
});//FIM DO READY