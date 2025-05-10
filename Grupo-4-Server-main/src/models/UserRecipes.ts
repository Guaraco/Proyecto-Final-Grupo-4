import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './User'
import { Producto } from './Producto'

@Table({
    tableName: 'UserCompras'
})

export class UserRecipes extends Model<UserRecipes> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare userId: number

    @ForeignKey(() => Producto)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare productoId: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 1
    })
    declare cantidad: number

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    declare precioUnitario: number

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    declare total: number

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    declare fechaCompra: Date

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'pendiente'
    })
    declare estado: string

    @BelongsTo(() => User)
    user?: User;

    @BelongsTo(() => Producto)
    producto?: Producto;
}
