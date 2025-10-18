import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockSales, mockProducts } from "@/shared/lib/mock-data";
import { TrendingUp, DollarSign, Package, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaySales = mockSales.filter((sale) => {
    const saleDate = new Date(sale.createdAt);
    saleDate.setHours(0, 0, 0, 0);
    return saleDate.getTime() === today.getTime();
  });

  const totalSalesToday = todaySales.reduce(
    (sum, sale) => sum + sale.price * sale.quantity,
    0
  );

  const thisMonth = new Date().getMonth();
  const thisYear = new Date().getFullYear();
  const monthlySales = mockSales.filter((sale) => {
    const saleDate = new Date(sale.createdAt);
    return saleDate.getMonth() === thisMonth && saleDate.getFullYear() === thisYear;
  });

  const totalSalesThisMonth = monthlySales.reduce(
    (sum, sale) => sum + sale.price * sale.quantity,
    0
  );

  const avgPriceThisMonth =
    monthlySales.length > 0
      ? monthlySales.reduce((sum, sale) => sum + sale.price, 0) / monthlySales.length
      : 0;

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date;
  });

  const chartData = last30Days.map((date) => {
    const dayStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const daySales = mockSales.filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate.toDateString() === date.toDateString();
    });
    const total = daySales.reduce((sum, sale) => sum + sale.price * sale.quantity, 0);
    return { date: dayStr, sales: total };
  });

  const productSales = mockSales.reduce((acc, sale) => {
    if (!acc[sale.productId]) {
      acc[sale.productId] = { quantity: 0, revenue: 0 };
    }
    acc[sale.productId].quantity += sale.quantity;
    acc[sale.productId].revenue += sale.price * sale.quantity;
    return acc;
  }, {} as Record<string, { quantity: number; revenue: number }>);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track your sales performance and insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sales Today
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSalesToday.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {todaySales.length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Sales
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalSalesThisMonth.toFixed(2)}
            </div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Price
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgPriceThisMonth.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProducts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">In inventory</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Trend (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                className="text-xs"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(productSales)
              .sort((a, b) => b[1].revenue - a[1].revenue)
              .slice(0, 5)
              .map(([productId, data]) => {
                const product = mockProducts.find((p) => p.id === productId);
                return (
                  <div
                    key={productId}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{product?.photo}</div>
                      <div>
                        <p className="font-medium">{product?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {data.quantity} units sold
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        ${data.revenue.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
