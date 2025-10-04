import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { Wallet, Building2, Truck, Store, User } from 'lucide-react';
import { toast } from 'sonner';
import { User as UserType } from '@/lib/mockData';

const Connect = () => {
  const navigate = useNavigate();
  const { connectWallet } = useAppStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserType['role'] | null>(null);

  const roles = [
    {
      role: 'Manufacturer' as const,
      icon: Building2,
      title: 'Manufacturer',
      description: 'Register products and initiate supply chain tracking',
    },
    {
      role: 'Distributor' as const,
      icon: Truck,
      title: 'Distributor',
      description: 'Receive shipments and manage product transfers',
    },
    {
      role: 'Pharmacy' as const,
      icon: Store,
      title: 'Pharmacy',
      description: 'Stock verified products and serve patients',
    },
    {
      role: 'Patient' as const,
      icon: User,
      title: 'Patient',
      description: 'Verify product authenticity and view supply chain',
    },
  ];

  const handleConnect = async (role: UserType['role']) => {
    setSelectedRole(role);
    setIsConnecting(true);

    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 2000));

    connectWallet(role);
    toast.success(`Connected as ${role}!`, {
      description: 'Your wallet has been successfully connected.',
    });

    setIsConnecting(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
            <Wallet className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold">Connect Your Wallet</h1>
          <p className="text-xl text-muted-foreground">
            Select your role to get started with Red Médica
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((item) => (
            <Card
              key={item.role}
              className="group cursor-pointer shadow-soft transition-all hover:shadow-medium hover:scale-105"
              onClick={() => !isConnecting && handleConnect(item.role)}
            >
              <CardHeader>
                <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-primary to-secondary p-3 text-white transition-transform group-hover:scale-110">
                  <item.icon className="h-8 w-8" />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full gradient-primary"
                  disabled={isConnecting}
                >
                  {isConnecting && selectedRole === item.role ? 'Connecting...' : 'Connect'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardContent className="p-6">
            <h3 className="mb-2 font-heading text-lg font-semibold">Demo Mode</h3>
            <p className="text-sm text-muted-foreground">
              This is a demonstration application with simulated blockchain functionality. In
              production, this would connect to your actual Web3 wallet (MetaMask, WalletConnect,
              etc.) and interact with a real blockchain network.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Connect;
