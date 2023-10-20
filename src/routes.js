import { Router } from 'express'
import UserContrller from './app/controllers/UserContrller'

const routes = new Router()

routes.get('/users', UserContrller.store)

export default routes
