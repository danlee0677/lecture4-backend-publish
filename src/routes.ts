import Router from '@koa/router'
import { Next, ParameterizedContext } from 'koa'
import { z } from 'zod'
import { RectangleModel } from './models'
import { User, userZodSchema, State } from './types'

const router = new Router()

router.get('/user/:username', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ username: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)

  const found = await RectangleModel.findOne({ username: paramparse.data.username }).lean().exec()
  ctx.assert(found, 404)

  ctx.status = 200
  ctx.body = found

  await next()
})

router.post('/user', async (ctx: ParameterizedContext<State>, next: Next) => {
  const bodyparse = userZodSchema.safeParse(ctx.request.body)
  ctx.assert(bodyparse.success, 400)

  const found = await RectangleModel.findOne({ name: bodyparse.data.username }).lean().exec()
  ctx.assert(found === null, 409)

  const model = new RectangleModel(bodyparse.data)
  await model.save()

  ctx.status = 201

  await next()
})

router.delete('/user/:username', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ username: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)
  const document = await RectangleModel.findOne({ name: paramparse.data.username }).exec()
  ctx.assert(document, 404)

  await document.deleteOne()

  ctx.status = 200 // maybe 204

  await next()
})

router.patch('/user/:username', async (ctx: ParameterizedContext<State>, next: Next) => {
  const paramparse = z.object({ username: z.string() }).safeParse(ctx.params)
  ctx.assert(paramparse.success, 400)
  const bodyparse = z.object({ asset: z.number(), password: z.string(), roles: z.array(z.string()) }).safeParse(ctx.request.body)
  ctx.assert(bodyparse.success, 400)

  const document = await RectangleModel.findOne({ name: paramparse.data.username }).exec()
  ctx.assert(document, 404)

  await document.updateOne({
    ...paramparse.data,
    ...bodyparse.data
  })

  ctx.status = 200 // maybe 204

  await next()
})

export default router
