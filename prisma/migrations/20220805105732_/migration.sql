-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_orderDetailId_fkey";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_orderDetailId_fkey" FOREIGN KEY ("orderDetailId") REFERENCES "OrderDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
