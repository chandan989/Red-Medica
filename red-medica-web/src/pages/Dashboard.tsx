import { Link, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import {
  Package,
  TrendingUp,
  CheckCircle2,
  Clock,
  Plus,
  Eye,
  QrCode,
  ArrowRight,
  LayoutDashboard,
} from 'lucide-react';
import { StatusBadge } from '@/components/StatusBadge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Dashboard = () => {
  const { user, isWalletConnected, products } = useAppStore();

  if (!isWalletConnected) {
    return <Navigate to="/connect" replace />;
  }

  const userProducts = user?.role === 'Manufacturer' 
    ? products.filter(p => p.manufacturer.address === user?.address)
    : products;

  const stats = {
    totalProducts: userProducts.length,
    activeShipments: userProducts.filter((p) => p.status === 'In Transit').length,
    delivered: userProducts.filter((p) => p.status === 'Delivered').length,
    pending: userProducts.filter((p) => p.status === 'Manufactured').length,
  };

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
                <LayoutDashboard className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 md:text-6xl">
              Dashboard
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
             Welcome back, {user?.name}. You are logged in as a {user?.role}.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Products</CardTitle>
                <Package className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stats.totalProducts}</div>
                <p className="text-xs text-gray-500">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Shipments</CardTitle>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stats.activeShipments}</div>
                <p className="text-xs text-gray-500">In transit now</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Delivered</CardTitle>
                <CheckCircle2 className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stats.delivered}</div>
                <p className="text-xs text-gray-500">Successfully delivered</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
                <Clock className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stats.pending}</div>
                <p className="text-xs text-gray-500">Awaiting transfer</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          {user?.role === 'Manufacturer' && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
                <CardDescription className="text-gray-600">Common tasks for manufacturers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Link to="/register">
                    <Button className="w-full cta-gradient font-semibold" size="lg">
                      <Plus className="mr-2 h-5 w-5" />
                      Register New Product
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 hover:border-blue-500">
                    <QrCode className="mr-2 h-5 w-5" />
                    Generate QR Codes
                  </Button>
                  <Button variant="outline" size="lg" className="w-full font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 hover:border-blue-500">
                    <Eye className="mr-2 h-5 w-5" />
                    View All Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Products Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Recent Products</CardTitle>
              <CardDescription className="text-gray-600">
                Your latest registered pharmaceutical products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-gray-200">
                      <TableHead className="font-semibold text-gray-600">Product ID</TableHead>
                      <TableHead className="font-semibold text-gray-600">Name</TableHead>
                      <TableHead className="font-semibold text-gray-600">Batch</TableHead>
                      <TableHead className="font-semibold text-gray-600">Status</TableHead>
                      <TableHead className="font-semibold text-gray-600">Date</TableHead>
                      <TableHead className="font-semibold text-gray-600">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userProducts.slice(0, 5).map((product) => (
                      <TableRow key={product.productId} className="border-b-gray-200 table-row-hover">
                        <TableCell className="font-mono text-sm text-gray-800">
                          {product.productId}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                        <TableCell className="text-gray-700">{product.batchNumber}</TableCell>
                        <TableCell>
                          <StatusBadge status={product.status} />
                        </TableCell>
                        <TableCell className="text-gray-700">
                          {new Date(product.mfgDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Link to={`/products/${product.productId}`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                            >
                              <Eye className="mr-1 h-4 w-4" />
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {userProducts.length > 5 && (
                <div className="mt-6 border-t border-gray-200 pt-4 text-center">
                  <Button variant="outline" className="font-medium text-gray-700 hover:bg-gray-100 hover:border-blue-500">
                    View All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
