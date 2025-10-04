import { useState } from 'react';
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
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name} ({user?.role})
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Shipments</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeShipments}</div>
              <p className="text-xs text-muted-foreground">In transit now</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground">Successfully delivered</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <p className="text-xs text-muted-foreground">Awaiting transfer</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        {user?.role === 'Manufacturer' && (
          <Card className="mb-8 shadow-soft">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for manufacturers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                <Link to="/register">
                  <Button className="w-full gradient-primary" size="lg">
                    <Plus className="mr-2 h-5 w-5" />
                    Register New Product
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full">
                  <QrCode className="mr-2 h-5 w-5" />
                  Generate QR Codes
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <Eye className="mr-2 h-5 w-5" />
                  View All Products
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Products Table */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>Your latest registered pharmaceutical products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userProducts.slice(0, 5).map((product) => (
                    <TableRow key={product.productId}>
                      <TableCell className="font-mono text-sm">{product.productId}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.batchNumber}</TableCell>
                      <TableCell>
                        <StatusBadge status={product.status} />
                      </TableCell>
                      <TableCell>{new Date(product.mfgDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Link to={`/products/${product.productId}`}>
                          <Button variant="ghost" size="sm">
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
              <div className="mt-4 text-center">
                <Button variant="outline">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="mt-8 shadow-soft">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userProducts.slice(0, 3).map((product) => (
                <div key={product.productId} className="flex items-start gap-4 border-b pb-4 last:border-0">
                  <div className="rounded-full bg-success/10 p-2 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Product Registered</p>
                    <p className="text-sm text-muted-foreground">
                      {product.name} - Batch {product.batchNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(product.mfgDate).toLocaleString()}
                    </p>
                  </div>
                  <StatusBadge status={product.status} />
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

export default Dashboard;
