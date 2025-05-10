import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Producto } from './Producto'

@Table({
    tableName: 'Inventario'
})

export class Inventario extends Model<Inventario> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @ForeignKey(() => Producto)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare productoId: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare stockDisponible: number

    @BelongsTo(() => Producto)
    producto?: Producto;
}


    
    
    
    

   


