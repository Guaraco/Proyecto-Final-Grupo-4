import { Table, Column, Model, DataType, HasOne, HasMany } from 'sequelize-typescript'
import { UserDetails } from './UserDetails'
import { UserRecipes } from './UserRecipes'

@Table({
    tableName: 'Users'
})

export class User extends Model<User> {

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
    declare name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare lastName: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare email: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare password: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue: 'user'
    })
    declare role: string

    @HasOne(() => UserDetails)
    userDetails?: UserDetails;

    @HasMany(() => UserRecipes)
    userRecipes?: UserRecipes[];
}

