#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Symbol, symbol_short};

// Storage keys for persistent data
#[contracttype]
pub enum DataKey {
    TotalDonated,
    LastDonor,
}

#[contract]
pub struct DonationContract;

#[contractimpl]
impl DonationContract {
    /// Make a donation from the caller to a recipient
    /// Saves the donor address and updates total donated amount
    pub fn donate(env: Env, caller: Address, recipient: Address, amount: u32) -> u32 {
        // Verify caller authorization
        caller.require_auth();
        
        // Get current total donated amount (default to 0 if not set)
        let current_total: u32 = env.storage().persistent()
            .get(&DataKey::TotalDonated)
            .unwrap_or(0);
        
        // Add new donation to total
        let new_total = current_total + amount;
        
        // Update persistent storage
        env.storage().persistent().set(&DataKey::TotalDonated, &new_total);
        env.storage().persistent().set(&DataKey::LastDonor, &caller);
        
        // Return new total
        new_total
    }
    
    /// Get the total amount donated so far
    pub fn get_total_donated(env: Env) -> u32 {
        env.storage().persistent()
            .get(&DataKey::TotalDonated)
            .unwrap_or(0)
    }
    
    /// Get the address of the last person who made a donation
    pub fn get_last_donor(env: Env) -> Option<Address> {
        env.storage().persistent()
            .get(&DataKey::LastDonor)
    }
}
