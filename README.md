# Agend.ar

Modular backend system for appointment scheduling, developed with **Node.js + TypeScript**, following **Hexagonal Architecture (Ports & Adapters)** and **DDD** principles.
Supports **REST API**, **WebSockets**, **Webhooks**, and runs in **Docker**.

## 🚀 Features

- Multi-tenant: multiple companies and branches.
- Configurable services and resources (capacity, availability, dependencies).
- Scalable, decoupled architecture (no dependency on specific frameworks or databases).
- **Health** endpoints (`/health/live`, `/health/ready`).
- Development-ready setup with **PNPM workspaces**, **ESLint**, **Prettier**, and **EditorConfig**.

## 📂 Structure

```
apps/           # Entrypoints and inbound adapters (e.g., HTTP API)
packages/       # Business logic, application layer, and outbound adapters
  application/
  domain/
  adapters/
  shared/
config/         # Configuration files and .env.example
```

## 🛠 Requirements

- Node.js >= 20.18
- pnpm >= 8

## 📦 Installation

```bash
pnpm install
```

## 🧑‍💻 Development

```bash
pnpm dev
```

Server available at: `http://localhost:3000`

## 🏗 Build & Production

```bash
pnpm build
pnpm start
```

## 📄 License

AGPL-3.0-or-later
