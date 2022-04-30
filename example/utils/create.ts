import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  await create();
  await createSku();
  await search();
}

function search() {
  return client.user.findMany().then((data) => {
    console.log(data);
  });
}

async function create() {
  return client.goodSpus
    .create({
      data: {
        name: "商品1",
        description: "一个普通商品",
        status: false,
        operator: {
          create: {
            name: "Jerry",
            department: "backend engineer",
            age: 19,
          },
        },
      },
    })
    .then((data) => {
      console.log("create success -> ", data);
    })
    .catch((err) => {
      console.log("create error -> ", err);
    });
}

async function createSku() {
  return client.goodSkus.create({
    data: {
      name: "商品1的sku",
      description: "简单的一个商品",
      status: false,
      operator: {
        create: {
          name: "user",
          department: "cc",
          age: 10,
        },
      },
      spus: {
        connect: {
          id: 1,
        },
      },
    },
  });
}

main();
