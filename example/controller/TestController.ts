import { BaseController, Controller, RequestMapping } from '../../core'

@Controller("/test")
export default class TestController extends BaseController {
    constructor(props: any) {
        super(props)
    }

    @RequestMapping({
        url: '/v2/test',
        method: "GET"
    })
    async test2(ctx: any, next: any) {
        ctx.body = {
            code: 0,
            message: "success"
        }
    }
}