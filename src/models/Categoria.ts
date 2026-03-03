import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Categoria extends Model {
    public id_categoria!: number;
    public nome!: string;
    public descricao!: string;
}

Categoria.init({
    id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "categoria"
})

export default Categoria;