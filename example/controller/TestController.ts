import { BaseController, Controller, RequestMapping, CORS, Logger, getRoutes } from '../../core'

@Controller("/test")
class TestController extends BaseController {
    constructor(props: any) {
        super(props)
    }

    @RequestMapping({
        url: '/v2',
        method: "get"
    })
    @Logger()
    @CORS()
    async test2(ctx: any, next: any) {
        ctx.success("success")
    }

    @RequestMapping({
        url: "/dataOutput",
        method: "get"
    })
    @Logger()
    async dataOutput(ctx: any, next: any) {
        const { id } = ctx.query
        ctx.success({
            data: id
        })
    }
}

export default TestController