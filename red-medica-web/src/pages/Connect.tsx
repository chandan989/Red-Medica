import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
    await new Promise((resolve) => setTimeout(resolve, 1500));

    connectWallet(role);
    toast.success(`Connected as ${role}!`, {
      description: 'Your wallet has been successfully connected.',
    });

    setIsConnecting(false);
    navigate('/dashboard');
  };

  return (
    <>
      <style>{`
        .card-connect {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            transition: all 0.3s ease;
        }
        .card-connect:hover {
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

        <main className="container mx-auto max-w-5xl px-4 py-24 sm:py-32">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex rounded-full bg-blue-100 p-4">
              <Wallet className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-gray-900 md:text-6xl">
              Connect Your Wallet
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Select your role within the Red Médica ecosystem to get started. Each role has a
              unique dashboard and set of permissions.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {roles.map((item) => (
              <div
                key={item.role}
                className="card-connect group flex cursor-pointer flex-col rounded-xl p-6 text-center"
                onClick={() => !isConnecting && handleConnect(item.role)}
              >
                <div className="mb-4 inline-flex self-center rounded-lg bg-blue-100 p-4 text-blue-600 transition-transform group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  <item.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="mb-6 flex-grow text-sm text-gray-600">{item.description}</p>
                <Button
                  className="w-full cta-gradient font-semibold text-white"
                  disabled={isConnecting}
                >
                  {isConnecting && selectedRole === item.role ? 'Connecting...' : 'Connect'}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-20 rounded-xl border border-blue-200 bg-blue-50 p-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="mt-1 h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900">This is a Demonstration</h3>
                <p className="text-blue-800/80">
                  Red Médica is currently in a simulated environment. Wallet connections and
                  blockchain interactions are mimicked to showcase functionality without requiring
                  real funds or a browser extension like MetaMask.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Connect;
