import Fastify from "fastify"
import { getUsersHandler } from './handlers/getUsersHandler';

const app = Fastify({ logger: true })

app.get('/users', getUsersHandler)

app.listen({ port: 4444 })