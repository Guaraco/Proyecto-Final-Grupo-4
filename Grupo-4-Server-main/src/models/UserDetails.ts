import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { User } from './User'
import { Producto } from './Producto'

@Table({
    tableName: 'UserDetails'
})

export class UserDetails extends Model<UserDetails> {

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
        type: DataType.STRING,
        allowNull: false
    })
    declare telefono: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare direccion: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare pais: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare ciudad: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare codigoPostal: string

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare cantidad: number

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    declare total: number
    
    @BelongsTo(() => User)
    user?: User;

    @BelongsTo(() => Producto)
    producto?: Producto;
    
    
    
    

 
}

