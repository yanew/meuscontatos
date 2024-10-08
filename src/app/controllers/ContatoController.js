const ContatoRepository = require('../repositories/ContatoRepository');

class ContatoController{
    async index(request, response){
        const { orderBy } = request.query;
        const contatos = await ContatoRepository.findAll(orderBy);
        response.json(contatos);
    }

    async show(request, response){
        const { id } = request.params;

        const contato = await ContatoRepository.findById(id);

        if(!contato){
            return response.status(404).json({error: 'Usuário não encontrado!'});
        }

       return response.json(contato);
    }

    async store(request, response){
        const { nome, email, fone, id_categoria } = request.body;

        const existe = await ContatoRepository.findByEmail(email);

        if(!nome){
            return response.status(400).json({error: 'Nome é obrigatório!'});
        }

        if(existe){
            return response.status(400).json({error: 'Já existe usuário com esse email!'});
        }

        const contato = await ContatoRepository.create({nome, email, fone, id_categoria});

        response.json(contato);
    }

    async update(request, response){
        const { id } = request.params;
        const { nome, email, fone, id_categoria } = request.body;

        const contato = await ContatoRepository.findById(id);

        if(!contato){
            return response.status(404).json({error: 'Usuário não encontrado!'});
        }

        if(!nome){
            return response.status(400).json({error: 'Nome é obrigatório!'});
        }

        const contatoExiste = await ContatoRepository.findByEmail(email);

        if(contatoExiste && contatoExiste.id !== id){
            return response.status(400).json({error: 'Já existe usuário com esse email!'});
        }

        const contatoAtualizado =
            await ContatoRepository.update(id, {nome, email, fone, id_categoria});

        response.json(contatoAtualizado);

    }

    async delete(request, response){
        const { id } = request.params;

        await ContatoRepository.delete(id);

        //204: no content
        response.sendStatus(204);
    }
}

//Singleton
module.exports = new ContatoController();
