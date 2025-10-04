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
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
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
    return <Navigate to="/dashboard" replace />;
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
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Transfer Custody</h1>
          <p className="text-muted-foreground">
            Transfer product ownership on the blockchain
          </p>
        </div>

        {/* Product Summary */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle>Product Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Product Name</dt>
                <dd className="font-semibold">{product.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Batch Number</dt>
                <dd className="font-semibold">{product.batchNumber}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Current Holder</dt>
                <dd className="font-mono text-xs">{user?.name}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-semibold">{product.status}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Transfer Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
            <CardDescription>Enter recipient and shipping information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipient Information */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold">Recipient Information</h3>
              <div>
                <Label htmlFor="address">Wallet Address *</Label>
                <Input
                  id="address"
                  placeholder="0x..."
                  value={formData.recipientAddress}
                  onChange={(e) => updateField('recipientAddress', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="name">Recipient Name/Organization *</Label>
                <Input
                  id="name"
                  placeholder="e.g., HealthPlus Pharmacy"
                  value={formData.recipientName}
                  onChange={(e) => updateField('recipientName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="role">Recipient Role *</Label>
                <Select value={formData.recipientRole} onValueChange={(v) => updateField('recipientRole', v)}>
                  <SelectTrigger>
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
              <h3 className="font-heading text-lg font-semibold">Shipping Details</h3>
              <div>
                <Label htmlFor="destination">Destination Address *</Label>
                <Input
                  id="destination"
                  placeholder="e.g., New Delhi, India"
                  value={formData.destination}
                  onChange={(e) => updateField('destination', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="delivery">Expected Delivery Date *</Label>
                <Input
                  id="delivery"
                  type="date"
                  value={formData.expectedDelivery}
                  onChange={(e) => updateField('expectedDelivery', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="carrier">Carrier/Method</Label>
                <Input
                  id="carrier"
                  placeholder="e.g., FedEx, DHL"
                  value={formData.carrier}
                  onChange={(e) => updateField('carrier', e.target.value)}
                />
              </div>
            </div>

            {/* Storage Conditions */}
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-semibold">Storage Conditions</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="temp">Initial Temperature (°C) *</Label>
                  <Input
                    id="temp"
                    type="number"
                    step="0.1"
                    placeholder="e.g., 4.5"
                    value={formData.temperature}
                    onChange={(e) => updateField('temperature', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="humidity">Initial Humidity (%) *</Label>
                  <Input
                    id="humidity"
                    type="number"
                    placeholder="e.g., 45"
                    value={formData.humidity}
                    onChange={(e) => updateField('humidity', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="container">Container Type</Label>
                <Input
                  id="container"
                  placeholder="e.g., Refrigerated Container"
                  value={formData.containerType}
                  onChange={(e) => updateField('containerType', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="seal">Seal Number</Label>
                <Input
                  id="seal"
                  placeholder="e.g., SEAL-123456"
                  value={formData.sealNumber}
                  onChange={(e) => updateField('sealNumber', e.target.value)}
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about the transfer..."
                value={formData.notes}
                onChange={(e) => updateField('notes', e.target.value)}
              />
            </div>

            {/* Confirmation */}
            <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
              <h3 className="font-heading text-lg font-semibold">Confirmation</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.confirmed}
                  onChange={(e) => updateField('confirmed', e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm">
                  I confirm that all information is correct and authorize this transfer on the blockchain
                </span>
              </label>
              <p className="text-xs text-muted-foreground">
                Transfer timestamp: {new Date().toLocaleString()}
              </p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.confirmed || !formData.recipientAddress}
              className="w-full gradient-primary"
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
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-success/10 p-3">
                <CheckCircle2 className="h-12 w-12 text-success" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">Transfer Successful!</DialogTitle>
            <DialogDescription className="text-center">
              Product custody has been transferred on the blockchain
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="mb-2 text-sm text-muted-foreground">Transaction Hash</div>
              <div className="break-all font-mono text-xs">{txHash}</div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard
              </Button>
              <Button
                className="gradient-primary flex-1"
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
  );
};

export default Transfer;
