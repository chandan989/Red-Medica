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
    <>
      <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background: #F7FAFC;
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
      `}</style>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <Navbar />

        <main className="container mx-auto max-w-7xl px-4 pt-28 pb-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex rounded-full bg-blue-100 p-4">
              <Package className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 md:text-6xl">
              {product.name}
            </h1>
            <p className="mx-auto mt-2 max-w-2xl text-lg text-gray-600">
              Batch Number: {product.batchNumber}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="mb-8 flex justify-center gap-2">
            <Link to={`/transfer/${product.productId}`}>
              <Button className="cta-gradient font-semibold">
                <ArrowRight className="mr-2 h-4 w-4" />
                Transfer Custody
              </Button>
            </Link>
            <Button variant="outline" className="font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 hover:border-blue-500">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline" size="icon" className="font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 hover:border-blue-500">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-8 lg:col-span-2">
              {/* Manufacturing Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Manufacturing Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Manufacturer</dt>
                      <dd className="mt-1 flex items-center gap-2 font-semibold text-gray-900">
                        <Building2 className="h-5 w-5 text-blue-500" />
                        {product.manufacturer.name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">License</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{product.manufacturer.license}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Manufacturing Date</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{new Date(product.mfgDate).toLocaleDateString()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Expiry Date</dt>
                      <dd className="mt-1 font-semibold text-gray-900">
                        {new Date(product.expiryDate).toLocaleDateString()}
                        <span className={`ml-2 text-xs font-bold ${daysUntilExpiry < 30 ? 'text-red-500' : 'text-green-600'}`}>
                          ({daysUntilExpiry} days left)
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Batch Quantity</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{product.quantity.toLocaleString()} units</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Category</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{product.category}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Current Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-600">Status</span>
                    <StatusBadge status={product.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-600">Current Holder</span>
                    <code className="rounded bg-gray-100 px-2 py-1 text-sm font-mono text-gray-800">
                      {product.currentHolder}
                    </code>
                  </div>
                  {product.transfers.length > 0 && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-600">Last Location</span>
                        <span className="flex items-center gap-1 font-semibold text-gray-900">
                          <MapPin className="h-5 w-5 text-blue-500" />
                          {product.transfers[product.transfers.length - 1].location}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-600">Temperature</span>
                        <span className="flex items-center gap-1 font-semibold text-gray-900">
                          <Thermometer className="h-5 w-5 text-blue-500" />
                          {product.transfers[product.transfers.length - 1].temperature}°C
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              
              {/* Composition */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Composition & Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Active Ingredients</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{product.ingredients.join(', ')}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Dosage</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{product.dosage}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Form</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{product.form}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Packaging</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{product.packaging}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-600">Storage Requirements</dt>
                      <dd className="mt-1 font-semibold text-gray-900">{product.storageRequirements}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* QR Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">QR Code</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <canvas ref={qrCanvasRef} className="mb-4 rounded-lg border border-gray-200" />
                    <p className="mb-4 text-center text-sm text-gray-600">
                      Scan to verify product authenticity
                    </p>
                    <Button variant="outline" className="w-full font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 hover:border-blue-500">
                      <Download className="mr-2 h-4 w-4" />
                      Download QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Product ID */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Product Identification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-sm font-medium text-gray-600">Product ID</div>
                  <div className="rounded-lg bg-gray-100 p-3 font-mono text-sm font-semibold text-gray-800 break-all">
                    {product.productId}
                  </div>
                </CardContent>
              </Card>

              {/* Safety Checks */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Safety Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-800">Not recalled</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={`h-5 w-5 ${daysUntilExpiry > 30 ? 'text-green-600' : 'text-yellow-500'}`} />
                      <span className="text-sm font-medium text-gray-800">
                        {daysUntilExpiry > 30 ? 'Not expired' : 'Expiring soon'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-800">All transfers verified</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-800">No tampering detected</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Supply Chain History (Full Width) */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Supply Chain History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative space-y-6">
                    {/* Manufacturing Event */}
                    <div className="relative flex gap-4 pb-6">
                      <div className="flex flex-col items-center">
                        <div className="rounded-full bg-blue-500 p-2 text-white">
                          <Package className="h-5 w-5" />
                        </div>
                        {product.transfers.length > 0 && (
                          <div className="mt-2 h-full w-0.5 bg-gray-200" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">Product Manufactured</div>
                        <div className="mb-2 text-sm text-gray-600">
                          by {product.manufacturer.name}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(product.mfgDate).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Transfer Events */}
                    {product.transfers.map((transfer, index) => (
                      <div key={index} className="relative flex gap-4 pb-6">
                        <div className="flex flex-col items-center">
                          <div className={`rounded-full p-2 text-white ${transfer.verified ? 'bg-green-600' : 'bg-yellow-500'}`}>
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          {index < product.transfers.length - 1 && (
                            <div className="mt-2 h-full w-0.5 bg-gray-200" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-gray-900">
                            Transfer: {transfer.fromRole} → {transfer.toRole}
                          </div>
                          <div className="mb-2 text-sm text-gray-600">
                            {transfer.fromName} → {transfer.toName}
                          </div>
                          <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {transfer.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(transfer.timestamp).toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Thermometer className="h-4 w-4" />
                              {transfer.temperature}°C, {transfer.humidity}% humidity
                            </span>
                          </div>
                          {transfer.notes && (
                            <p className="mt-2 text-sm italic text-gray-600">"{transfer.notes}"</p>
                          )}
                          <code className="mt-2 block text-xs font-mono text-gray-500 break-all">
                            Tx: {transfer.txHash}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Blockchain Details (Full Width) */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Blockchain Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3 text-sm">
                    <div className="flex flex-wrap justify-between gap-2">
                      <dt className="font-medium text-gray-600">Transaction Hash</dt>
                      <dd className="font-mono text-gray-800 break-all">{product.blockchain.txHash}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="font-medium text-gray-600">Block Number</dt>
                      <dd className="font-mono text-gray-800">{product.blockchain.blockNumber}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="font-medium text-gray-600">Token ID</dt>
                      <dd className="font-mono text-gray-800">#{product.blockchain.tokenId}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProductDetails;
