import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { StatusBadge } from '@/components/StatusBadge';
import {
  QrCode,
  Search,
  CheckCircle2,
  AlertTriangle,
  Shield,
  Calendar,
  Package,
  Download,
  ChevronLeft,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Verify = () => {
  const [productId, setProductId] = useState('');
  const [searchResult, setSearchResult] = useState<'none' | 'success' | 'failed'>('none');
  const { getProduct } = useAppStore();
  const [verifiedProduct, setVerifiedProduct] = useState<any>(null);

  const handleSearch = () => {
    if (!productId) return;
    const product = getProduct(productId);
    if (product) {
      setVerifiedProduct(product);
      setSearchResult('success');
    } else {
      setVerifiedProduct(null);
      setSearchResult('failed');
    }
  };

  const handleScan = () => {
    // Simulate QR scan
    const mockProducts = ['MED-2024-A1B2C3', 'MED-2024-X9Y8Z7'];
    const randomId = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    setProductId(randomId);
    const product = getProduct(randomId);
    if (product) {
      setVerifiedProduct(product);
      setSearchResult('success');
    }
  };

  const resetSearch = () => {
    setProductId('');
    setSearchResult('none');
    setVerifiedProduct(null);
  };

  return (
    <>
      <style>{`
        .card-verify {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            transition: all 0.3s ease;
        }
        .card-verify:hover:not(.no-hover) {
            border-color: #3B82F6;
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1);
        }
        .cta-gradient {
            background: linear-gradient(90deg, #3B82F6, #2563EB);
        }
      `}</style>
      <div className="min-h-screen bg-white">
        <Navbar />

        <main className="container mx-auto max-w-5xl px-4 pt-28 pb-8">
          {searchResult === 'none' && (
            <div className="mb-12 text-center">
              <div className="mb-6 inline-flex rounded-full bg-blue-100 p-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-gray-900 md:text-6xl">
                Verify Product Authenticity
              </h1>
              <p className="mx-auto mt-2 max-w-2xl text-lg text-gray-600">
                Scan a QR code or enter a product ID to verify the authenticity of your Red Médica
                product.
              </p>
            </div>
          )}

          {searchResult !== 'none' && (
            <div className="mb-8">
              <Button variant="outline" onClick={resetSearch}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Verify Another Product
              </Button>
            </div>
          )}

          {/* Verification Method Selection */}
          {searchResult === 'none' && (
            <div className="grid animate-slide-up gap-8 md:grid-cols-2">
              {/* Scan QR Card */}
              <div
                className="card-verify group flex cursor-pointer flex-col rounded-xl p-8 text-center"
                onClick={handleScan}
              >
                <div className="mb-4 inline-flex self-center rounded-lg bg-blue-100 p-4 text-blue-600 transition-transform group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  <QrCode className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Scan QR Code</h3>
                <p className="mb-6 flex-grow text-sm text-gray-600">
                  Use your camera to scan the QR code on the product packaging for instant
                  verification.
                </p>
                <Button className="w-full cta-gradient font-semibold text-white">Scan Now</Button>
              </div>

              {/* Enter ID Card */}
              <div className="card-verify no-hover flex flex-col rounded-xl p-8">
                <div className="mb-4 inline-flex self-center rounded-lg bg-gray-100 p-4 text-gray-600">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-center text-xl font-bold text-gray-900">
                  Enter Product ID
                </h3>
                <p className="mb-6 flex-grow text-center text-sm text-gray-600">
                  Manually type in the unique product identifier found on the packaging.
                </p>
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="e.g., MED-2024-A1B2C3"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch} variant="outline" className="w-full">
                    Search Product
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Success Result */}
          {searchResult === 'success' && verifiedProduct && (
            <div className="space-y-6 animate-slide-up">
              {/* Success Header */}
              <Card className="border-success/50 bg-success/5 shadow-soft">
                <CardContent className="p-8 text-center">
                  <div className="mb-4 inline-flex rounded-full bg-success/10 p-4">
                    <CheckCircle2 className="h-16 w-16 text-success" />
                  </div>
                  <h2 className="mb-2 text-3xl font-bold text-success">
                    Product Verified Authentic
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    This product has been successfully verified on the Red Médica blockchain.
                  </p>
                </CardContent>
              </Card>

              {/* Product Information */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="mb-1 text-sm text-muted-foreground">Product Name</div>
                      <div className="text-lg font-semibold">{verifiedProduct.name}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-sm text-muted-foreground">Batch Number</div>
                      <div className="text-lg font-semibold">{verifiedProduct.batchNumber}</div>
                    </div>
                    <div>
                      <div className="mb-1 text-sm text-muted-foreground">Manufacturer</div>
                      <div className="font-semibold flex items-center gap-2">
                        <Shield className="h-4 w-4 text-success" />
                        {verifiedProduct.manufacturer.name}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-sm text-muted-foreground">Current Status</div>
                      <StatusBadge status={verifiedProduct.status} />
                    </div>
                    <div>
                      <div className="mb-1 text-sm text-muted-foreground">
                        Manufacturing Date
                      </div>
                      <div className="font-semibold">
                        {new Date(verifiedProduct.mfgDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <div className="mb-1 text-sm text-muted-foreground">Expiry Date</div>
                      <div className="font-semibold">
                        {new Date(verifiedProduct.expiryDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Trust Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-success/10 p-2">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="font-semibold">Blockchain Verified</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.floor(Math.random() * 100) + 50} confirmations
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-success/10 p-2">
                        <Package className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="font-semibold">Supply Chain</div>
                        <div className="text-sm text-muted-foreground">
                          {verifiedProduct.transfers.length} verified transfers
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-success/10 p-2">
                        <Shield className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="font-semibold">Temperature</div>
                        <div className="text-sm text-muted-foreground">100% compliance</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-success/10 p-2">
                        <Calendar className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="font-semibold">No Tampering</div>
                        <div className="text-sm text-muted-foreground">All seals intact</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to={`/products/${verifiedProduct.productId}`} className="flex-1">
                  <Button className="w-full cta-gradient text-white" size="lg">
                    View Full History
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="flex-1">
                  <Download className="mr-2 h-5 w-5" />
                  Download Certificate
                </Button>
              </div>
            </div>
          )}

          {/* Failed Result */}
          {searchResult === 'failed' && (
            <Card className="border-destructive/50 bg-destructive/5 shadow-soft animate-slide-up">
              <CardContent className="p-8 text-center">
                <div className="mb-4 inline-flex rounded-full bg-destructive/10 p-4">
                  <AlertTriangle className="h-16 w-16 text-destructive" />
                </div>
                <h2 className="mb-2 text-3xl font-bold text-destructive">
                  ⚠️ WARNING: Cannot Verify Product
                </h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  This product could not be found in our blockchain database. It may be counterfeit
                  or the Product ID may be incorrect.
                </p>
                <div className="space-y-4 text-left">
                  <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                    <h3 className="mb-2 font-semibold">What this means:</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Product not registered in our system</li>
                      <li>• May be counterfeit or substandard</li>
                      <li>• No verified supply chain information</li>
                      <li>• Cannot guarantee authenticity or safety</li>
                    </ul>
                  </div>
                  <Button variant="destructive" size="lg" className="w-full">
                    Report Counterfeit Product
                  </Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Helpline: 1-800-MEDICA-VERIFY
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Verify;
