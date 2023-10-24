import * as Yup from 'yup'
import Category from '../models/Category'
import Product from '../models/Product'
import User from '../models/User'

class ProductsController {
  async store(request, response) {
    try {
    const screma = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.number().required(),
        category_id: Yup.number().required(),
    })

    try {
        await screma.validateSync(request.body, { abortEarly: false })
    } catch (err) {
        return response.status(400).json({ error: err.errors })
    }
    
    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response.status(401).json()
    }

    const { filename: path } = request.file
    const { name, price, category_id } = request.body

    const product = await Product.create({
        name,
        price: price,
        category_id,
        path,
    })

    return response.json(product)
   } catch (err) {
     console.log(err)
   }
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: [
      {
        model: Category.default,
        as: 'category',
        attributes: ['id', 'name'],
      },
    ],
  })
    return response.json(products)
  }
}

export default new ProductsController()