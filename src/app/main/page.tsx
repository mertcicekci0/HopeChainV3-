'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAddress } from '@stellar/freighter-api';
import { getTotalDonated, getLastDonor, makeDonation } from '@/lib/contract';

export default function MainPage() {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [totalDonated, setTotalDonated] = useState<number>(0);
  const [lastDonor, setLastDonor] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check wallet connection on page load
    const checkWallet = async () => {
      const savedAddress = localStorage.getItem('walletAddress');
      if (!savedAddress) {
        router.push('/');
        return;
      }

      try {
        const { address } = await getAddress();
        setWalletAddress(address || savedAddress);
        await loadContractData();
      } catch (err) {
        console.error('Failed to get wallet address:', err);
        router.push('/');
      }
    };

    checkWallet();
  }, [router]);

  const loadContractData = async () => {
    try {
      const [total, lastDonor] = await Promise.all([
        getTotalDonated(),
        getLastDonor()
      ]);
      
      setTotalDonated(total);
      setLastDonor(lastDonor || '');
    } catch (err) {
      console.error('Failed to load contract data:', err);
    }
  };

  const handleDonate = async () => {
    if (!donationAmount || !recipientAddress) {
      setError('Please fill in all fields');
      return;
    }

    if (parseFloat(donationAmount) <= 0) {
      setError('Donation amount must be greater than 0');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Make donation using our contract utility
      const result = await makeDonation(walletAddress, recipientAddress, donationAmount);
      
      console.log('Transaction successful:', result);
      
      // Update UI with success
      setSuccess(`Successfully donated ${donationAmount} XLM!`);
      
      // Update stats
      setTotalDonated(prev => prev + parseFloat(donationAmount));
      setLastDonor(walletAddress);
      
      // Clear form
      setDonationAmount('');
      setRecipientAddress('');

    } catch (err: any) {
      console.error('Donation failed:', err);
      setError(`Donation failed: ${err.message || 'Unknown error'}`);
    }

    setLoading(false);
  };

  const disconnect = () => {
    localStorage.removeItem('walletAddress');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">💝 HopeChain</h1>
              <p className="text-gray-600">Make a difference with your donation</p>
            </div>
            <button
              onClick={disconnect}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Disconnect
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm font-medium">Connected Wallet</p>
            <p className="text-blue-600 text-sm">{walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Donated</h3>
            <p className="text-3xl font-bold text-green-600">{totalDonated} XLM</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Last Donor</h3>
            <p className="text-lg font-mono text-purple-600">
              {lastDonor ? `${lastDonor.slice(0, 8)}...${lastDonor.slice(-8)}` : 'None yet'}
            </p>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">💸 Make a Donation</h2>
          
          <div className="space-y-4">
            {/* Donation Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Donation Amount (XLM)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Enter amount in XLM"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Recipient Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recipient Wallet Address
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="G... (Stellar address)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm">{success}</p>
              </div>
            )}

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={loading || !donationAmount || !recipientAddress}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Donation...
                </>
              ) : (
                '❤️ Donate Now'
              )}
            </button>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-700 mb-2">ℹ️ Important Notes</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• This is a testnet transaction (no real funds)</li>
              <li>• Minimum donation: 0.1 XLM</li>
              <li>• Transaction fees apply (~0.00001 XLM)</li>
              <li>• Make sure recipient address is valid</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
