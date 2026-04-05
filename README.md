<div align="center">

```
████████╗██████╗ ██╗██████╗ ████████╗██████╗ ██╗██████╗ ███████╗
╚══██╔══╝██╔══██╗██║██╔══██╗╚══██╔══╝██╔══██╗██║██╔══██╗██╔════╝
   ██║   ██████╔╝██║██████╔╝   ██║   ██████╔╝██║██████╔╝█████╗  
   ██║   ██╔══██╗██║██╔═══╝    ██║   ██╔══██╗██║██╔══██╗██╔══╝  
   ██║   ██║  ██║██║██║        ██║   ██║  ██║██║██████╔╝███████╗
   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝        ╚═╝   ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝
```

**The Social Platform for Explorers — Plan Together, Travel Better**

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Microservices-007ACC?style=flat-square)](https://microservices.io/)
[![Gateway](https://img.shields.io/badge/Gateway-Ocelot-orange?style=flat-square)](https://ocelot.readthedocs.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=flat-square)]()

</div>

---

## What is TripTribe?

TripTribe is a **travel social network** where exploration is a team sport. You don't just document your trips — you build them collaboratively, share them with the world, and grow as an explorer through every journey.

At its core, TripTribe lets you:

- **Post trip plans** — not just memories, but structured, forkable, shareable itineraries
- **React & contribute** — comment, rate, and actively improve others' plans
- **Fork & remix** — take someone's Tokyo itinerary and adapt it to your own pace and budget
- **Find your tribe** — connect with travelers heading to the same destination on the same day
- **Hire local guides** — vetted, community-rated insiders who know the city like no app ever could
- **Earn your rank** — a multi-category rewards system turns exploration into progression

---

## Core Feature Areas

### 🗺️ Trip Plans & Social Layer

Trip plans are the atomic unit of TripTribe. Each plan is a structured, versioned document — not just a note, but a living itinerary that the community can engage with.

| Action | Description |
|--------|-------------|
| **Post** | Publish a structured trip plan with destinations, dates, activities, and tips |
| **React** | Emoji reactions and qualitative ratings on individual plan elements |
| **Comment** | Threaded discussions within a plan's context |
| **Fork** | Clone any plan and create your own version — full change tracking maintained |
| **Contribute** | Suggest edits to an existing plan; the owner can accept or reject |
| **Rate** | Star-based rating system for completed plans, weighted by contributor expertise |

> **Proposed Enhancement:** Plans could include a "confidence score" — a community-driven metric combining rating count, fork count, and contributor diversity. High-confidence plans surface in recommendations.

---

### 🏆 Reward & Rank System

TripTribe features three independent progression tracks. Each track has its own **titles**, **stages**, and **real-world perks** in the form of hotel and flight discounts unlocked at milestone stages.

#### Progression Tracks

```
POSTER TRACK              REACTOR TRACK             CONTRIBUTOR TRACK
─────────────────         ─────────────────         ─────────────────
Stage 1 · Dreamer         Stage 1 · Observer        Stage 1 · Helper
Stage 2 · Planner         Stage 2 · Enthusiast      Stage 2 · Editor
Stage 3 · Trailblazer     Stage 3 · Critic          Stage 3 · Co-author
Stage 4 · Cartographer    Stage 4 · Curator          Stage 4 · Architect
Stage 5 · Legend          Stage 5 · Tastemaker      Stage 5 · Mastermind
```

Points are accumulated by:

- **Poster Track** — Publishing plans, receiving forks, accumulating plan ratings, plan views
- **Reactor Track** — Reacting to plans, leaving rated comments, engaging with content regularly
- **Contributor Track** — Fork submissions, accepted edits, quality contributions endorsed by plan owners

> **Proposed Enhancement:** A **combined "Explorer Score"** — a composite metric across all three tracks — could unlock a fourth prestige tier with exclusive partnership benefits.

---

### 🌍 World Traveler Plans

TripTribe tracks your real travel history and generates dynamic progression milestones based on it.

- **Country count** — visiting more unique countries unlocks World Traveler tier titles
- **Repeat visits** — visiting the same country multiple times builds **Country Expert** status
- **City depth** — frequent visits to a specific city elevate you to **City Expert**, granting your reviews additional weight and visibility

This creates two exploration philosophies equally rewarded on the platform: the wide collector (100 countries, 1 visit each) and the deep diver (10 countries, true insider knowledge).

| Milestone | Trigger | Benefit |
|-----------|---------|---------|
| Country Curious | 5 countries visited | Unlock Country Expert tracking |
| World Explorer | 25 countries | Featured profile badge |
| Global Citizen | 50 countries | Exclusive partner discounts |
| Country Expert | 3+ visits to same country | Reviews weighted 1.5× |
| City Expert | 5+ visits to same city | "Local Insight" badge on posts |

---

### 🤝 Trip Friend Matching

TripTribe can match you with other travelers in two scenarios:

1. **Same plan, different journey** — travelers following the same (or forked) plan
2. **Same destination, same date** — travelers with overlapping itineraries to a city or country

Matched users can connect, share tips, split guides, or simply know there's a familiar face at the destination. Matching is opt-in per-plan.

> **Proposed Enhancement:** Add a **compatibility filter** — travel style tags (budget, luxury, solo, family, adventure, relaxed) let users opt into matches with aligned preferences rather than just overlapping logistics.

---

### 🧭 Local Guide Marketplace

TripTribe allows locals to register as guides for their city or region. Foreigners who complete a guided experience can rate the guide — ratings are visible, persistent, and affect guide discoverability.

Guide progression is its own track:

- The more sessions a guide completes, the higher their **Guide Rank**
- Rank levels unlock profile prominence, reduced platform fees, and partner certification badges
- **City Expert** status from personal travel boosts a guide's perceived authority in that city

> **Proposed Enhancement:** Allow guides to create **public trip plans** as marketing material — a guide's plan for "48 Hours in Marrakech" becomes both a content post and a booking call-to-action.

---

### 📊 Expertise & Ranking System

Every action on TripTribe feeds into a unified expertise model:

| Activity | Rank Category |
|----------|---------------|
| Posting plans | Poster Rank |
| Reacting to plans | Reactor Rank |
| Contributing / forking | Contributor Rank |
| Guiding sessions completed | Guide Rank |
| Countries visited | World Traveler Rank |
| Repeat country visits | Country Expert Rank |
| Repeat city visits | City Expert Rank |

Each category has multiple **levels within each rank stage**, creating a granular sense of progression. The total system is designed so that every traveler — whether they're a prolific poster, a meticulous contributor, a world wanderer, or a deep local expert — has a meaningful path.

---

## System Architecture

TripTribe is built on a **microservices architecture** following Clean Architecture principles, with CQRS for command/query separation throughout.

### Architecture Overview

```
                         ┌──────────────────────────┐
                         │      Client Apps           │
                         │  (Mobile / Web / PWA)      │
                         └────────────┬───────────────┘
                                      │
                         ┌────────────▼───────────────┐
                         │     API Gateway (Ocelot)    │
                         │       TripTribe-Gateway      │
                         └─────────────┬──────────────┘
                                       │
          ┌──────────┬─────────────────┼─────────────────┬──────────────┐
          │          │                 │                  │              │
   ┌──────▼─┐  ┌─────▼──────┐  ┌──────▼──────┐  ┌───────▼───┐  ┌──────▼──────┐
   │  User  │  │Trip Planning│  │  Story/Social│  │  Booking  │  │Notification │
   │ Service│  │  Service   │  │   Service    │  │  Service  │  │   Service   │
   └────────┘  └────────────┘  └─────────────┘  └───────────┘  └─────────────┘
          │          │                 │                  │              │
   ┌──────▼─┐  ┌─────▼──────┐  ┌──────▼──────┐  ┌───────▼───┐  ┌──────▼──────┐
   │ SQL DB │  │  SQL DB    │  │   SQL DB    │  │  SQL DB   │  │  Message    │
   └────────┘  └────────────┘  └─────────────┘  └───────────┘  │   Broker   │
                                                                 └─────────────┘
                                                  ┌────────────────────────────┐
                                                  │  Recommendation Service    │
                                                  │   (AI / Smart Suggestions) │
                                                  └────────────────────────────┘
                                                  ┌────────────────────────────┐
                                                  │       Media Service        │
                                                  └────────────────────────────┘
```

### Microservices

#### ✅ Implemented

| Service | Description | Status |
|---------|-------------|--------|
| **TripPlanningService** | Core trip plan CRUD, fork management, plan versioning | In Progress |
| **TripTribe-Gateway** | Ocelot-based API gateway, request routing & aggregation | Active |
| **BuildingBlocks** | Shared CQRS interfaces, base handlers, common utilities | Active |

#### 🔜 Planned Services

| Service | Responsibilities |
|---------|-----------------|
| **User Management Service** | Registration, authentication, profiles, traveler stats, expertise tracking, rank computation |
| **Story / Social Service** | Reactions, comments, ratings, activity feed, follower graph |
| **Recommendation Service** | AI-powered plan suggestions, trip friend matching, guide matching, destination recommendations |
| **Booking / Integration Service** | Partner hotel & flight APIs, discount code generation, reward redemption |
| **Notification Service** | Push, email, and in-app notifications for social events and reward milestones |
| **Media Service** | Photo/video upload, CDN management, plan media galleries |

---

## Technology Stack

### Backend

| Technology | Purpose |
|------------|---------|
| **.NET 8.0** | Core runtime |
| **ASP.NET Core Web API** | REST endpoints across all services |
| **Entity Framework Core** | ORM with code-first migrations |
| **Ocelot** | API Gateway — routing, aggregation, rate limiting |
| **MediatR** | CQRS implementation — commands, queries, events |
| **AutoMapper** | DTO ↔ domain model mapping |
| **SQL Server** | Primary relational datastore |
| **Docker** | Containerization and local orchestration |

### Design Patterns

- **Clean Architecture** — strict layer separation (Domain → Application → Infrastructure → API)
- **CQRS** — commands mutate state, queries read from optimized projections
- **Domain Events** — cross-service communication via events for loose coupling
- **Repository Pattern** — abstracted data access within each service boundary

### Proposed Additions

| Technology | Purpose |
|------------|---------|
| **Redis** | Session cache, leaderboard snapshots, rank computation cache |
| **RabbitMQ / Azure Service Bus** | Async inter-service messaging for events and notifications |
| **Elasticsearch** | Full-text plan search, destination indexing |
| **Azure Blob Storage / S3** | Media storage for the Media Service |
| **ML.NET or Azure AI** | Recommendation engine, trip friend compatibility scoring |

---

## Project Structure

```
TripTribe/
├── BuildingBlocks/                  # Shared kernel
│   ├── CQRS/
│   │   ├── ICommand.cs
│   │   ├── IQuery.cs
│   │   ├── ICommandHandler.cs
│   │   └── IQueryHandler.cs
│   └── Common/
│
├── TripTribe-Gateway/               # Ocelot API Gateway
│   ├── ocelot.json
│   └── Program.cs
│
├── TripPlanningService/             # Trip Plans (reference implementation)
│   ├── Api/                         # Controllers, middleware, DI setup
│   ├── Application/                 # Commands, queries, handlers, DTOs, mappers
│   ├── Domain/                      # Entities, value objects, domain events, exceptions
│   └── Infrastructure/             # EF Core, migrations, repositories
│
├── UserManagementService/           # [Planned]
├── StorySocialService/              # [Planned]
├── RecommendationService/           # [Planned]
├── BookingIntegrationService/       # [Planned]
├── NotificationService/             # [Planned]
├── MediaService/                    # [Planned]
│
└── docker-compose.yml
```

---

## Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [SQL Server](https://www.microsoft.com/en-us/sql-server) (or use the Docker Compose setup)

### Run with Docker

```bash
git clone https://github.com/your-org/triptribe.git
cd triptribe
docker-compose up --build
```

### Run Locally

```bash
# Start the Gateway
cd TripTribe-Gateway
dotnet run

# Start the Trip Planning Service
cd TripPlanningService/Api
dotnet run
```

### Apply Migrations

```bash
cd TripPlanningService/Infrastructure
dotnet ef database update
```

The Gateway will be available at `http://localhost:5000`. Individual service Swagger UIs are accessible in development mode on their native ports.

---

## Proposed Feature Enhancements

Beyond the core roadmap, the following features could meaningfully extend the platform:

**Collaborative Planning Rooms** — Real-time multi-user plan editing using SignalR, letting friend groups build an itinerary together simultaneously.

**Plan Templates Marketplace** — Community-curated, parameterized trip templates (e.g. "10 Days in Southeast Asia, ~$50/day Budget") that users can instantiate and personalize.

**Travel Journal** — A post-trip log tied to an executed plan. Journal entries enrich the plan with actual vs. planned comparisons, visible to future forkers.

**Expert AMA Sessions** — City Experts and top-ranked local guides can host scheduled Q&A threads, driving engagement and surfacing niche knowledge.

**Carbon Footprint Tracking** — An opt-in feature that estimates and displays the carbon footprint of a plan's transportation choices, encouraging eco-conscious itinerary design.

**Offline Mode** — Downloaded plan bundles for use without connectivity, critical for destinations with unreliable data coverage.

---

## Contributing

TripTribe is in active development. Contributions are welcome across all service boundaries.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Follow Clean Architecture conventions — no cross-layer imports
4. Ensure all commands and queries go through MediatR handlers
5. Write domain events for anything that other services might need to react to
6. Submit a pull request with a clear description of the change

Please read `CONTRIBUTING.md` for detailed guidelines.

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**TripTribe** · Built with ❤️ by explorers, for explorers

*Every journey starts with a plan. Make it a good one.*

</div>
