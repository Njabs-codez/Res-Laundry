import { Hono } from "hono"

const app = new Hono()

app.get("/", (ctx) => {
    return ctx.json({
        hello: "world"
    })
})


export default app;