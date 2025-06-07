# 🧠 FinCortex - Zombie Resource Analyzer

> A multi-agent, AI-driven system for detecting and managing idle GCP resources

## 📦 Repository Structure

```
FinCortex-Mono/
├── frontend/         # React-based UI (Vite + TypeScript)
├── services/         # FastAPI backend & Cloud Run jobs
│   ├── backend/
│   └── jobs/
├── agents/           # Agent ADK and agent implementations
├── infrastructure/   # Terraform IaC for GCP
├── cicd/             # CI/CD scripts or docs
├── docs/             # Project documentation
└── .github/          # GitHub workflows, issue/PR templates
```

---

## 🗺️ System Architecture

### Application Flow

```mermaid
flowchart LR
  %% Node styles
  classDef user fill:#E3F2FD,stroke:#1976D2,stroke-width:2px,color:#1976D2;
  classDef frontend fill:#E8F5E9,stroke:#388E3C,stroke-width:2px,color:#388E3C;
  classDef backend fill:#FFFDE7,stroke:#FBC02D,stroke-width:2px,color:#FBC02D;
  classDef agent fill:#F3E5F5,stroke:#8E24AA,stroke-width:2px,color:#8E24AA;
  classDef gcp fill:#FBE9E7,stroke:#D84315,stroke-width:2px,color:#D84315;
  classDef infra fill:#ECEFF1,stroke:#455A64,stroke-width:2px,color:#455A64;
  classDef cicd fill:#E1F5FE,stroke:#0288D1,stroke-width:2px,color:#0288D1;

  U1["User / Admin / Operator"]:::user --> F1["Frontend Dashboard UI"]:::frontend
  F1 --> F2["Filters, Charts, Actions"]:::frontend
  F1 -->|"API Calls"| B1["API Gateway"]:::backend
  B1 -->|"Triggers"| B2["Zombie Detection Agents"]:::agent
  B2 -->|"Scans"| G1["GCP Resources (VMs, GKE, SQL, Storage)"]:::gcp
  B2 -->|"Reads Metrics"| G2["Cloud Monitoring"]:::gcp
  B2 -->|"Finds Zombies"| B3["Resource Manager"]:::agent
  B3 -->|"Returns Data"| B1
  B1 -->|"Responds"| F1

  %% Infrastructure and CI/CD
  subgraph Infra [Infrastructure]
    I1["Provision GCP Infra"]:::infra
    I2["Deploy Services"]:::infra
    I3["Configure IAM & WIF"]:::infra
  end
  I1 --> G1
  I2 --> B1
  I3 --> G1

  subgraph CICD [CI/CD]
    C1["Build & Test"]:::cicd
    C2["Deploy Frontend"]:::cicd
    C3["Deploy Services"]:::cicd
    C4["Deploy Infra"]:::cicd
  end
  C1 --> C2
  C1 --> C3
  C1 --> C4
  C2 --> F1
  C3 --> B1
  C4 --> I1
```

---

### CI/CD Pipeline Flow

```mermaid
flowchart LR
  classDef repo fill:#E3F2FD,stroke:#1976D2,stroke-width:2px,color:#1976D2;
  classDef workflow fill:#FFFDE7,stroke:#FBC02D,stroke-width:2px,color:#FBC02D;
  classDef deploy fill:#E8F5E9,stroke:#388E3C,stroke-width:2px,color:#388E3C;

  GH["GitHub Repo"]:::repo --> WF1["frontend.yml"]:::workflow
  GH --> WF2["services.yml"]:::workflow
  GH --> WF3["infrastructure.yml"]:::workflow
  GH --> WF4["cloudrun-jobs.yml"]:::workflow

  WF1 --> FE["Frontend Cloud Host"]:::deploy
  WF2 --> BE["Backend/API Cloud Run"]:::deploy
  WF3 --> INFRA["GCP Infra"]:::deploy
  WF4 --> JOBS["Cloud Run Jobs"]:::deploy
```

---

## 🚀 Quick Start

### Frontend
```bash
cd frontend
pnpm install
pnpm dev
```

### Services
```bash
cd services
# Setup instructions coming soon
```

### Infrastructure
```bash
cd infrastructure
# Terraform setup instructions coming soon
```

## 📝 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Services Documentation](./services/README.md)
- [Infrastructure Documentation](./infrastructure/README.md)
- [CI/CD Documentation](./cicd/README.md)

## 🤝 Contributing
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## 📜 License
MIT © 2025 Vaibhav Shukla & FinCortex Team