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

  const compliancePercentage = 99.9;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - compliancePercentage / 100);

  const getComplianceColorScheme = () => {
    if (compliancePercentage > 98) {
      return { 
        textColor: 'text-green-500', 
        description: 'Excellent compliance rate across all shipments.' 
      };
    }
    if (compliancePercentage > 90) {
      return { 
        textColor: 'text-yellow-500', 
        description: 'Good compliance rate, with minor deviations.' 
      };
    }
    return { 
      textColor: 'text-red-500', 
      description: 'Compliance rate requires attention.' 
    };
  };

  const { textColor, description } = getComplianceColorScheme();

  return (
    <>
      <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background: #F7FAFC;
            color: #ffffff;
        }
        .card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            transition: all 0.3s ease;
            border-radius: 0.75rem;
        }
        .card:hover {
            border-color: #3B82F6;
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
        }
        .cta-gradient {
            background: linear-gradient(90deg, #3B82F6, #2563EB);
            color: white;
            transition: opacity 0.3s ease;
        }
        .cta-gradient:hover {
            opacity: 0.9;
        }
        ::selection {
            background-color: #3B82F6;
            color: white;
        }
        .table-row-hover:hover {
          background-color: #F7FAFC;
        }
      `}</style>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />

        <main className="container mx-auto max-w-7xl px-4 pt-28 pb-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex rounded-full bg-blue-100 p-4">
                <Activity className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 md:text-6xl">
              Analytics
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Real-time insights and metrics from the supply chain.
            </p>
          </div>

          {/* Overview Cards */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
                <Activity className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  <StatsCounter end={stats.totalProducts} />
                </div>
                <p className="flex items-center gap-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  +12.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Shipments</CardTitle>
                <Activity className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  <StatsCounter end={stats.activeShipments} />
                </div>
                <p className="flex items-center gap-1 text-xs text-gray-500">
                  Currently in transit
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Verifications</CardTitle>
                <Activity className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  <StatsCounter end={stats.totalVerifications} />
                </div>
                <p className="flex items-center gap-1 text-xs text-green-500">
                  <TrendingUp className="h-3 w-3" />
                  +8.2% this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Flagged Products</CardTitle>
                <AlertTriangle className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  <StatsCounter end={stats.flaggedProducts} />
                </div>
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <TrendingDown className="h-3 w-3" />
                  -2 from last week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row 1 */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            {/* Products by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Products by Category</CardTitle>
                <CardDescription className="text-gray-600">Distribution across pharmaceutical categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(categoryData).map(([category, count]) => {
                    const percentage = (count / products.length) * 100;
                    return (
                      <div key={category}>
                        <div className="mb-2 flex justify-between text-sm">
                          <span className="font-medium text-gray-800">{category}</span>
                          <span className="text-gray-600">{count} products</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
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
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Temperature Compliance</CardTitle>
                <CardDescription className="text-gray-600">Storage condition monitoring</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-8">
                <div className="relative h-48 w-48">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-gray-200 stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="transparent"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      className={`${textColor} stroke-current transition-all duration-1000 ease-out`}
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r={radius}
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900">
                      <StatsCounter end={compliancePercentage} suffix="%" decimals={1} />
                    </span>
                    <span className="text-sm text-gray-600">Compliance</span>
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-600">
                  {description}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <div className="mb-8 grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Avg. Transit Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600">
                  <StatsCounter end={2} suffix=" hrs" />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  25% faster than industry average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Counterfeit Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-500">
                  <StatsCounter end={98} suffix="%" />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Successfully identified counterfeits
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">User Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-blue-500">
                  <StatsCounter end={4.8} suffix="/5" />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Based on 2,500+ user reviews
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Recent Alerts</CardTitle>
              <CardDescription className="text-gray-600">Real-time system notifications and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-4 border-b border-gray-200 pb-4 last:border-0">
                    <div
                      className={`rounded-full p-2 ${
                        alert.type === 'warning'
                          ? 'bg-yellow-100 text-yellow-600'
                          : alert.type === 'success'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {alert.type === 'warning' ? (
                        <AlertTriangle className="h-4 w-4" />
                      ) : (
                        <Activity className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{alert.message}</p>
                      <p className="text-xs text-gray-600">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Analytics;
