angular.module('contatooh').controller('ContatosController', function($scope, Contato) {
	$scope.mensagem = {texto: ''};

	function buscaContatos() {
		Contato.query(function(contatos) {
			$scope.contatos = contatos;
			$scope.mensagem = {};
		},function(erro) {
			console.log(erro);
			$scope.mensagem = {texto: 'Não foi possível obter a lista de contatos'};
		});
	}

	buscaContatos();

	$scope.filtro = "";

	$scope.remove = function(contato) {
		Contato.delete({id: contato._id}, buscaContatos, function(erro) {
			console.log("Não foi possível remover o contato");
			console.log(erro);
		});
	};
});