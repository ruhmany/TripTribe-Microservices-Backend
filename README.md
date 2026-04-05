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

- **Post trip plans** — structured, forkable, versioned itineraries with a community confidence score
- **React & contribute** — comment, rate, and actively improve others' plans
- **Fork & remix** — take someone's Tokyo itinerary and adapt it to your own pace and budget
- **Plan in real time** — collaborative planning rooms let friend groups build itineraries together
- **Find your tribe** — smart-matched travelers heading to the same destination on the same day
- **Hire local guides** — vetted, community-rated insiders who publish their own trip plans
- **Earn your rank** — a multi-category progression system with real-world travel perks
- **Track your world** — a living map of everywhere you've been, building expertise as you go
- **Journal your journey** — post-trip logs that enrich plans with ground-truth experience

---

## Core Feature Areas

### 🗺️ Trip Plans & Social Layer

Trip plans are the atomic unit of TripTribe. Each plan is a structured, versioned document — not just a note, but a living itinerary the community can engage with, improve, and fork.

| Action | Description |
|--------|-------------|
| **Post** | Publish a structured trip plan with destinations, dates, activities, and tips |
| **React** | Emoji reactions and qualitative ratings on individual plan elements |
| **Comment** | Threaded discussions within a plan's context |
| **Fork** | Clone any plan and create your own version — full change tracking maintained |
| **Contribute** | Suggest edits to an existing plan; the owner can accept or reject |
| **Rate** | Star-based rating system for completed plans, weighted by contributor expertise |

#### Plan Confidence Score

Every plan carries a **Confidence Score** — a community-driven quality signal computed from:

- Total rating count and average star rating
- Number of times the plan has been forked
- Contributor diversity (how many distinct users have meaningfully improved it)
- Recency of the last accepted contribution

High-confidence plans surface prominently in recommendations and search results. A plan with 200 forks and 50 contributors signals something fundamentally different from a plan with a single 5-star rating from the author's friend.

#### Plan Templates Marketplace

Community-curated, parameterized trip templates let users publish reusable itinerary blueprints — for example, *"10 Days in Southeast Asia, ~$50/day Budget"* or *"72-Hour Layover in Istanbul."* Templates can be instantiated and personalized, lowering the barrier to planning for first-time visitors to a destination.

#### Travel Journal

After completing a trip, users can attach a **Travel Journal** to the plan they followed. Journal entries record actual vs. planned comparisons — what worked, what changed, what surprised. These journals are visible to future forkers, turning a static plan into a living document enriched by real experience over time.

#### Collaborative Planning Rooms

Friend groups can co-build a plan in real time using **Planning Rooms** — a SignalR-powered shared editing space where multiple users can add stops, vote on activities, and negotiate the itinerary simultaneously. Changes stream live, and the final plan saves with full contributor attribution.

---

### 🏆 Reward & Rank System

TripTribe features three independent progression tracks for social engagement. Each track has its own **titles**, **stages**, and **real-world perks** — hotel and flight discounts unlocked at milestone stages.

#### Social Progression Tracks

```
POSTER TRACK              REACTOR TRACK             CONTRIBUTOR TRACK
─────────────────         ─────────────────         ─────────────────
Stage 1 · Dreamer         Stage 1 · Observer        Stage 1 · Helper
Stage 2 · Planner         Stage 2 · Enthusiast      Stage 2 · Editor
Stage 3 · Trailblazer     Stage 3 · Critic          Stage 3 · Co-author
Stage 4 · Cartographer    Stage 4 · Curator         Stage 4 · Architect
Stage 5 · Legend          Stage 5 · Tastemaker      Stage 5 · Mastermind
```

Points accumulate by:

- **Poster Track** — Publishing plans, receiving forks, accumulating plan ratings and views
- **Reactor Track** — Reacting to plans, leaving rated comments, sustained engagement
- **Contributor Track** — Fork submissions, accepted edits, quality contributions endorsed by plan owners

#### Explorer Score — Prestige Tier

Beyond the three individual tracks, TripTribe computes a single **Explorer Score** — a composite metric across Poster, Reactor, and Contributor ranks. Reaching the top of the Explorer Score unlocks a **fourth prestige tier** with exclusive benefits: partner certification, priority placement in recommendation surfaces, and access to limited-run discount programs with airlines and hotel chains.

---

### 🌍 World Traveler Progression

TripTribe tracks your real travel history and generates dynamic progression milestones based on it. Two exploration philosophies are equally rewarded: the wide collector (visiting 80 countries once each) and the deep diver (returning to the same places until they feel like home).

#### Traveler Milestones

| Milestone | Trigger | Benefit |
|-----------|---------|---------|
| Country Curious | 5 countries visited | Unlock Country Expert tracking |
| Wanderer | 15 countries | World map profile feature |
| World Explorer | 25 countries | Featured profile badge |
| Global Citizen | 50 countries | Exclusive partner discounts |
| Century Club | 100 countries | Prestige badge + platform recognition |

#### Country & City Expertise

- **Country Expert** — 3+ visits to the same country. Reviews and plan ratings from that country are weighted 1.5×, and the badge is shown on all content from that destination.
- **City Expert** — 5+ visits to the same city. Grants a *"Local Insight"* badge on posts from that city and elevated discoverability in guide searches.

Expertise is additive: a user who is both a Country Expert in Japan and a City Expert in Kyoto carries compounded authority on content about that destination.

---

### 🤝 Trip Friend Matching

TripTribe matches you with other travelers in two scenarios:

1. **Same plan, different journey** — travelers following the same plan or a fork of it
2. **Same destination, same date** — travelers with overlapping itineraries to a city or country

#### Compatibility Filtering

Matching goes beyond logistics. Users set **travel style tags** on each plan — from a set including Budget, Mid-range, Luxury, Solo, Couple, Family, Adventure, Relaxed, Cultural, Foodie, and Nightlife — and the matching algorithm surfaces travelers with aligned preferences. You won't be matched with a backpacker on a shoestring if you're on a boutique hotel itinerary, unless you opt in.

Matched users can connect, share tips, split guide costs, or simply know there's a familiar face at the destination. Matching is opt-in per-plan and can be paused at any time.

---

### 🧭 Local Guide Marketplace

Locals can register as guides for their city or region. Foreigners who complete a guided experience can rate the guide — ratings are visible, persistent, and directly affect guide discoverability.

#### Guide Progression Track

```
GUIDE TRACK
──────────────────────────
Stage 1 · Local Friend
Stage 2 · Neighborhood Pro
Stage 3 · City Voice
Stage 4 · Cultural Ambassador
Stage 5 · Legendary Host
```

- Each completed session advances the guide's rank
- Higher ranks unlock profile prominence, reduced platform fees, and partner certification badges
- **City Expert** status from personal travel boosts a guide's authority in their home city — a guide who has also explored their own city as a traveler brings a different kind of insight

#### Guide-Published Trip Plans

Guides can publish **public trip plans** as content and as marketing. A guide's plan for *"48 Hours in Marrakech: the insider route"* is simultaneously a high-quality content post, a signal of expertise, and a direct booking call-to-action. Their Guide Rank and City Expert status give these plans elevated visibility in search.

#### Expert AMA Sessions

City Experts and top-ranked guides can host scheduled **Ask Me Anything** threads — structured Q&A sessions tied to a destination or theme. AMAs drive platform engagement, surface niche knowledge that doesn't fit a plan format, and build the guide's public profile between bookings.

---

### 📊 Expertise & Ranking System

Every meaningful action on TripTribe feeds into one or more progression tracks:

| Activity | Rank Category |
|----------|---------------|
| Posting plans | Poster Rank |
| Plans receiving forks | Poster Rank |
| Reacting to plans | Reactor Rank |
| Leaving rated comments | Reactor Rank |
| Contributing accepted edits | Contributor Rank |
| Fork submissions approved | Contributor Rank |
| Guiding sessions completed | Guide Rank |
| Countries visited | World Traveler Rank |
| Repeat country visits | Country Expert Rank |
| Repeat city visits | City Expert Rank |
| Cross-track composite | Explorer Score (Prestige) |

Each category has multiple **levels within each stage**, creating granular progression — users always have a next milestone within reach. The total system is designed so every traveler — prolific poster, meticulous contributor, world wanderer, or deep local expert — has a meaningful and rewarding path forward.

---

### 🌱 Carbon Footprint Tracking

TripTribe includes an opt-in **carbon footprint estimator** per plan. Based on transportation legs (flights, trains, buses, car), each plan displays an estimated CO₂ footprint alongside the itinerary. Users can compare footprint across plan variants and make informed choices. Plans with a low footprint relative to distance can earn a *Sustainable Travel* badge, visible on the plan card in search results.

---

### 📡 Offline Mode

Trip plans can be downloaded as **offline bundles** — a compressed snapshot of the itinerary, maps, guide contacts, and journal entries for use without connectivity. This is critical for destinations with unreliable data coverage, and aligns with how travel actually works: you're often offline exactly when you need the plan most.

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
                         └──────────┬─────────────────┘
                                    │
     ┌──────────┬───────────────────┼──────────────────┬──────────────┐
     │          │                   │                   │              │
┌────▼───┐ ┌────▼────────┐ ┌───────▼──────┐ ┌─────────▼──┐ ┌────────▼─────┐
│  User  │ │Trip Planning│ │ Story/Social  │ │  Booking   │ │Notification  │
│Service │ │  Service    │ │   Service     │ │  Service   │ │  Service     │
└────────┘ └─────────────┘ └──────────────┘ └────────────┘ └──────────────┘
     │          │                   │                   │              │
┌────▼───┐ ┌────▼────────┐ ┌───────▼──────┐ ┌─────────▼──┐ ┌────────▼─────┐
│ SQL DB │ │   SQL DB    │ │    SQL DB     │ │   SQL DB   │ │   Message    │
└────────┘ └─────────────┘ └──────────────┘ └────────────┘ │    Broker    │
                                                             └──────────────┘
                            ┌─────────────────────────────────────────────┐
                            │           Recommendation Service             │
                            │   (AI / Smart Suggestions · ML.NET / Azure) │
                            └─────────────────────────────────────────────┘
                            ┌─────────────────────────────────────────────┐
                            │                Media Service                 │
                            │     (CDN · Blob Storage · Offline Bundles)  │
                            └─────────────────────────────────────────────┘
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
| **User Management Service** | Registration, auth, profiles, traveler stats, expertise tracking, rank computation, Explorer Score |
| **Story / Social Service** | Reactions, comments, ratings, activity feed, follower graph, AMA sessions, Planning Rooms (SignalR) |
| **Recommendation Service** | AI plan suggestions, trip friend matching with compatibility scoring, guide matching, destination recommendations, confidence score computation |
| **Booking / Integration Service** | Partner hotel & flight APIs, discount code generation, reward redemption, carbon footprint estimation |
| **Notification Service** | Push, email, and in-app notifications for social events, rank milestones, match alerts, AMA reminders |
| **Media Service** | Photo/video upload, CDN management, plan media galleries, offline bundle generation |

---

## Technology Stack

### Backend (Current)

| Technology | Purpose |
|------------|---------|
| **.NET 8.0** | Core runtime across all services |
| **ASP.NET Core Web API** | REST endpoints |
| **Entity Framework Core** | ORM with code-first migrations |
| **Ocelot** | API Gateway — routing, aggregation, rate limiting |
| **MediatR** | CQRS implementation — commands, queries, domain events |
| **AutoMapper** | DTO ↔ domain model mapping |
| **SQL Server** | Primary relational datastore |
| **Docker** | Containerization and local orchestration |

### Design Patterns

- **Clean Architecture** — strict layer separation (Domain → Application → Infrastructure → API)
- **CQRS** — commands mutate state, queries read from optimized projections
- **Domain Events** — cross-service communication via events for loose coupling
- **Repository Pattern** — abstracted data access within each service boundary

### Planned Infrastructure Additions

| Technology | Purpose |
|------------|---------|
| **Redis** | Session cache, leaderboard snapshots, rank computation cache, Planning Room state |
| **RabbitMQ / Azure Service Bus** | Async inter-service messaging — domain events, notifications, match triggers |
| **SignalR** | Real-time collaborative Planning Rooms and live plan activity feeds |
| **Elasticsearch** | Full-text plan search, destination indexing, template marketplace search |
| **Azure Blob Storage / S3** | Media storage and offline bundle hosting |
| **ML.NET or Azure AI** | Recommendation engine, trip friend compatibility scoring, confidence score modeling |

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
├── UserManagementService/           # [Planned] Auth, profiles, ranks, Explorer Score
├── StorySocialService/              # [Planned] Feed, reactions, comments, AMA, Planning Rooms
├── RecommendationService/           # [Planned] AI suggestions, matching, confidence scores
├── BookingIntegrationService/       # [Planned] Partners, discounts, carbon tracking
├── NotificationService/             # [Planned] Push, email, in-app, match alerts
├── MediaService/                    # [Planned] Uploads, CDN, offline bundles
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
