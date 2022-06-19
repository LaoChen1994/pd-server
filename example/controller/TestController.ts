import { BaseController, Controller, RequestMapping, CORS } from '../../core'

@Controller("/test")
class TestController extends BaseController {
    constructor(props: any) {
        super(props)
    }

    @RequestMapping({
        url: '/v2',
        method: "get"
    })
    @CORS()
    async test2(ctx: any, next: any) {
        ctx.success("success")
    }
}

export default TestController