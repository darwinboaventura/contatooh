module.exports = function(app) {
	var Contato = app.models.contato;
	var controller = {};

	controller.listaContatos = function(req, res) {
		Contato.find().exec()
		.then(function(contatos) {
			res.json(contatos);
		}, function(erro) {
			console.error(erro);
			res.status(500).json(erro);
		});
	};

	controller.obtemContato = function(req, res) {
		var _id = req.params.id;

		Contato.findById(_id).exec()
		.then(function(contato) {
			if (!contato) throw new Error("Contato não encontrado");
			res.json(contato);
		}, function(erro) {
			console.log(erro);
			res.status(404).json(erro);
		});
	};

	controller.removeContato = function(req, res) {
		var idContato = req.params.id;

		contatos = contatos.filter(function(contato) {
			return contato._id != idContato;
		});

		res.status(204).end();
	};

	controller.salvaContato = function(req, res) {
		var contato = req.body;

		contato = contato._id ? atualiza(contato) : adiciona(contato);

		res.json(contato);
	};

	return controller;
};