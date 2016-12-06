// SELECT
var token       = sessionStorage.getItem('token');
var uri         = 'http://192.168.1.50:8081/GaveteiroApi';
var idPedido    = "";
var statusAtual = "";
var idEmpresa   = 0; 
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

        var token              = $('#token').text();
        var empresaSolicitante = "";
        var todosOsPedidos     = [];
        var todosOsStatus      = [];
        var email              = $('#email-usuario').val();;
        var senha              = $('#senha-usuario').val();;
        var admin              = $('#admin').text();;
    function logar(){
        url = uri+'/login';
    $.ajax({
            
        type:"post",
        url: url,
        data: '{"email": "'+ email +'", "senha" : "'+ senha +'"}',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        success: function (retorno) {
            console.log(retorno);
            //return false;
                token=retorno.token;
                empresaSolicitante = retorno.usuario.empresa.razaoSocial;
                idEmpresa = retorno.usuario.empresa.idEmpresa;           
                var nomeUsuario = retorno.usuario.nome;
                $('#empresa-solicitante').text(empresaSolicitante);
                $('#nome-usuario').text(nomeUsuario);
            if(token.length > 0){

                getPedido();
                getStatus();
            }
            if(retorno.usuario.tipoUsuario.descricao.toString().localeCompare('Administrador') != 0 
                || retorno.usuario.empresa.cnpj.toString().localeCompare('16.631.233/0001-22') != 0)
            {
                $('#status-alterar').css('display', 'none'); 
                $('#alterar').css('display', 'none');
            }
        },
        error : function(error){
            console.log(error);
            }
        });

    function getPedido(){
        console.log(admin);
        var url = (admin == 'false') ? uri+'/empresa/'+idEmpresa : uri;

        $.ajax({

            url: url+'/pedido',
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
        var pagination = "";
        var page = 0;
        pagination += '<li class="page-item prev">';
        pagination +=   '<a class="page-link" href="#" aria-label="Previous">';
        pagination +=         '<span aria-hidden="true">&laquo;</span>';
        pagination +=         '<span class="sr-only">Previous</span>';
        pagination +=   '</a>';
        pagination += '</li>';

        for (var i = 0; i < dados.length; i++){

            var d = new Date(dados[i].dataPedido);
            var dataPedido = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
            if(i % 10 == 0){
                page++;
                pagination += '<li class="page-item '+page+'">';
                pagination +=      '<a class="page-link">'+page+'</a>';
                pagination +=  '</li>';
            }
            template += '<tr class="item-list-'+page+'">';
            template +=     '<td>'+dados[i].idPedido+'</td>';
            template +=     '<td>'+dados[i].empresa.razaoSocial+'</td>';
            template +=     '<td>'+dataPedido+'</td>';
            template +=     '<td>R$ '+dados[i].total+'</td>';
            template +=     '<td>'+dados[i].status.descricao+'</td>';
            template +=     '<td class="centralizar-linha">';
            template +=     '<input type="button"  class="btn btn-primary itemPedido" idDoPedido="'+dados[i].idPedido+'" data-toggle="modal" data-target="#myModal" value="Ver detalhes">';
            template +=     '</td>';
            template += '<tr>';
        }
        pagination += '<li class="page-item next">';
        pagination +=   '<a class="page-link" href="#" aria-label="Next">';
        pagination +=         '<span aria-hidden="true">&raquo;</span>';
        pagination +=         '<span class="sr-only">Next</span>';
        pagination +=   '</a>';
        pagination += '</li>';
        $('ul.pagination').html(pagination).delay(500);
        $('#tbody_listagem').html(template).delay(500);
        $('.page-item.1').click();
      }

      function getStatus(){

        $.ajax({
            url: uri+'/status',
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
            url = uri+'/pedido?status='+ status;
        if(empresa)
            url = uri+'/pedido?empresa='+ empresa;
        
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
    $('.page-item').click(function(event){
        var paginaAtual = $(this).text();
        $('.page-item').removeClass('active');
        $(this).addClass('active');
        $('#tbody_listagem tr').fadeOut();
        $('.item-list-'+paginaAtual).fadeIn();
    });

    $('#sair').click(function(event) {
        sessionStorage.clear();
        token = null;
        window.location.assign = "index.html";
    });
});//FIM DO READY