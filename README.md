# 🧠 FinCortex - Zombie Resource Analyzer

> A multi-agent, AI-driven system for detecting and managing idle GCP resources

## 📦 Repository Structure

```
FinCortex-Mono/
├── frontend/           # React-based UI (Vite + TypeScript)
├── services/           # Cloud Functions & ADK Agents
├── infrastructure/    # Terraform IaC for GCP
├── cicd/             # GitHub Actions workflows
└── docs/             # Project documentation
```

---

## 🗺️ System Architecture

### Application Flow

```mermaid
flowchart TD
    subgraph User
      U1[User<br>Admin/Operator]
    end

    subgraph Frontend [Frontend (React)]
      F1[Dashboard UI]
      F2[Filters, Charts, Actions]
    end

    subgraph Services [Services (Cloud Run/Functions)]
      B1[API Gateway]
      B2[Zombie Detection Agents]
      B3[Resource Manager]
    end

    subgraph GCP [Google Cloud Platform]
      G1[GCP Resources<br>(VMs, GKE, SQL, Storage)]
      G2[Cloud Monitoring]
    end

    subgraph Infra [Infrastructure (Terraform)]
      I1[Provision GCP Infra]
      I2[Deploy Services]
      I3[Configure IAM & WIF]
    end

    subgraph CI_CD [CI/CD (GitHub Actions)]
      C1[Build & Test]
      C2[Deploy Frontend]
      C3[Deploy Services]
      C4[Deploy Infra]
    end

    U1 -->|Uses| F1
    F1 -->|API Calls| B1
    F2 --> F1
    B1 -->|Triggers| B2
    B2 -->|Scans| G1
    B2 -->|Reads Metrics| G2
    B2 -->|Finds Zombies| B3
    B3 -->|Returns Data| B1
    B1 -->|Responds| F1

    Infra -->|Managed by| I1
    I1 -->|Creates| G1
    I2 -->|Deploys| Services
    I3 -->|Sets up| GCP

    CI_CD -->|Runs on PR/Push| C1
    C1 -->|Builds| C2
    C1 -->|Builds| C3
    C1 -->|Builds| C4
    C2 -->|Deploys| Frontend
    C3 -->|Deploys| Services
    C4 -->|Deploys| Infra
```

---

### CI/CD Pipeline Flow

```mermaid
flowchart LR
    subgraph GitHub
      GH[GitHub Repo]
      WF1[frontend.yml]
      WF2[services.yml]
      WF3[infrastructure.yml]
      WF4[cloudrun-jobs.yml]
    end

    GH --> WF1
    GH --> WF2
    GH --> WF3
    GH --> WF4

    WF1 -->|Build & Deploy| FE[Frontend (Cloud Host)]
    WF2 -->|Build & Deploy| BE[Services (Cloud Run)]
    WF3 -->|Provision| GCP[GCP Infra]
    WF4 -->|Deploy| JOBS[Cloud Run Jobs]
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