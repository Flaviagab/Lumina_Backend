import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Autor from "./Autor";
import Categoria from "./Categoria";

class Livro extends Model {
    public id_livro!: number;
    public id_autor!: number;
    public titulo!: string;
    public descricao!: string;
    public preco!: number;
    public capa_imagem!: string;
    public arquivo_pdf!: string;
    public id_categoria!: number;
    public destaque!: boolean;
}

Livro.init({
    id_livro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_autor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "autor",
            key: "id_autor"
        }
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    capa_imagem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    arquivo_pdf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "categoria",
            key: "id_categoria"
        }
    },
    destaque: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: "livro"
});

Autor.hasMany(Livro, { foreignKey: 'id_autor', as: 'livros' });
Livro.belongsTo(Autor, { foreignKey: 'id_autor', as: 'autor' });

Categoria.hasMany(Livro, { foreignKey: 'id_categoria', as: 'livros' });
Livro.belongsTo(Categoria, { foreignKey: 'id_categoria', as: 'categoria' });

export default Livro;