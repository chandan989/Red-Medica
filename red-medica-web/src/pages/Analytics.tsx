import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react';
import { StatsCounter } from '@/components/StatsCounter';

const Analytics = () => {
  const { products } = useAppStore();

  const stats = {
    totalProducts: products.length,
    activeShipments: products.filter((p) => p.status === 'In Transit').length,
    totalVerifications: Math.floor(Math.random() * 50000) + 10000,
    flaggedProducts: Math.floor(Math.random() * 10),
  };

  const categoryData = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Temperature deviation detected in shipment BATCH-045',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'info',
      message: '5 new products registered by PharmaCorp Ltd',
      time: '4 hours ago',
    },
    {
      id: 3,
      type: 'success',
      message: 'Batch BATCH-038 successfully delivered',
      time: '6 hours ago',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights and metrics from the supply chain
          </p>
        </div>

        {/* Overview Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <StatsCounter end={stats.totalProducts} />
              </div>
              <p className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <StatsCounter end={stats.activeShipments} />
              </div>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                Currently in transit
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <StatsCounter end={stats.totalVerifications} />
              </div>
              <p className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                +8.2% this week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Flagged Products</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <StatsCounter end={stats.flaggedProducts} />
              </div>
              <p className="flex items-center gap-1 text-xs text-destructive">
                <TrendingDown className="h-3 w-3" />
                -2 from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {/* Products by Category */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Products by Category</CardTitle>
              <CardDescription>Distribution across pharmaceutical categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryData).map(([category, count]) => {
                  const percentage = (count / products.length) * 100;
                  return (
                    <div key={category}>
                      <div className="mb-2 flex justify-between text-sm">
                        <span className="font-medium">{category}</span>
                        <span className="text-muted-foreground">{count} products</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Temperature Compliance */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Temperature Compliance</CardTitle>
              <CardDescription>Storage condition monitoring</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="relative h-48 w-48">
                <svg className="h-full w-full" viewBox="0 0 100 100">
                  <circle
                    className="text-muted stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                  />
                  <circle
                    className="text-success stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset="25.12"
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="50"
                    className="fill-current text-2xl font-bold"
                    textAnchor="middle"
                    dy="7"
                  >
                    99.9%
                  </text>
                </svg>
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Excellent compliance rate across all shipments
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8 grid gap-6 lg:grid-cols-3">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Avg. Transit Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                <StatsCounter end={2} suffix=" hrs" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                25% faster than industry average
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Counterfeit Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-success">
                <StatsCounter end={98} suffix="%" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Successfully identified counterfeits
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>User Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-secondary">
                <StatsCounter end={4.8} suffix="/5" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Based on 2,500+ user reviews
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Real-time system notifications and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div
                    className={`rounded-full p-2 ${
                      alert.type === 'warning'
                        ? 'bg-warning/10 text-warning'
                        : alert.type === 'success'
                        ? 'bg-success/10 text-success'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {alert.type === 'warning' ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <Activity className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Analytics;
