import Router from "koa-router";
import { PrismaClient } from "@prisma/client";
import { CORS, Logger } from "../middleware/index"

const router = new Router();
const prisma = new PrismaClient();

router.get("/", async (ctx) => {
  ctx.response.body = `<h1>Hello World</h1>`;
});

router.post("/user", async (ctx, next) => {
  const allOperator = await prisma.user.findMany();
  console.log(allOperator);

  // await prisma.user.create({
  //     data: {
  //         name: "Tom",
  //         department: "frontend engineer"
  //     }
  // })

  prisma.$disconnect();

  ctx.body = "Ok";
  ctx.status = 200;
});


class RouterHandler {
  @Logger
  @CORS()
  static async testFunc(ctx: any){
    ctx.status = 200;
    ctx.body = {
      ops: 1
    }
  }
}

router.get("/test", RouterHandler.testFunc);

export default router;
