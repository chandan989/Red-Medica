import { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/lib/store';
import { generateMockTxHash } from '@/lib/mockData';
import { Transfer as TransferType } from '@/lib/mockData';
import { ArrowRight, Loader2, CheckCircle2, ArrowLeftRight } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Transfer = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { getProduct, updateProduct, user } = useAppStore();
  const product = getProduct(productId!);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [txHash, setTxHash] = useState('');

  const [formData, setFormData] = useState({
    recipientAddress: '',
    recipientName: '',
    recipientRole: '',
    destination: '',
    expectedDelivery: '',
    carrier: '',
    temperature: '',
    humidity: '',
    containerType: '',
    sealNumber: '',
    notes: '',
    confirmed: false,
  });

  if (!product) {
    return <Navigate to="/dashboard" replace />;;
  }

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.confirmed) {
      toast.error('Please confirm the transfer');
      return;
    }

    setIsSubmitting(true);

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const hash = generateMockTxHash();
    setTxHash(hash);

    const newTransfer: TransferType = {
      from: user!.address,
      fromName: user!.name,
      fromRole: user!.role as any,
      to: formData.recipientAddress,
      toName: formData.recipientName,
      toRole: formData.recipientRole as any,
      timestamp: new Date().toISOString(),
      location: formData.destination,
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity),
      verified: true,
      txHash: hash,
      notes: formData.notes || undefined,
    };

    updateProduct(productId!, {
      currentHolder: formData.recipientAddress,
      status: 'In Transit',
      transfers: [...product.transfers, newTransfer],
    });

    setIsSubmitting(false);
    setShowSuccess(true);
  };

  return (
    <>
      <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background: #F7FAFC;
            color: #1a202c;
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
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />

        <main className="container mx-auto max-w-4xl px-4 pt-28 pb-8">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex rounded-full bg-blue-100 p-4">
                <ArrowLeftRight className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 md:text-6xl">
              Transfer Custody
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Securely transfer product ownership on the blockchain.
            </p>
          </div>

          {/* Product Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Product Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-medium text-gray-600">Product Name</dt>
                  <dd className="font-semibold text-gray-900">{product.name}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Batch Number</dt>
                  <dd className="font-semibold text-gray-900">{product.batchNumber}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Current Holder</dt>
                  <dd className="font-mono text-xs text-gray-800">{user?.name}</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Status</dt>
                  <dd className="font-semibold text-gray-900">{product.status}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Transfer Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Transfer Details</CardTitle>
              <CardDescription className="text-gray-600">Enter recipient and shipping information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Recipient Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Recipient Information</h3>
                <div>
                  <Label htmlFor="address" className="font-medium text-gray-700">Wallet Address *</Label>
                  <Input
                    id="address"
                    placeholder="0x..."
                    value={formData.recipientAddress}
                    onChange={(e) => updateField('recipientAddress', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="name" className="font-medium text-gray-700">Recipient Name/Organization *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., HealthPlus Pharmacy"
                    value={formData.recipientName}
                    onChange={(e) => updateField('recipientName', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="role" className="font-medium text-gray-700">Recipient Role *</Label>
                  <Select value={formData.recipientRole} onValueChange={(v) => updateField('recipientRole', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Distributor">Distributor</SelectItem>
                      <SelectItem value="Pharmacy">Pharmacy</SelectItem>
                      <SelectItem value="Hospital">Hospital</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Shipping Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Shipping Details</h3>
                <div>
                  <Label htmlFor="destination" className="font-medium text-gray-700">Destination Address *</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., New Delhi, India"
                    value={formData.destination}
                    onChange={(e) => updateField('destination', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="delivery" className="font-medium text-gray-700">Expected Delivery Date *</Label>
                  <Input
                    id="delivery"
                    type="date"
                    value={formData.expectedDelivery}
                    onChange={(e) => updateField('expectedDelivery', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="carrier" className="font-medium text-gray-700">Carrier/Method</Label>
                  <Input
                    id="carrier"
                    placeholder="e.g., FedEx, DHL"
                    value={formData.carrier}
                    onChange={(e) => updateField('carrier', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Storage Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Storage Conditions</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="temp" className="font-medium text-gray-700">Initial Temperature (°C) *</Label>
                    <Input
                      id="temp"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 4.5"
                      value={formData.temperature}
                      onChange={(e) => updateField('temperature', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="humidity" className="font-medium text-gray-700">Initial Humidity (%) *</Label>
                    <Input
                      id="humidity"
                      type="number"
                      placeholder="e.g., 45"
                      value={formData.humidity}
                      onChange={(e) => updateField('humidity', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="container" className="font-medium text-gray-700">Container Type</Label>
                  <Input
                    id="container"
                    placeholder="e.g., Refrigerated Container"
                    value={formData.containerType}
                    onChange={(e) => updateField('containerType', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="seal" className="font-medium text-gray-700">Seal Number</Label>
                  <Input
                    id="seal"
                    placeholder="e.g., SEAL-123456"
                    value={formData.sealNumber}
                    onChange={(e) => updateField('sealNumber', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <Label htmlFor="notes" className="font-medium text-gray-700">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information about the transfer..."
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  className="mt-1"
                />
              </div>

              {/* Confirmation */}
              <div className="space-y-4 rounded-lg border bg-blue-50 p-4">
                <h3 className="text-lg font-semibold text-gray-800">Confirmation</h3>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={formData.confirmed}
                    onChange={(e) => updateField('confirmed', e.target.checked)}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I confirm that all information is correct and authorize this transfer on the blockchain.
                  </span>
                </label>
                <p className="text-xs text-gray-500">
                  Transfer timestamp: {new Date().toLocaleString()}
                </p>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.confirmed || !formData.recipientAddress}
                className="w-full cta-gradient font-semibold"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Transfer on Blockchain...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-5 w-5" />
                    Transfer on Blockchain
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </main>

        {/* Success Dialog */}
        <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
          <DialogContent>
            <DialogHeader>
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <DialogTitle className="text-center text-2xl font-bold text-gray-900">Transfer Successful!</DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Product custody has been transferred on the blockchain.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="rounded-lg border bg-gray-100 p-4">
                <div className="mb-2 text-sm font-medium text-gray-600">Transaction Hash</div>
                <div className="break-all font-mono text-xs text-gray-800">{txHash}</div>
              </div>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1 font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-100 hover:border-blue-500"
                  onClick={() => navigate('/dashboard')}
                >
                  View Dashboard
                </Button>
                <Button
                  className="cta-gradient flex-1 font-semibold"
                  onClick={() => navigate(`/products/${productId}`)}
                >
                  View Product
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </>
  );
};

export default Transfer;
