export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

// interface UserInterface {
//   id: number;
//   email?: string;
//   password: string
//   name: string
//   role: Role;
//   claimReward: boolean;
//   coins: number;
//   createdAt: Date;
//   orderDetails: OrderDetails[]
// }

// interface ProductInterface {
//   id: number;
//   productName: string;
//   amount: number;
//   price: number;
//   image?: string;
//   description?: string;
//   orderDetails: OrderDetails[];
// }

// interface OrderDetailsInterface {
//   id          Int @default(autoincrement()) @id  @unique
//   createdAt   DateTime   @default(now())
//   user        User       @relation(fields: [userId], references: [id])
//   userId      Int
//   products     Products[]
//   description     String?
// }

// async function main() {
//   // creates categories
//   await Promise.all(
//     categories.map(({ name, id, image }) =>
//       prisma.category.upsert({
//         where: { id: id },
//         update: {},
//         create: { name, id, image },
//       })
//     )
//   );
//   await Promise.all(
//     products.map(
//       ({
//         categories,
//         id,
//         name,
//         price,
//         image,
//         description,
//         brand,
//         currentInventory,
//       }) =>
//         prisma.product.upsert({
//           where: { id },
//           update: {},
//           create: {
//             id,
//             name,
//             price,
//             image,
//             description,
//             brand,
//             currentInventory,
//             categories: {
//               connect: categories.map((id) => ({ id })),
//             },
//           },
//         })
//     )
//   );
// }

// main()
//   .then(() => console.log(`Seeded data successfully`))
//   .catch((e) => console.error(`Failed to seed data, ${e}`))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// export default main;
