import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Pagamento extends Model {
    public id_pagamento!: number;
    public id_pedido!: number;
    public id_usuario!: number;
    public id_forma_pagamento!: number;
    public status_pagamento!: string;
    public data_pagamento!: Date;
}

Pagamento.init({
    id_pagamento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_forma_pagamento: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status_pagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_pagamento: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "pagamento"
})

export default Pagamento;