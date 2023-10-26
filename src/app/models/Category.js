import Sequelize, { Model } from 'sequelize'
import Product from './Product'

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3000/category-file/${this.path}`
                    },
                },
            },
            {
                sequelize,
            }
        )
        return this
    }

}

export default Category