import Sequelize, { Model } from 'sequelize'
import Product from './Product'

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                sequelize,
            }
        )
        return this
    }

}

export default Category