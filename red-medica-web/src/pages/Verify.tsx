import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  MapPin,
  Calendar,
  Package,
  Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Verify = () => {
  const [productId, setProductId] = useState('');
  const [searchResult, setSearchResult] = useState<'none' | 'success' | 'failed'>('none');
  const { getProduct } = useAppStore();
  const [verifiedProduct, setVerifiedProduct] = useState<any>(null);

  const handleSearch = () => {
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
    // Simulate QR scan - in production, this would open camera
    const mockProducts = ['MED-2024-A1B2C3', 'MED-2024-X9Y8Z7'];
    const randomId = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    setProductId(randomId);
    const product = getProduct(randomId);
    if (product) {
      setVerifiedProduct(product);
      setSearchResult('success');
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-4xl font-bold">Verify Product Authenticity</h1>
          <p className="text-xl text-muted-foreground">
            Scan a QR code or enter a product ID to verify authenticity
          </p>
        </div>

        {/* Scanner Section */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle>Verification Method</CardTitle>
            <CardDescription>Choose how you want to verify the product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button
                size="lg"
                onClick={handleScan}
                className="h-24 flex-col gap-2 gradient-primary"
              >
                <QrCode className="h-8 w-8" />
                Scan QR Code
              </Button>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Enter Product ID (e.g., MED-2024-A1B2C3)"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button size="lg" variant="outline" onClick={handleSearch} className="flex-1">
                  <Search className="mr-2 h-5 w-5" />
                  Search Product ID
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Result */}
        {searchResult === 'success' && verifiedProduct && (
          <div className="space-y-6 animate-slide-up">
            {/* Success Header */}
            <Card className="border-success/50 bg-success/5 shadow-soft">
              <CardContent className="p-8 text-center">
                <div className="mb-4 inline-flex rounded-full bg-success/10 p-4">
                  <CheckCircle2 className="h-16 w-16 text-success" />
                </div>
                <h2 className="mb-2 text-3xl font-bold text-success">Product Verified Authentic</h2>
                <p className="text-lg text-muted-foreground">100% Confidence Score</p>
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
                    <div className="mb-1 text-sm text-muted-foreground">Manufacturing Date</div>
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

            {/* Safety Checks */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Safety Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>✅ Not recalled</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>✅ Not expired</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>✅ Temperature maintained throughout journey</span>
                  </div>
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>✅ All transfers verified and authenticated</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={`/products/${verifiedProduct.productId}`} className="flex-1">
                <Button className="w-full gradient-primary" size="lg">
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
                This product could not be found in our blockchain database. It may be counterfeit or the
                Product ID may be incorrect.
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

        {/* Instructions */}
        {searchResult === 'none' && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>How to Verify</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    1
                  </span>
                  <span>
                    <strong className="text-foreground">Scan QR Code:</strong> Click "Scan QR Code" button and point your camera at the QR code on the product packaging.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    2
                  </span>
                  <span>
                    <strong className="text-foreground">Enter Product ID:</strong> Alternatively, manually enter the Product ID found on the packaging.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    3
                  </span>
                  <span>
                    <strong className="text-foreground">View Results:</strong> Instantly see verification status, supply chain history, and safety checks.
                  </span>
                </li>
              </ol>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Verify;
