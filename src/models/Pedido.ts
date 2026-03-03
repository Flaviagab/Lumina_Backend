import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Pedido extends Model {
    public id_pedido!: number;
    public id_usuario!: number;
    public data_pedido!: Date;
    public valor_total!: number;
    public status!: string;
}

Pedido.init({
    id_pedido: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_pedido: {
        type: DataTypes.DATE,
        allowNull: false
    },
    valor_total: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "pedido"
})

export default Pedido;