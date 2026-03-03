import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Autor extends Model {
    public id_autor!: number;
    public nome!: string;
    public biografia!: string;
    public foto!: string;
}

Autor.init({
    id_autor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biografia: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "autor"
})