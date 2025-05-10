import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Inventario } from './Inventario'
import { UserDetails } from './UserDetails'

@Table({
    tableName: 'Productos'
})

export class Producto extends Model<Producto> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare idProducto: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare nombre: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare descripcion?: string
    

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
      })
      declare precio: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare categoria: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare urlImagen: string
    
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare stock: number

    @HasMany(() => Inventario)
    inventarios?: Inventario[];

    @HasMany(() => UserDetails)
    userDetails?: UserDetails[];
}
    

