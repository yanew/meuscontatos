const CategoriaRepository = require('../repositories/CategoriaRepository');

class CategoriaController{
    async index(request, response){

        try{
            const { orderBy } = request.query;
            const contatos = await CategoriaRepository.findAll(orderBy);
            response.json(contatos);
        }catch(error){
            console.log(error);
            response.sendStatus(500);
        }

    }

    async show(request, response){

    }

    async store(request, response){
        const { nome } = request.body;

        const existeCategoria = await CategoriaRepository.findByNome(nome);

        if(!nome){
            return response.status(400).json({error: 'Nome é obrigatório!'});
        }

        if(existeCategoria){
            return response.status(400).json({error: 'Já existe essa categoria!'});
        }

        const contato = await CategoriaRepository.create({nome});

        response.json(contato);
    }

    async update(request, response){


    }

    async delete(request, response){

    }
}

//Singleton
module.exports = new CategoriaController();
