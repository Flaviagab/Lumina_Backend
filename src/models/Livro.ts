import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Livro extends Model {
    public id_livro!: number;
    public id_autor!: number;
    public titulo!: string;
    public descricao!: string;
    public preco!: number;
    public capa_imagem!: string;
    public arquivo_pdf!: string;
    public id_categoria!: number;
}

Livro.init({
    id_livro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_autor: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: false
    }
}, {
    sequelize,
    tableName: "livro"
})

export default Livro;