import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Usuario extends Model {
    public id_usuario!: number;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public cpf!: string;
    public tipo!: "usuario" | "admin";
}

Usuario.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_email'
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_cpf'
    },
    tipo: {
        type: DataTypes.ENUM("usuario", "admin"),
        allowNull: false,
        defaultValue: "usuario"
    }
}, {
    sequelize,
    tableName: "usuario"
})

export default Usuario;
