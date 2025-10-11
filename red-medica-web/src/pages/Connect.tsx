import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { moonbeamBlockchainService } from '@/services/moonbeam-blockchain';
import { demoModeService } from '@/services/demo-mode';
import { 
  Building2, 
  Truck, 
  Store, 
  User, 
  Info,
  Wifi,
  WifiOff
} from 'lucide-react';
import { toast } from 'sonner';
import { HelpTooltip } from '@/components/HelpTooltip';
import { NetworkStatus } from '@/types/blockchain';

const Connect = () => {
  const navigate = useNavigate();
  const { connectWallet } = useAppStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'Manufacturer',
      title: 'Manufacturer',
      description: 'Register products and initiate supply chain tracking',
      icon: Building2
    },
    {
      id: 'Distributor',
      title: 'Distributor',
      description: 'Receive shipments and manage product transfers',
      icon: Truck
    },
    {
      id: 'Pharmacy',
      title: 'Pharmacy',
      description: 'Stock verified products and serve patients',
      icon: Store
    },
    {
      id: 'Patient',
      title: 'Patient',
      description: 'Verify product authenticity and view supply chain',
      icon: User
    }
  ];

  const handleRoleSelect = async (roleId: string) => {
    setSelectedRole(roleId);
    setIsConnecting(true);

    try {
      console.log('🔄 Starting wallet connection process for role:', roleId);
      
      // First, try to initialize demo mode service
      await demoModeService.initialize();
      
      // Always try blockchain first if MetaMask is available, regardless of demo mode settings
      const hasMetaMask = window.ethereum;
      
      if (hasMetaMask) {
        console.log('✅ MetaMask detected, attempting connection...');

        try {
          // Initialize the moonbeam service first
          await moonbeamBlockchainService.initialize();
          
          // Use original moonbeam service
          const accounts = await moonbeamBlockchainService.connectWallet();
          
          if (accounts.length === 0) {
            throw new Error('No accounts selected in MetaMask');
          }
          
          const connectedAccount = accounts[0];
          console.log('✅ MetaMask connected:', connectedAccount);

          // Update the store with connection info
          const { setUser, setIsAuthenticated, setNetworkInfo } = useAppStore.getState();
          
          setUser({
            address: connectedAccount,
            name: `${roleId} (${connectedAccount.slice(0, 6)}...${connectedAccount.slice(-4)})`,
            role: roleId.toLowerCase() as 'manufacturer' | 'distributor' | 'pharmacy' | 'consumer',
            isAuthorized: true,
            metadata: {
              source: 'metamask',
              type: 'ethereum',
              contractAddress: '0xAD6655fa10DB0DDDc079774198E76c457E2e0C8C',
              network: 'Moonbase Alpha'
            }
          });

          setIsAuthenticated(true);
          setNetworkInfo({
            status: NetworkStatus.CONNECTED,
            endpoint: 'https://rpc.api.moonbase.moonbeam.network',
            lastUpdate: Date.now(),
            chainName: 'Moonbase Alpha',
            contractAddress: '0xAD6655fa10DB0DDDc079774198E76c457E2e0C8C',
          });

          connectWallet(roleId as any);
          
          toast.success('Wallet Connected!', {
            description: `Connected as ${roleId} to Moonbase Alpha`,
            icon: <Wifi className="h-4 w-4" />
          });

          navigate('/dashboard');
          return;

        } catch (blockchainError: any) {
          console.warn('❌ Blockchain connection failed, falling back to demo mode:', blockchainError);
          
          // Don't show error toast for network issues, just fall through to demo mode
          if (!blockchainError.message?.includes('rejected') && !blockchainError.code === 4001) {
            console.log('🎭 Falling back to demo mode due to network issues');
          } else {
            // User rejected, show error and exit
            toast.error('Connection Rejected', {
              description: 'Connection rejected by user. Please try again and approve the connection.'
            });
            return;
          }
        }
      }

      // Use demo mode (either by choice or as fallback)
      console.log('🎭 Using demo mode for role:', roleId);
      
      const demoAccounts = await demoModeService.connectDemoWallet(roleId);
      const demoUser = demoModeService.getCurrentUser();
      
      if (!demoUser) {
        throw new Error('Failed to create demo user');
      }

      // Update store with demo connection
      const { setUser, setIsAuthenticated, setNetworkInfo } = useAppStore.getState();
      
      setUser({
        address: demoUser.address,
        name: demoUser.name,
        role: demoUser.role,
        isAuthorized: demoUser.isAuthorized,
        metadata: demoUser.metadata
      });

      setIsAuthenticated(true);
      setNetworkInfo({
        status: NetworkStatus.CONNECTED,
        endpoint: 'demo-mode',
        lastUpdate: Date.now(),
        chainName: 'Demo Network',
        contractAddress: 'demo-contract',
      });

      connectWallet(roleId as any);
      
      // Show demo mode notification
      demoModeService.showDemoNotification();
      
      toast.success('Demo Mode Connected!', {
        description: `Connected as ${roleId} in demonstration mode`,
        icon: <WifiOff className="h-4 w-4" />
      });

      navigate('/dashboard');

    } catch (error: any) {
      console.error('❌ Connection error:', error);
      
      toast.error('Connection Failed', {
        description: 'Unable to connect in either blockchain or demo mode. Please try again.',
        duration: 6000
      });
    } finally {
      setIsConnecting(false);
      setSelectedRole(null);
    }
  };

  return (
    <>
      <style>{`
        body {
            font-family: 'Inter', sans-serif;
            background: #FFFFFF;
        }
        .main-container {
            min-height: 100vh;
            background: #FFFFFF;
            padding-top: 120px;
            padding-bottom: 80px;
        }
        .header-section {
            text-align: center;
            margin-bottom: 64px;
        }
        .wallet-icon {
            width: 80px;
            height: 80px;
            background: #DBEAFE;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 32px;
        }
        .main-title {
            font-size: 56px;
            font-weight: 900;
            color: #1A202C;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
            line-height: 1.1;
        }
        .main-description {
            font-size: 16px;
            color: #6B7280;
            max-width: 640px;
            margin: 0 auto;
            line-height: 1.6;
        }
        .roles-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 32px;
            max-width: 1400px;
            margin: 0 auto 80px;
            align-items: stretch;
            padding: 0 20px;
        }
        @media (max-width: 1024px) {
            .roles-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 24px;
            }
        }
        @media (max-width: 640px) {
            .roles-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
        }
        .role-card {
            background: #FFFFFF;
            border: 1px solid #E2E8F0;
            border-radius: 16px;
            padding: 48px 36px;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: 320px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }
        .role-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
            border-color: #3B82F6;
        }
        .role-icon {
            width: 80px;
            height: 80px;
            background: #DBEAFE;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
        }
        .role-title {
            font-size: 24px;
            font-weight: 700;
            color: #1A202C;
            margin-bottom: 16px;
        }
        .role-description {
            font-size: 16px;
            color: #6B7280;
            margin-bottom: 32px;
            line-height: 1.6;
            flex-grow: 1;
        }
        .connect-btn {
            background: linear-gradient(90deg, #3B82F6, #2563EB);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 16px 32px;
            font-weight: 600;
            width: 100%;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 52px;
            margin-top: auto;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .connect-btn:hover {
            opacity: 0.9;
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }
        .connect-btn:disabled {
            background: #A0AEC0;
            cursor: not-allowed;
        }
        .demo-notice {
            background: #EBF8FF;
            border: 1px solid #BEE3F8;
            border-radius: 12px;
            padding: 20px;
            max-width: 1000px;
            margin: 0 auto;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        .demo-notice-icon {
            color: #3B82F6;
            margin-top: 2px;
        }
        .demo-notice-content h3 {
            font-size: 16px;
            font-weight: 600;
            color: #1A365D;
            margin-bottom: 4px;
        }
        .demo-notice-content p {
            font-size: 14px;
            color: #2A69AC;
            line-height: 1.5;
        }
      `}</style>
      
      <div className="main-container">
        <Navbar />

        <main className="container mx-auto max-w-7xl px-4">
          {/* Header Section */}
          <div className="header-section">
            <div className="wallet-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8V6C21 4.9 20.1 4 19 4H5C3.9 4 3 4.9 3 6V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V16H17C15.9 16 15 15.1 15 14V10C15 8.9 15.9 8 17 8H21ZM17 12C16.4 12 16 11.6 16 11S16.4 10 17 10 18 10.4 18 11 17.6 12 17 12Z" fill="#3B82F6"/>
              </svg>
            </div>
            <h1 className="main-title">Connect Your Wallet</h1>
            <p className="main-description">
              Select your role within the Red Médica ecosystem to get started. Each role has 
              a unique dashboard and set of permissions.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="roles-grid">
            {roles.map((role) => {
              const IconComponent = role.icon;
              const isSelected = selectedRole === role.id;
              const isLoading = isConnecting && isSelected;
              
              return (
                <div 
                  key={role.id} 
                  className="role-card"
                  onClick={() => !isConnecting && handleRoleSelect(role.id)}
                  style={{
                    opacity: isConnecting && !isSelected ? 0.5 : 1,
                    pointerEvents: isConnecting && !isSelected ? 'none' : 'auto'
                  }}
                >
                  <div className="role-icon">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="role-title flex items-center gap-2">
                    {role.title}
                    <HelpTooltip
                      content={`As a ${role.title.toLowerCase()}, you can ${role.description.toLowerCase()}.`}
                      type="info"
                    />
                  </div>
                  <div className="role-description">{role.description}</div>
                  <button 
                    className="connect-btn"
                    disabled={isConnecting}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isConnecting) {
                        handleRoleSelect(role.id);
                      }
                    }}
                  >
                    {isLoading ? 'Connecting...' : 'Connect'}
                  </button>
                </div>
              );
            })}
          </div>


        </main>

        <Footer />
      </div>
    </>
  );
};

export default Connect;
