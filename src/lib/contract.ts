import * as StellarSdk from '@stellar/stellar-sdk';
import { signTransaction } from '@stellar/freighter-api';

// Contract configuration
export const CONTRACT_ID = 'CASELEFWAMO6QUBDRPD2HUV6JQ4MB7TERSJTCBLLW7MCEQ7MP3FOIGSU'; // Deployed on Stellar Testnet
export const HORIZON_URL = 'https://horizon-testnet.stellar.org';

// Initialize server
const horizonServer = new StellarSdk.Horizon.Server(HORIZON_URL);

/**
 * Get total donated amount from contract
 */
export async function getTotalDonated(): Promise<number> {
  try {
    // For demo purposes, return mock data
    // In production, this would call the actual contract
    return Math.floor(Math.random() * 1000) + 100;
  } catch (error) {
    console.error('Error getting total donated:', error);
    return 0;
  }
}

/**
 * Get last donor address from contract
 */
export async function getLastDonor(): Promise<string | null> {
  try {
    // For demo purposes, return mock data
    // In production, this would call the actual contract
    const mockAddresses = [
      'GABC123XYZ789DEF456GHI789JKL012MNO345PQR678STU901VWX234YZ9',
      'GDEF456ABC789GHI012JKL345MNO678PQR901STU234VWX567YZ890ABC3',
      null
    ];
    return mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
  } catch (error) {
    console.error('Error getting last donor:', error);
    return null;
  }
}

/**
 * Make a donation (simplified for demo)
 */
export async function makeDonation(
  userAddress: string,
  recipientAddress: string,
  amount: string
): Promise<any> {
  try {
    // Create a simple payment transaction for demo
    const sourceAccount = await horizonServer.loadAccount(userAddress);
    
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET,
    })
      .addOperation(
        StellarSdk.Operation.payment({
          destination: recipientAddress,
          asset: StellarSdk.Asset.native(),
          amount: amount,
        })
      )
      .setTimeout(300)
      .build();

    // Convert to XDR for signing
    const transactionXDR = transaction.toXDR();

    // Sign with Freighter
    const { signedTxXdr } = await signTransaction(transactionXDR, {
      networkPassphrase: StellarSdk.Networks.TESTNET,
      address: userAddress,
    });

    // Submit to network
    const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
      signedTxXdr,
      StellarSdk.Networks.TESTNET
    );

    const result = await horizonServer.submitTransaction(signedTransaction);
    return result;
  } catch (error) {
    console.error('Error making donation:', error);
    throw error;
  }
}
