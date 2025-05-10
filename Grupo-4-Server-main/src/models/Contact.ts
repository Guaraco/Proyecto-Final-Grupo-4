import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'Contacto'
})

export class Contact extends Model<Contact> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare tipoDeConsulta: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare nombreCompleto: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare telefono: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare mensaje: string
    
    
}
