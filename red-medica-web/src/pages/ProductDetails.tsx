import { useParams, Link, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/StatusBadge';
import {
  Package,
  MapPin,
  Calendar,
  Thermometer,
  Download,
  Share2,
  ArrowRight,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useAppStore();
  const product = getProduct(id!);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (product && qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        `https://redmedica.app/verify?id=${product.productId}`,
        { width: 200, margin: 2 }
      );
    }
  }, [product]);

  if (!product) {
    return <Navigate to="/dashboard" replace />;
  }

  const daysUntilExpiry = Math.floor(
    (new Date(product.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">Batch {product.batchNumber}</p>
          </div>
          <div className="flex gap-2">
            <Link to={`/transfer/${product.productId}`}>
              <Button className="gradient-primary">
                <ArrowRight className="mr-2 h-4 w-4" />
                Transfer Custody
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Manufacturing Details */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Manufacturing Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Manufacturer</dt>
                    <dd className="flex items-center gap-2 font-medium">
                      <Building2 className="h-4 w-4 text-primary" />
                      {product.manufacturer.name}
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">License</dt>
                    <dd className="font-medium">{product.manufacturer.license}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Manufacturing Date</dt>
                    <dd className="font-medium">{new Date(product.mfgDate).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Expiry Date</dt>
                    <dd className="font-medium">
                      {new Date(product.expiryDate).toLocaleDateString()}
                      <span className={`ml-2 text-xs ${daysUntilExpiry < 30 ? 'text-destructive' : 'text-success'}`}>
                        ({daysUntilExpiry} days)
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Batch Quantity</dt>
                    <dd className="font-medium">{product.quantity.toLocaleString()} units</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Category</dt>
                    <dd className="font-medium">{product.category}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Current Status */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <StatusBadge status={product.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Current Holder</span>
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      {product.currentHolder.slice(0, 10)}...{product.currentHolder.slice(-8)}
                    </code>
                  </div>
                  {product.transfers.length > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Last Location</span>
                        <span className="flex items-center gap-1 font-medium">
                          <MapPin className="h-4 w-4 text-primary" />
                          {product.transfers[product.transfers.length - 1].location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Temperature</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Thermometer className="h-4 w-4 text-primary" />
                          {product.transfers[product.transfers.length - 1].temperature}°C
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Composition */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Composition & Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4">
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Active Ingredients</dt>
                    <dd className="font-medium">{product.ingredients.join(', ')}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Dosage</dt>
                    <dd className="font-medium">{product.dosage}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Form</dt>
                    <dd className="font-medium">{product.form}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Packaging</dt>
                    <dd className="font-medium">{product.packaging}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-sm text-muted-foreground">Storage Requirements</dt>
                    <dd className="font-medium">{product.storageRequirements}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Supply Chain History */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Supply Chain History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-6">
                  {/* Manufacturing Event */}
                  <div className="relative flex gap-4 pb-6">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-primary p-2 text-white">
                        <Package className="h-4 w-4" />
                      </div>
                      {product.transfers.length > 0 && (
                        <div className="h-full w-0.5 bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 font-semibold">Product Manufactured</div>
                      <div className="mb-2 text-sm text-muted-foreground">
                        {product.manufacturer.name}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(product.mfgDate).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Transfer Events */}
                  {product.transfers.map((transfer, index) => (
                    <div key={index} className="relative flex gap-4 pb-6">
                      <div className="flex flex-col items-center">
                        <div className={`rounded-full p-2 ${transfer.verified ? 'bg-success text-white' : 'bg-warning text-white'}`}>
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        {index < product.transfers.length - 1 && (
                          <div className="h-full w-0.5 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 font-semibold">
                          Transfer: {transfer.fromRole} → {transfer.toRole}
                        </div>
                        <div className="mb-2 text-sm text-muted-foreground">
                          {transfer.fromName} → {transfer.toName}
                        </div>
                        <div className="mb-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {transfer.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(transfer.timestamp).toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3" />
                            {transfer.temperature}°C, {transfer.humidity}% humidity
                          </span>
                        </div>
                        {transfer.notes && (
                          <div className="text-sm italic text-muted-foreground">{transfer.notes}</div>
                        )}
                        <code className="mt-2 block text-xs text-muted-foreground">
                          Tx: {transfer.txHash.slice(0, 20)}...
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Details */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Blockchain Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Transaction Hash</dt>
                    <dd className="font-mono">{product.blockchain.txHash.slice(0, 20)}...</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Block Number</dt>
                    <dd className="font-mono">{product.blockchain.blockNumber}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Token ID</dt>
                    <dd className="font-mono">#{product.blockchain.tokenId}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* QR Code */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>QR Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <canvas ref={qrCanvasRef} className="mb-4 rounded-lg border" />
                  <p className="mb-4 text-center text-sm text-muted-foreground">
                    Scan to verify product authenticity
                  </p>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product ID */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Product Identification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-sm text-muted-foreground">Product ID</div>
                <div className="rounded-lg bg-muted p-3 font-mono text-sm font-semibold">
                  {product.productId}
                </div>
              </CardContent>
            </Card>

            {/* Safety Indicators */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Safety Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm">Not recalled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm">
                      {daysUntilExpiry > 30 ? 'Not expired' : 'Expiring soon'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm">All transfers verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm">No tampering detected</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetails;
