const { v4 } = require('uuid');

let contatos = [
    {
        id: v4(),
        nome: 'Yane',
        email: 'y@w.com',
        fone: '81999131456',
        id_categoria: v4()
    },
    {
        id: v4(),
        nome: 'Glynnis',
        email: 'g@b.com',
        fone: '31999131456',
        id_categoria: v4()
    },
    {
        id: v4(),
        nome: 'Mara',
        email: 'm@l.com',
        fone: '65999131456',
        id_categoria: v4()
    }
];

class ContactRepository{

    findAll(){
        return Promise.resolve(contatos);
    }

    findById(id){
        return Promise.resolve(contatos.find((contato)=>contato.id===id));
    }

    findByEmail(email){
        return Promise.resolve(contatos.find((contato)=>contato.email===email));
    }

    create({ nome, email, fone, id_categoria  }){

        return new Promise((resolve) => {
            const novoContato = {
                id: v4(),
                nome,
                email,
                fone,
                id_categoria
            };
            contatos.push(novoContato);
            resolve(novoContato);
        });
    }

    update(id, { nome, email, fone, id_categoria  }){

        return new Promise((resolve) => {
            const contatoAtualizado = {
                nome,
                email,
                fone,
                id_categoria
            };
            contatos = contatos.map((contato)=>(
                contato.id === id ? contatoAtualizado : contato
            ));
            resolve(contatoAtualizado);
        });
    }

    delete(id){
        contatos = contatos.filter((contato)=>contato.id!==id);
    }



}

module.exports = new ContactRepository()
