const db = require('../../database/index');
//OU const db = require('../../database'); -- se fizer assim ele já chama automaticamente o arquivo de nome "index"
//OU const { query } = require('../../database/index'); -- se quiser desestruturar

class ContactRepository{

    async findAll(orderBy = 'ASC'){
        const dir = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

        const rows = await db.querysql(`
            SELECT co.id, co.nome, co.fone, co.email, ca.nome as categoria
            FROM contato co
            LEFT JOIN categoria ca ON ca.id = co.id_categoria
            ORDER BY co.nome ${dir}
            `);

        return rows;
    }

    async findById(id){
        const [row] = await db.querysql(`
            SELECT * FROM contato WHERE id = $1
            `, [id]);

        return row;
    }

    async findByEmail(email){
        const [row] = await db.querysql(`
            SELECT * FROM contato WHERE email like $1
            `, [email]);

        return row;
    }

    async create({ nome, email, fone, id_categoria  }){
        const [row] = await db.querysql(`
            INSERT INTO contato(nome, email, fone, id_categoria)
            VALUES($1, $2, $3, $4)
            RETURNING *`,
            [nome, email, fone, id_categoria]);

            return row;

    }

    async update(id, { nome, email, fone, id_categoria  }){
        const [row] = await db.querysql(`
            UPDATE contato
            SET nome = $1,
            email = $2,
            fone = $3,
            id_categoria = $4
            WHERE id = $5
            RETURNING *
            `, [nome, email, fone, id_categoria, id]);

        return row;
    }

    async delete(id){
        const deleteOp =  await db.querysql(`
            DELETE FROM contato
            WHERE id = $1
            `,[id]);

        return deleteOp;
    }



}

module.exports = new ContactRepository()
