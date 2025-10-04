import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isWalletConnected, user, disconnectWallet } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/') return;

    const header = document.getElementById('app-header');
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add('bg-white/80', 'backdrop-blur-sm', 'border-b', 'border-gray-200', 'shadow-sm');
      } else {
        header?.classList.remove('bg-white/80', 'backdrop-blur-sm', 'border-b', 'border-gray-200', 'shadow-sm');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/verify', label: 'Verify' },
    { path: '/analytics', label: 'Analytics' },
    { path: '/help', label: 'Help' },
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const shortAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (location.pathname === '/') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300" id="app-header">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Red Médica Logo" className="h-8 w-auto" />
            <span className="ml-3 text-2xl font-bold tracking-tighter text-gray-800">Red Médica</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center">
              {isWalletConnected && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-300 hover:border-blue-600 text-gray-900 hover:text-blue-600 text-sm font-medium"
                    >
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                      {shortAddress(user.address)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer text-red-600 focus:text-red-600"
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => navigate('/connect')} className="cta-gradient text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:opacity-90 transition-all duration-300">
                  Connect Wallet
                </Button>
              )}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-gray-200 mt-4 pt-4">
              {isWalletConnected && user ? (
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center text-base font-medium">
                        <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />
                        {shortAddress(user.address)}
                    </div>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-gray-600 hover:text-blue-600">Profile</Link>
                    <button onClick={() => { disconnectWallet(); setMobileMenuOpen(false); }} className="text-base font-medium text-red-600 hover:text-red-700">
                        Disconnect
                    </button>
                </div>
              ) : (
                <Button onClick={() => { navigate('/connect'); setMobileMenuOpen(false); }} className="w-full cta-gradient text-white font-semibold rounded-lg text-sm">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
