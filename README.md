# Quest Engine - Flow Charts & Architecture

## 🎯 Quest Engine Complete Flow Charts

---

## 📊 Main Quest System Flow

```mermaid
flowchart TD
    A[🏢 Company Creates Quest Campaign] --> B[depositBudget]
    B --> C{Budget >= MIN_BUDGET?}
    C -->|No| D[❌ Revert: Budget too low]
    C -->|Yes| E[✅ Store Budget in Contract]
    E --> F[📡 Emit BudgetDeposited Event]
    
    F --> G[🌐 Frontend: Display Available Quests]
    G --> H[👤 User Sees Quest List]
    H --> I[🎯 User Selects Quest]
    I --> J[📱 User Completes Quest Actions]
    
    J --> K[🔍 Frontend/Backend Validation]
    K --> L{Quest Completed Successfully?}
    
    L -->|No| M[❌ Quest Failed - No Reward]
    L -->|Yes| N[✅ Quest Verified]
    
    N --> O[💰 payReward Function Called]
    O --> P{Contract has enough balance?}
    P -->|No| Q[❌ Revert: Insufficient funds]
    P -->|Yes| R[💸 Transfer ETH to User]
    R --> S[📡 Emit RewardPaid Event]
    
    S --> T[🎉 Quest Complete - User Rewarded]

    style A fill:#e1f5fe
    style E fill:#c8e6c9
    style N fill:#fff3e0
    style R fill:#f3e5f5
    style T fill:#e8f5e8
```

---

## 🔄 Detailed Function Flow

```mermaid
flowchart LR
    subgraph Budget["💰 Budget Management"]
        A1[depositBudget] --> A2[Validate MIN_BUDGET]
        A2 --> A3[Check msg.value == budgetAmount]
        A3 --> A4[Update Contract Balance]
        A4 --> A5[Emit BudgetDeposited]
    end
    
    subgraph Validation["🔍 Quest Validation"]
        B1[User Completes Quest] --> B2[Frontend Validation]
        B2 --> B3[Backend API Check]
        B3 --> B4{Quest Rules Met?}
        B4 -->|Yes| B5[Mark as Verified]
        B4 -->|No| B6[Mark as Failed]
    end
    
    subgraph Payment["💸 Reward Payment"]
        C1[payReward Called] --> C2[onlyOwner Check]
        C2 --> C3[Validate Participant Address]
        C3 --> C4[Check Reward Amount <= MAX_REWARD]
        C4 --> C5[Check Contract Balance]
        C5 --> C6[Transfer ETH]
        C6 --> C7[Emit RewardPaid]
    end

    Budget --> Validation
    Validation --> Payment

    style Budget fill:#e8f5e8
    style Validation fill:#fff3e0
    style Payment fill:#e1f5fe
```

---

## 🛡️ Security & Access Control Flow

```mermaid
flowchart TD
    subgraph Security["🔒 Security Checks"]
        D1[Function Call] --> D2[ReentrancyGuard Check]
        D2 --> D3{Reentrancy?}
        D3 -->|Yes| D4[❌ Revert: ReentrancyGuard]
        D3 -->|No| D5[✅ Continue Execution]
        
        D5 --> D6[Input Validation]
        D6 --> D7{Valid Input?}
        D7 -->|No| D8[❌ Revert with Error]
        D7 -->|Yes| D9[✅ Execute Function]
    end
    
    subgraph Access["👑 Access Control"]
        E1[payReward Call] --> E2{msg.sender == owner?}
        E2 -->|No| E3[❌ Revert: Only owner]
        E2 -->|Yes| E4[✅ Allow Payment]
        
        E5[depositBudget Call] --> E6[✅ Anyone Can Deposit]
    end

    style Security fill:#ffebee
    style Access fill:#fff8e1
```

---

## 📱 Frontend Integration Flow

```mermaid
sequenceDiagram
    participant C as 🏢 Company
    participant SC as 📜 Smart Contract
    participant FE as 💻 Frontend
    participant U as 👤 User
    participant API as 🔗 External APIs
    participant W as 💼 User Wallet
    
    Note over C,W: Campaign Setup Phase
    C->>SC: depositBudget(5 ETH)
    SC->>SC: Store budget
    SC->>FE: BudgetDeposited event
    FE->>FE: Update available budget display
    
    Note over C,W: Quest Discovery Phase
    U->>FE: Browse available quests
    FE->>FE: Display mock quest list
    U->>FE: Select quest (Twitter follow)
    
    Note over C,W: Quest Execution Phase
    U->>API: Follow Twitter account
    U->>FE: Submit quest completion
    FE->>API: Verify Twitter follow
    API->>FE: Return verification result
    
    Note over C,W: Reward Payment Phase
    alt Quest Verified Successfully
        FE->>SC: payReward(userAddress, 0.1 ETH, "twitter-follow-001")
        SC->>W: Transfer 0.1 ETH
        SC->>FE: RewardPaid event
        FE->>U: Display success message
    else Quest Verification Failed
        FE->>U: Display failure message
        Note over FE,U: No payment made
    end
```

---

## 🎯 Quest Types Architecture

```mermaid
flowchart TD
    subgraph Social["📱 Social Media Quests"]
        S1[Twitter Quests]
        S2[Instagram Quests]
        S3[YouTube Quests]
        S4[TikTok Quests]
        
        S1 --> S1A[Follow Account]
        S1 --> S1B[Repost Content]
        S1 --> S1C[Tag Friends]
        
        S2 --> S2A[Follow Profile]
        S2 --> S2B[Like Posts]
        S2 --> S2C[Share Stories]
        
        S3 --> S3A[Subscribe Channel]
        S3 --> S3B[Like Video]
        S3 --> S3C[Comment]
    end
    
    subgraph Custom["🎨 Custom Quests"]
        C1[Website Actions]
        C2[App Downloads]
        C3[Survey Completion]
        C4[Newsletter Signup]
        
        C1 --> C1A[Visit Website]
        C1 --> C1B[Create Account]
        C1 --> C1C[Make Purchase]
        
        C2 --> C2A[Download App]
        C2 --> C2B[Open App]
        C2 --> C2C[Complete Tutorial]
    end
    
    subgraph Validation["🔍 Validation Methods"]
        V1[API Integration]
        V2[Manual Verification]
        V3[Blockchain Verification]
        V4[Screenshot Proof]
    end

    Social --> Validation
    Custom --> Validation

    style Social fill:#e3f2fd
    style Custom fill:#f3e5f5
    style Validation fill:#e8f5e8
```

---

## 💰 Payment & Reward Flow

```mermaid
flowchart TD
    subgraph Rewards["🎁 Reward Types"]
        R1[Fixed Amount Rewards]
        R2[Tiered Rewards]
        R3[Bonus Multipliers]
        R4[Achievement Rewards]
        
        R1 --> R1A["0.05 ETH for Follow"]
        R1 --> R1B["0.1 ETH for Repost"]
        
        R2 --> R2A["Bronze: 0.05 ETH"]
        R2 --> R2B["Silver: 0.1 ETH"]
        R2 --> R2C["Gold: 0.2 ETH"]
        
        R3 --> R3A["First 100 users: 2x"]
        R3 --> R3B["Weekend bonus: 1.5x"]
    end
    
    subgraph Payment["💸 Payment Processing"]
        P1[Quest Verification] --> P2[Calculate Reward]
        P2 --> P3[Check Contract Balance]
        P3 --> P4{Sufficient Balance?}
        P4 -->|Yes| P5[Execute Payment]
        P4 -->|No| P6[Queue for Later]
        
        P5 --> P7[Update User Balance]
        P5 --> P8[Emit Event]
        P5 --> P9[Update Analytics]
    end

    Rewards --> Payment

    style Rewards fill:#fff3e0
    style Payment fill:#e1f5fe
```

---

## 🌐 Multi-Platform Quest Architecture

```mermaid
flowchart LR
    subgraph Platforms["📱 Social Platforms"]
        direction TB
        P1[Twitter API]
        P2[Instagram API]
        P3[YouTube API]
        P4[TikTok API]
        P5[LinkedIn API]
    end
    
    subgraph Validation["🔍 Validation Layer"]
        direction TB
        V1[API Validator]
        V2[Manual Reviewer]
        V3[AI Checker]
        V4[Community Voting]
    end
    
    subgraph Contract["📜 Smart Contract"]
        direction TB
        C1[Budget Pool]
        C2[Payment Engine]
        C3[Event Logger]
    end
    
    subgraph Analytics["📊 Analytics"]
        direction TB
        A1[Quest Completion Rates]
        A2[Reward Distribution]
        A3[User Engagement]
        A4[ROI Tracking]
    end

    Platforms --> Validation
    Validation --> Contract
    Contract --> Analytics

    style Platforms fill:#e3f2fd
    style Validation fill:#e8f5e8
    style Contract fill:#fff3e0
    style Analytics fill:#f3e5f5
```

---

## 🔄 Quest Lifecycle Management

```mermaid
stateDiagram-v2
    [*] --> Created: Company creates quest
    Created --> Active: Budget deposited
    Active --> InProgress: User starts quest
    InProgress --> Submitted: User submits proof
    Submitted --> Verifying: Automated/manual check
    
    Verifying --> Approved: Verification successful
    Verifying --> Rejected: Verification failed
    
    Approved --> Paid: Reward transferred
    Rejected --> Failed: No reward given
    
    Paid --> [*]: Quest complete
    Failed --> [*]: Quest failed
    
    Active --> Paused: Company pauses
    Paused --> Active: Company resumes
    Paused --> Cancelled: Company cancels
    Cancelled --> [*]: Quest ended
    
    note right of Approved: payReward() called
    note right of Rejected: No contract interaction
```

---

## 🏗️ System Architecture Overview

```mermaid
C4Context
    title Quest Engine System Architecture
    
    Person(user, "Quest User", "Completes social media quests for rewards")
    Person(company, "Company", "Creates quest campaigns and deposits budgets")
    
    System_Boundary(quest_system, "Quest Engine System") {
        System(frontend, "Frontend App", "Quest discovery, completion tracking, reward claims")
        System(backend, "Backend API", "Quest validation, user management, analytics")
        System(smart_contract, "Smart Contract", "Budget storage, reward payments, event logging")
    }
    
    System_Ext(social_apis, "Social Media APIs", "Twitter, Instagram, YouTube validation")
    System_Ext(blockchain, "Ethereum Network", "Transaction processing, event storage")
    System_Ext(wallet, "User Wallets", "MetaMask, WalletConnect")
    
    Rel(user, frontend, "Browses quests, submits completions")
    Rel(company, frontend, "Creates campaigns, monitors performance")
    Rel(frontend, backend, "API calls for validation")
    Rel(backend, social_apis, "Verify quest completions")
    Rel(frontend, smart_contract, "Budget deposits, reward payments")
    Rel(smart_contract, blockchain, "Store transactions")
    Rel(user, wallet, "Receive ETH rewards")
```

---

## 🧪 Testing Flow Architecture

```mermaid
flowchart TD
    subgraph Unit["🔬 Unit Tests"]
        U1[Contract Function Tests]
        U2[Event Emission Tests]
        U3[Access Control Tests]
        U4[Edge Case Tests]
        
        U1 --> U1A[depositBudget Success]
        U1 --> U1B[payReward Success]
        U1 --> U1C[getContractBalance]
        
        U2 --> U2A[BudgetDeposited Event]
        U2 --> U2B[RewardPaid Event]
        
        U3 --> U3A[onlyOwner Modifier]
        U3 --> U3B[ReentrancyGuard]
        
        U4 --> U4A[Insufficient Balance]
        U4 --> U4B[Invalid Address]
        U4 --> U4C[Amount Too Low]
    end
    
    subgraph Integration["🔗 Integration Tests"]
        I1[Frontend-Contract Integration]
        I2[Multi-Quest Scenarios]
        I3[High Volume Testing]
        I4[Gas Optimization Tests]
        
        I1 --> I1A[MetaMask Connection]
        I1 --> I1B[Event Listening]
        
        I2 --> I2A[Multiple Users]
        I2 --> I2B[Concurrent Quests]
        
        I3 --> I3A[1000+ Users]
        I3 --> I3B[Batch Payments]
    end

    Unit --> Integration

    style Unit fill:#e8f5e8
    style Integration fill:#e1f5fe
```

---

## 📈 Analytics & Monitoring Flow

```mermaid
flowchart LR
    subgraph Events["📡 Smart Contract Events"]
        E1[BudgetDeposited]
        E2[RewardPaid]
        
        E1 --> E1A[Company Address]
        E1 --> E1B[Amount Deposited]
        E1 --> E1C[Timestamp]
        
        E2 --> E2A[User Address]
        E2 --> E2B[Reward Amount]
        E2 --> E2C[Quest ID]
    end
    
    subgraph Processing["⚙️ Data Processing"]
        P1[Event Indexer]
        P2[Data Aggregator]
        P3[Analytics Engine]
        
        P1 --> P2
        P2 --> P3
    end
    
    subgraph Dashboard["📊 Analytics Dashboard"]
        D1[Total Budget Deposited]
        D2[Rewards Distributed]
        D3[Quest Completion Rates]
        D4[User Engagement Metrics]
        D5[ROI Calculations]
    end

    Events --> Processing
    Processing --> Dashboard

    style Events fill:#e3f2fd
    style Processing fill:#fff3e0
    style Dashboard fill:#f3e5f5
```

---

## 🚨 Error Handling & Recovery Flow

```mermaid
flowchart TD
    subgraph Errors["⚠️ Error Types"]
        E1[Contract Errors]
        E2[Network Errors]
        E3[Validation Errors]
        E4[User Errors]
        
        E1 --> E1A["Insufficient Balance"]
        E1 --> E1B["Only Owner"]
        E1 --> E1C["Reentrancy Guard"]
        
        E2 --> E2A["Gas Too Low"]
        E2 --> E2B["Network Congestion"]
        E2 --> E2C["RPC Timeout"]
        
        E3 --> E3A["Quest Not Completed"]
        E3 --> E3B["Invalid Proof"]
        E3 --> E3C["API Verification Failed"]
        
        E4 --> E4A["Wrong Wallet"]
        E4 --> E4B["Insufficient ETH for Gas"]
    end
    
    subgraph Recovery["🔄 Recovery Strategies"]
        R1[Retry Mechanism]
        R2[Fallback Options]
        R3[Manual Override]
        R4[User Notification]
        
        R1 --> R1A["Auto Retry 3x"]
        R1 --> R1B["Exponential Backoff"]
        
        R2 --> R2A["Alternative RPC"]
        R2 --> R2B["Queue for Later"]
        
        R3 --> R3A["Admin Panel"]
        R3 --> R3B["Manual Payment"]
        
        R4 --> R4A["Error Message"]
        R4 --> R4B["Support Contact"]
    end

    Errors --> Recovery

    style Errors fill:#ffebee
    style Recovery fill:#e8f5e8
```

---

## 🎯 Quest Campaign Management Flow

```mermaid
flowchart TD
    subgraph Campaign["🏗️ Campaign Lifecycle"]
        C1[Planning] --> C2[Budget Allocation]
        C2 --> C3[Quest Design]
        C3 --> C4[Contract Deployment]
        C4 --> C5[Budget Deposit]
        C5 --> C6[Campaign Launch]
        C6 --> C7[User Participation]
        C7 --> C8[Reward Distribution]
        C8 --> C9[Analytics Review]
        C9 --> C10[Campaign End]
    end
    
    subgraph Management["📋 Management Tools"]
        M1[Budget Tracking]
        M2[Quest Performance]
        M3[User Analytics]
        M4[Fraud Detection]
        
        M1 --> M1A[Remaining Budget]
        M1 --> M1B[Burn Rate]
        
        M2 --> M2A[Completion Rate]
        M2 --> M2B[Time to Complete]
        
        M3 --> M3A[New vs Return Users]
        M3 --> M3B[Geographic Distribution]
        
        M4 --> M4A[Duplicate Submissions]
        M4 --> M4B[Bot Detection]
    end

    Campaign -.-> Management

    style Campaign fill:#e1f5fe
    style Management fill:#fff3e0
```

Bu flow chart'lar Quest Engine'in tüm aspect'lerini kapsar:

- **Ana sistem akışı**
- **Fonksiyon detayları** 
- **Güvenlik kontrolleri**
- **Frontend entegrasyonu**
- **Quest türleri ve validasyon**
- **Ödeme süreçleri**
- **Test mimarisi**
- **Analytics ve monitoring**
- **Hata yönetimi**
- **Kampanya yönetimi**

Her chart farklı bir bakış açısı sunar ve entegrasyon sırasında referans olarak kullanılabilir! 🚀
