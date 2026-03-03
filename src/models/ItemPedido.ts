import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class ItemPedido extends Model {
    public id_item!: number;
    public id_pedido!: number;
    public id_livro!: number;
    public preco_unitario!: number;
}

ItemPedido.init({
    id_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_livro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "item_pedido"
})

export default ItemPedido;