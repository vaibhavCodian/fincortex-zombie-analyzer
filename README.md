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
flowchart TD
  U1([User / Admin / Operator])
  F1([Frontend Dashboard UI])
  F2([Filters, Charts, Actions])
  B1([API Gateway])
  B2([Zombie Detection Agents])
  B3([Resource Manager])
  G1([GCP Resources: VMs, GKE, SQL, Storage])
  G2([Cloud Monitoring])
  I1([Provision GCP Infra])
  I2([Deploy Services])
  I3([Configure IAM & WIF])
  C1([Build & Test])
  C2([Deploy Frontend])
  C3([Deploy Services])
  C4([Deploy Infra])

  U1 -->|Uses| F1
  F1 -->|API Calls| B1
  F2 --> F1
  B1 -->|Triggers| B2
  B2 -->|Scans| G1
  B2 -->|Reads Metrics| G2
  B2 -->|Finds Zombies| B3
  B3 -->|Returns Data| B1
  B1 -->|Responds| F1

  I1 -->|Creates| G1
  I2 -->|Deploys| B1
  I3 -->|Sets up| G1

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
flowchart TD
  GH([GitHub Repo])
  WF1([frontend.yml])
  WF2([services.yml])
  WF3([infrastructure.yml])
  WF4([cloudrun-jobs.yml])
  FE([Frontend (Cloud Host)])
  BE([Backend/API (Cloud Run)])
  INFRA([GCP Infra])
  JOBS([Cloud Run Jobs])

  GH --> WF1
  GH --> WF2
  GH --> WF3
  GH --> WF4

  WF1 --> FE
  WF2 --> BE
  WF3 --> INFRA
  WF4 --> JOBS
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