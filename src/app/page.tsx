'use client';

import { useState, useEffect } from 'react';
import { requestAccess, isConnected, isAllowed } from '@stellar/freighter-api';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if wallet is already connected on page load
    const checkWalletConnection = async () => {
      try {
        const { isConnected: connected } = await isConnected();
        const { isAllowed: allowed } = await isAllowed();
        
        if (connected && allowed) {
          const savedAddress = localStorage.getItem('walletAddress');
          if (savedAddress) {
            setWalletConnected(true);
          }
        }
      } catch (err) {
        console.log('Wallet not available');
      }
    };

    checkWalletConnection();
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if Freighter is installed
      const { isConnected: connected } = await isConnected();
      if (!connected) {
        setError('Freighter wallet is not installed. Please install it first.');
        setLoading(false);
        return;
      }

      // Request access and get public key
      const { address, error: accessError } = await requestAccess();
      
      if (accessError) {
        setError(`Connection failed: ${accessError}`);
        setLoading(false);
        return;
      }

      if (address) {
        // Save wallet address to localStorage
        localStorage.setItem('walletAddress', address);
        setWalletConnected(true);
        
        // Redirect to main page
        router.push('/main');
      }
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError('Failed to connect wallet. Please try again.');
    }

    setLoading(false);
  };

  const disconnect = () => {
    localStorage.removeItem('walletAddress');
    setWalletConnected(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {/* Logo/Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">🔗 HopeChain</h1>
          <p className="text-gray-600">Simple Donation dApp on Stellar</p>
        </div>

        {/* Connection Status */}
        {walletConnected && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">✅ Wallet Connected</p>
            <p className="text-green-600 text-sm mt-1">
              {localStorage.getItem('walletAddress')?.slice(0, 8)}...
              {localStorage.getItem('walletAddress')?.slice(-8)}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Connect Button */}
        {!walletConnected ? (
          <button
            onClick={connectWallet}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              '🚀 Connect Freighter Wallet'
            )}
          </button>
        ) : (
          <div className="space-y-4">
            <button
              onClick={() => router.push('/main')}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200"
            >
              💫 Go to Donation App
            </button>
            <button
              onClick={disconnect}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
            >
              Disconnect Wallet
            </button>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>🔸 Requires Freighter Wallet extension</p>
          <p>🔸 Uses Stellar Testnet</p>
        </div>
      </div>
    </div>
  );
}
