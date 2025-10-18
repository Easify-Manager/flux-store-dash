import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSales, mockProducts } from "@/shared/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Sales = () => {
  const sortedSales = [...mockSales].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Sales History</h1>
        <p className="text-muted-foreground">View all sales transactions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedSales.map((sale) => {
                const product = mockProducts.find((p) => p.id === sale.productId);
                const total = sale.price * sale.quantity;
                return (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{product?.photo}</span>
                        <span className="font-medium">{product?.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>${sale.price.toFixed(2)}</TableCell>
                    <TableCell>{sale.quantity}</TableCell>
                    <TableCell className="font-bold text-primary">
                      ${total.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(sale.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sales;
