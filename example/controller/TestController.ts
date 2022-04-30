import { BaseController, Controller, RequestMapping } from '../../core'

@Controller("/test")
class TestController extends BaseController {
    constructor(props: any) {
        super(props)
    }

    @RequestMapping({
        url: '/v2',
        method: "get"
    })
    async test2(ctx: any, next: any) {
        ctx.body = {
            code: 0,
            message: "success"
        }
    }
}

export default TestController