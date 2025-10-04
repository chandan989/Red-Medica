import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
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
import { categories, productForms, generateProductId, generateMockTxHash } from '@/lib/mockData';
import { Product, Transfer } from '@/lib/mockData';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Register = () => {
  const navigate = useNavigate();
  const { user, isWalletConnected, addProduct } = useAppStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedProductId, setGeneratedProductId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    batchNumber: '',
    quantity: '',
    category: '',
    mfgDate: '',
    expiryDate: '',
    productionLocation: '',
    ingredients: '',
    dosage: '',
    form: '',
    packaging: '',
    storageTemp: '',
    fdaNumber: '',
    targetRegions: [] as string[],
  });

  if (!isWalletConnected || user?.role !== 'Manufacturer') {
    return <Navigate to="/connect" replace />;
  }

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.name && formData.batchNumber && formData.quantity && formData.category);
      case 2:
        return !!(formData.mfgDate && formData.expiryDate && formData.productionLocation);
      case 3:
        return !!(formData.ingredients && formData.dosage && formData.form && formData.packaging);
      case 4:
        return !!(formData.fdaNumber && formData.targetRegions.length > 0);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const productId = generateProductId();
    const txHash = generateMockTxHash();

    const newProduct: Product = {
      productId,
      name: formData.name,
      batchNumber: formData.batchNumber,
      manufacturer: {
        address: user!.address,
        name: user!.name,
        license: user!.license,
      },
      quantity: parseInt(formData.quantity),
      mfgDate: formData.mfgDate,
      expiryDate: formData.expiryDate,
      category: formData.category,
      status: 'Manufactured',
      currentHolder: user!.address,
      blockchain: {
        txHash,
        blockNumber: Math.floor(Math.random() * 1000000) + 12000000,
        tokenId: Math.floor(Math.random() * 1000),
      },
      transfers: [],
      ingredients: formData.ingredients.split(',').map((i) => i.trim()),
      dosage: formData.dosage,
      form: formData.form,
      packaging: formData.packaging,
      storageRequirements: formData.storageTemp,
      fdaNumber: formData.fdaNumber,
      targetRegions: formData.targetRegions,
    };

    addProduct(newProduct);
    setGeneratedProductId(productId);
    setIsSubmitting(false);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Register New Product</h1>
          <p className="text-muted-foreground">Add a new pharmaceutical product to the blockchain</p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex flex-1 items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold ${
                    s <= step
                      ? 'gradient-primary border-transparent text-white'
                      : 'border-border bg-background'
                  }`}
                >
                  {s < step ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 5 && (
                  <div
                    className={`h-1 flex-1 ${
                      s < step ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>Basic Info</span>
            <span>Dates</span>
            <span>Details</span>
            <span>Regulatory</span>
            <span>Review</span>
          </div>
        </div>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>
              {step === 1 && 'Basic Information'}
              {step === 2 && 'Dates & Expiry'}
              {step === 3 && 'Product Details'}
              {step === 4 && 'Regulatory Information'}
              {step === 5 && 'Review & Submit'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Enter the basic product information'}
              {step === 2 && 'Specify manufacturing and expiry dates'}
              {step === 3 && 'Provide detailed product specifications'}
              {step === 4 && 'Add regulatory and compliance information'}
              {step === 5 && 'Review all information before submitting to blockchain'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Amoxicillin 500mg"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="batch">Batch Number *</Label>
                  <Input
                    id="batch"
                    placeholder="e.g., BATCH-001"
                    value={formData.batchNumber}
                    onChange={(e) => updateField('batchNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="e.g., 10000"
                    value={formData.quantity}
                    onChange={(e) => updateField('quantity', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(v) => updateField('category', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 2: Dates */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mfgDate">Manufacturing Date *</Label>
                  <Input
                    id="mfgDate"
                    type="date"
                    value={formData.mfgDate}
                    onChange={(e) => updateField('mfgDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => updateField('expiryDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Production Location *</Label>
                  <Input
                    id="location"
                    placeholder="e.g., Mumbai, India"
                    value={formData.productionLocation}
                    onChange={(e) => updateField('productionLocation', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Product Details */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ingredients">Active Ingredients (comma-separated) *</Label>
                  <Textarea
                    id="ingredients"
                    placeholder="e.g., Amoxicillin Trihydrate, Magnesium Stearate"
                    value={formData.ingredients}
                    onChange={(e) => updateField('ingredients', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="dosage">Dosage *</Label>
                  <Input
                    id="dosage"
                    placeholder="e.g., 500mg per capsule"
                    value={formData.dosage}
                    onChange={(e) => updateField('dosage', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="form">Form *</Label>
                  <Select value={formData.form} onValueChange={(v) => updateField('form', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select form" />
                    </SelectTrigger>
                    <SelectContent>
                      {productForms.map((form) => (
                        <SelectItem key={form} value={form}>
                          {form}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="packaging">Packaging Type *</Label>
                  <Input
                    id="packaging"
                    placeholder="e.g., Blister Pack - 10 capsules per strip"
                    value={formData.packaging}
                    onChange={(e) => updateField('packaging', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="storage">Storage Requirements</Label>
                  <Input
                    id="storage"
                    placeholder="e.g., 2-8°C, Protected from light"
                    value={formData.storageTemp}
                    onChange={(e) => updateField('storageTemp', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 4: Regulatory */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fda">FDA Approval Number *</Label>
                  <Input
                    id="fda"
                    placeholder="e.g., NDA-050760"
                    value={formData.fdaNumber}
                    onChange={(e) => updateField('fdaNumber', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Target Regions *</Label>
                  <div className="mt-2 space-y-2">
                    {['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'].map(
                      (region) => (
                        <label key={region} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={formData.targetRegions.includes(region)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateField('targetRegions', [...formData.targetRegions, region]);
                              } else {
                                updateField(
                                  'targetRegions',
                                  formData.targetRegions.filter((r) => r !== region)
                                );
                              }
                            }}
                            className="h-4 w-4"
                          />
                          <span>{region}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="rounded-lg border bg-muted/30 p-4">
                  <h3 className="mb-3 font-heading font-semibold">Product Summary</h3>
                  <dl className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <dt className="text-muted-foreground">Product Name</dt>
                      <dd className="font-medium">{formData.name}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Batch Number</dt>
                      <dd className="font-medium">{formData.batchNumber}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Quantity</dt>
                      <dd className="font-medium">{formData.quantity}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Category</dt>
                      <dd className="font-medium">{formData.category}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Manufacturing Date</dt>
                      <dd className="font-medium">
                        {new Date(formData.mfgDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Expiry Date</dt>
                      <dd className="font-medium">
                        {new Date(formData.expiryDate).toLocaleDateString()}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-muted-foreground">FDA Number</dt>
                      <dd className="font-medium">{formData.fdaNumber}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1 || isSubmitting}
              >
                Previous
              </Button>
              {step < 5 ? (
                <Button onClick={handleNext} disabled={!validateStep(step)}>
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gradient-primary"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering on Blockchain...
                    </>
                  ) : (
                    'Register on Blockchain'
                  )}
                </Button>
              )}
            </div>
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
            <DialogTitle className="text-center text-2xl">Product Registered Successfully!</DialogTitle>
            <DialogDescription className="text-center">
              Your product has been successfully registered on the blockchain
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="mb-2 text-sm text-muted-foreground">Product ID</div>
              <div className="font-mono text-lg font-semibold">{generatedProductId}</div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleSuccessClose}>
                View Dashboard
              </Button>
              <Button className="gradient-primary flex-1" asChild>
                <a href={`/products/${generatedProductId}`}>View Product</a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Register;
