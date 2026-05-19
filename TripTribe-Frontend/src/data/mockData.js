// ═══════════════════════════════════════════════════════════════
// TripTribe Mock Data — matches backend DTOs
// ═══════════════════════════════════════════════════════════════

export const ActivityTypes = {
  Accommodation: 1,
  Transportation: 2,
  Dining: 3,
  Sightseeing: 4,
  Entertainment: 5,
  Shopping: 6,
  OutdoorActivity: 7,
  CulturalExperience: 8,
  Relaxation: 9,
  Other: 10,
};

export const ActivityTypeLabels = {
  1: 'Accommodation', 2: 'Transportation', 3: 'Dining',
  4: 'Sightseeing', 5: 'Entertainment', 6: 'Shopping',
  7: 'Outdoor', 8: 'Cultural', 9: 'Relaxation', 10: 'Other',
};

export const ActivityTypeColors = {
  1: 'hsl(265, 70%, 55%)', 2: 'hsl(205, 85%, 50%)', 3: 'hsl(15, 85%, 55%)',
  4: 'hsl(45, 90%, 50%)', 5: 'hsl(330, 70%, 55%)', 6: 'hsl(172, 70%, 45%)',
  7: 'hsl(130, 60%, 45%)', 8: 'hsl(280, 65%, 55%)', 9: 'hsl(190, 70%, 50%)', 10: 'hsl(0, 0%, 55%)',
};

export const TripStatus = { Planned: 1, InProgress: 2, Completed: 3, Cancelled: 4, Published: 5 };
export const TripStatusLabels = { 1: 'Draft', 2: 'In Progress', 3: 'Completed', 4: 'Cancelled', 5: 'Published' };
export const TripStatusColors = { 1: 'warning', 2: 'primary', 3: 'success', 4: 'danger', 5: 'teal' };

export const TripVisibility = { VisibleToOnlyMe: 1, VisibleToCollaborators: 2, PubliclyVisible: 3 };

// Current mock user
export const currentUser = {
  id: 'u-001',
  name: 'Alex Rivera',
  email: 'alex@triptribe.com',
  avatar: null,
  initials: 'AR',
  bio: 'Full-time explorer. 23 countries and counting. Adventure seeker & cultural enthusiast.',
  joinedDate: '2024-06-15',
  countriesVisited: 23,
  citiesVisited: 67,
  tripsCreated: 14,
  tripsForked: 8,
  explorerScore: 72,
  ranks: {
    poster: { stage: 3, title: 'Trailblazer', progress: 65, points: 1840 },
    reactor: { stage: 2, title: 'Enthusiast', progress: 40, points: 720 },
    contributor: { stage: 2, title: 'Editor', progress: 55, points: 910 },
  },
  badges: ['Country Expert: Japan', 'City Expert: Tokyo', 'World Explorer'],
  visitedCountries: ['JP', 'TH', 'VN', 'KR', 'ID', 'SG', 'MY', 'PH', 'FR', 'IT', 'ES', 'DE', 'NL', 'GB', 'PT', 'GR', 'TR', 'MA', 'EG', 'US', 'MX', 'BR', 'AR'],
};

// Trips matching GetTripDetailsDTO
export const trips = [
  {
    tripId: 't-001',
    ownerId: 'u-001',
    ownerName: 'Alex Rivera',
    ownerInitials: 'AR',
    title: 'Tokyo & Kyoto Cultural Immersion',
    description: 'A deep dive into Japanese culture — from the neon streets of Shibuya to the serene temples of Kyoto. Covering traditional tea ceremonies, street food markets, and hidden shrines.',
    startDate: '2026-07-10',
    endDate: '2026-07-20',
    status: TripStatus.Published,
    visibility: TripVisibility.PubliclyVisible,
    confidenceScore: 92,
    forkCount: 47,
    rating: 4.8,
    ratingCount: 124,
    coverGradient: 'linear-gradient(135deg, hsl(350, 80%, 45%), hsl(15, 85%, 55%))',
    tags: ['Cultural', 'Foodie', 'Mid-range'],
    collaborators: [
      { id: 'u-002', name: 'Maya Chen', initials: 'MC' },
      { id: 'u-003', name: 'James Wilson', initials: 'JW' },
    ],
    dayDetails: [
      {
        date: '2026-07-10',
        activities: [
          { title: 'Arrive at Narita Airport', description: 'Take Narita Express to Shinjuku Station', money: 30, location: 'Narita Airport', startTime: '14:00', endTime: '16:30', type: ActivityTypes.Transportation },
          { title: 'Check-in at Shinjuku Granbell', description: 'Boutique hotel in the heart of Shinjuku', money: 120, location: 'Shinjuku, Tokyo', startTime: '17:00', endTime: '17:30', type: ActivityTypes.Accommodation },
          { title: 'Omoide Yokocho Evening', description: 'Explore Memory Lane — yakitori and sake in tiny alley bars', money: 35, location: 'Omoide Yokocho', startTime: '19:00', endTime: '22:00', type: ActivityTypes.Dining },
        ],
      },
      {
        date: '2026-07-11',
        activities: [
          { title: 'Tsukiji Outer Market', description: 'Fresh sushi breakfast and tamagoyaki tasting', money: 25, location: 'Tsukiji Market', startTime: '07:30', endTime: '09:30', type: ActivityTypes.Dining },
          { title: 'Senso-ji Temple', description: 'Tokyo\'s oldest temple — walk through Kaminarimon gate', money: 0, location: 'Asakusa', startTime: '10:00', endTime: '12:00', type: ActivityTypes.Sightseeing },
          { title: 'TeamLab Borderless', description: 'Immersive digital art museum', money: 35, location: 'Azabudai Hills', startTime: '14:00', endTime: '16:30', type: ActivityTypes.Entertainment },
          { title: 'Shibuya Crossing & Dinner', description: 'Iconic crossing then ramen at Fuunji', money: 15, location: 'Shibuya', startTime: '18:00', endTime: '21:00', type: ActivityTypes.Dining },
        ],
      },
      {
        date: '2026-07-12',
        activities: [
          { title: 'Meiji Shrine Morning Walk', description: 'Peaceful forest walk to the grand shrine', money: 0, location: 'Harajuku', startTime: '08:00', endTime: '09:30', type: ActivityTypes.CulturalExperience },
          { title: 'Harajuku & Takeshita Street', description: 'Quirky fashion, crêpes, and kawaii culture', money: 40, location: 'Harajuku', startTime: '10:00', endTime: '12:30', type: ActivityTypes.Shopping },
          { title: 'Shinkansen to Kyoto', description: 'Bullet train experience — 2h15m journey', money: 130, location: 'Tokyo Station', startTime: '14:00', endTime: '16:15', type: ActivityTypes.Transportation },
          { title: 'Gion District Evening Walk', description: 'Spot geiko and maiko in the historic district', money: 0, location: 'Gion, Kyoto', startTime: '18:30', endTime: '21:00', type: ActivityTypes.CulturalExperience },
        ],
      },
    ],
  },
  {
    tripId: 't-002',
    ownerId: 'u-001',
    ownerName: 'Alex Rivera',
    ownerInitials: 'AR',
    title: 'Amalfi Coast Road Trip',
    description: 'Sun-soaked Italian coastline — winding cliffside roads, fresh limoncello, and turquoise waters from Sorrento to Ravello.',
    startDate: '2026-09-01',
    endDate: '2026-09-07',
    status: TripStatus.Planned,
    visibility: TripVisibility.VisibleToCollaborators,
    confidenceScore: 0,
    forkCount: 0,
    rating: 0,
    ratingCount: 0,
    coverGradient: 'linear-gradient(135deg, hsl(205, 85%, 45%), hsl(172, 70%, 50%))',
    tags: ['Relaxed', 'Couple', 'Mid-range'],
    collaborators: [{ id: 'u-004', name: 'Sofia Laurent', initials: 'SL' }],
    dayDetails: [
      {
        date: '2026-09-01',
        activities: [
          { title: 'Fly to Naples', description: 'Direct flight, arrive afternoon', money: 180, location: 'Naples Airport', startTime: '12:00', endTime: '15:00', type: ActivityTypes.Transportation },
          { title: 'Transfer to Sorrento', description: 'Private car transfer along the coast', money: 65, location: 'Sorrento', startTime: '16:00', endTime: '17:30', type: ActivityTypes.Transportation },
          { title: 'Sunset Aperitivo', description: 'Spritz on the terrace overlooking the bay', money: 20, location: 'Piazza Tasso', startTime: '19:00', endTime: '21:00', type: ActivityTypes.Dining },
        ],
      },
    ],
  },
  {
    tripId: 't-003',
    ownerId: 'u-005',
    ownerName: 'Omar Hassan',
    ownerInitials: 'OH',
    title: 'Marrakech: The Insider Route',
    description: '48 hours in the Red City — skip the tourist traps and discover the real Marrakech through hidden riads, artisan workshops, and Atlas Mountain views.',
    startDate: '2026-06-15',
    endDate: '2026-06-17',
    status: TripStatus.Published,
    visibility: TripVisibility.PubliclyVisible,
    confidenceScore: 85,
    forkCount: 31,
    rating: 4.6,
    ratingCount: 78,
    coverGradient: 'linear-gradient(135deg, hsl(25, 85%, 50%), hsl(45, 90%, 55%))',
    tags: ['Cultural', 'Budget', 'Adventure'],
    collaborators: [],
    dayDetails: [
      {
        date: '2026-06-15',
        activities: [
          { title: 'Jemaa el-Fnaa at Dawn', description: 'Experience the square before the crowds', money: 0, location: 'Jemaa el-Fnaa', startTime: '06:30', endTime: '08:00', type: ActivityTypes.Sightseeing },
          { title: 'Hidden Riad Breakfast', description: 'Traditional Moroccan breakfast at Riad Yasmine', money: 12, location: 'Medina', startTime: '08:30', endTime: '09:30', type: ActivityTypes.Dining },
          { title: 'Artisan Workshop Tour', description: 'Leather tanning, metalwork, and zellige tile making', money: 25, location: 'Souks', startTime: '10:00', endTime: '13:00', type: ActivityTypes.CulturalExperience },
        ],
      },
    ],
  },
  {
    tripId: 't-004',
    ownerId: 'u-001',
    ownerName: 'Alex Rivera',
    ownerInitials: 'AR',
    title: 'Bali Wellness Retreat',
    description: 'A week of yoga, meditation, and Balinese healing traditions in Ubud. Find your balance among rice terraces and sacred monkey forests.',
    startDate: '2026-11-05',
    endDate: '2026-11-12',
    status: TripStatus.InProgress,
    visibility: TripVisibility.PubliclyVisible,
    confidenceScore: 45,
    forkCount: 12,
    rating: 4.3,
    ratingCount: 34,
    coverGradient: 'linear-gradient(135deg, hsl(130, 55%, 40%), hsl(172, 70%, 50%))',
    tags: ['Relaxed', 'Solo', 'Budget'],
    collaborators: [],
    dayDetails: [],
  },
  {
    tripId: 't-005',
    ownerId: 'u-006',
    ownerName: 'Lena Schmidt',
    ownerInitials: 'LS',
    title: 'Iceland Ring Road Adventure',
    description: 'Complete circuit of Iceland — glaciers, volcanos, hot springs, and the Northern Lights. 10 days of raw, unfiltered nature.',
    startDate: '2026-10-01',
    endDate: '2026-10-10',
    status: TripStatus.Published,
    visibility: TripVisibility.PubliclyVisible,
    confidenceScore: 88,
    forkCount: 56,
    rating: 4.9,
    ratingCount: 201,
    coverGradient: 'linear-gradient(135deg, hsl(200, 60%, 35%), hsl(180, 50%, 45%))',
    tags: ['Adventure', 'Solo', 'Mid-range'],
    collaborators: [{ id: 'u-007', name: 'Erik Larsson', initials: 'EL' }],
    dayDetails: [],
  },
  {
    tripId: 't-006',
    ownerId: 'u-008',
    ownerName: 'Priya Sharma',
    ownerInitials: 'PS',
    title: 'Vietnam North to South',
    description: 'Three weeks exploring Vietnam — Hanoi street food, Ha Long Bay kayaking, Hue imperial city, Hoi An tailoring, and Ho Chi Minh City nightlife.',
    startDate: '2026-08-01',
    endDate: '2026-08-21',
    status: TripStatus.Published,
    visibility: TripVisibility.PubliclyVisible,
    confidenceScore: 79,
    forkCount: 38,
    rating: 4.5,
    ratingCount: 92,
    coverGradient: 'linear-gradient(135deg, hsl(15, 80%, 50%), hsl(40, 90%, 55%))',
    tags: ['Foodie', 'Budget', 'Adventure'],
    collaborators: [],
    dayDetails: [],
  },
];

// Guides
export const guides = [
  { id: 'g-001', name: 'Omar Hassan', initials: 'OH', city: 'Marrakech, Morocco', rating: 4.9, reviewCount: 127, rank: 'Cultural Ambassador', specialties: ['Cultural', 'Foodie', 'History'], gradientColor: 'hsl(25, 85%, 50%)', sessionsCompleted: 84 },
  { id: 'g-002', name: 'Yuki Tanaka', initials: 'YT', city: 'Kyoto, Japan', rating: 4.8, reviewCount: 95, rank: 'City Voice', specialties: ['Cultural', 'Traditional', 'Photography'], gradientColor: 'hsl(350, 70%, 50%)', sessionsCompleted: 62 },
  { id: 'g-003', name: 'Carlos Mendez', initials: 'CM', city: 'Mexico City, Mexico', rating: 4.7, reviewCount: 68, rank: 'Neighborhood Pro', specialties: ['Foodie', 'Nightlife', 'Street Art'], gradientColor: 'hsl(130, 60%, 40%)', sessionsCompleted: 41 },
  { id: 'g-004', name: 'Amara Obi', initials: 'AO', city: 'Cape Town, South Africa', rating: 4.9, reviewCount: 112, rank: 'Legendary Host', specialties: ['Adventure', 'Wine', 'Nature'], gradientColor: 'hsl(45, 85%, 50%)', sessionsCompleted: 98 },
  { id: 'g-005', name: 'Ines Rossi', initials: 'IR', city: 'Florence, Italy', rating: 4.6, reviewCount: 54, rank: 'Local Friend', specialties: ['Art', 'Cuisine', 'History'], gradientColor: 'hsl(205, 80%, 50%)', sessionsCompleted: 28 },
  { id: 'g-006', name: 'Raj Patel', initials: 'RP', city: 'Jaipur, India', rating: 4.8, reviewCount: 89, rank: 'City Voice', specialties: ['Cultural', 'Architecture', 'Shopping'], gradientColor: 'hsl(280, 65%, 50%)', sessionsCompleted: 55 },
];

// Feed items
export const feedItems = [
  { id: 'f-001', type: 'fork', user: 'Maya Chen', userInitials: 'MC', action: 'forked your trip', target: 'Tokyo & Kyoto Cultural Immersion', time: '2 hours ago' },
  { id: 'f-002', type: 'rating', user: 'James Wilson', userInitials: 'JW', action: 'rated', target: 'Tokyo & Kyoto Cultural Immersion', extra: '⭐ 5 stars', time: '5 hours ago' },
  { id: 'f-003', type: 'comment', user: 'Sofia Laurent', userInitials: 'SL', action: 'commented on', target: 'Amalfi Coast Road Trip', time: '1 day ago' },
  { id: 'f-004', type: 'milestone', user: 'You', userInitials: 'AR', action: 'reached', target: 'Trailblazer rank in Poster Track!', time: '2 days ago' },
  { id: 'f-005', type: 'fork', user: 'Erik Larsson', userInitials: 'EL', action: 'forked', target: 'Tokyo & Kyoto Cultural Immersion', time: '3 days ago' },
];

// Trip friend matches
export const friendMatches = [
  { id: 'm-001', name: 'Sakura Ito', initials: 'SI', destination: 'Tokyo, Japan', dates: 'Jul 12–18', compatibility: 87, tags: ['Cultural', 'Foodie'] },
  { id: 'm-002', name: 'Marco Bianchi', initials: 'MB', destination: 'Amalfi Coast', dates: 'Sep 2–6', compatibility: 74, tags: ['Couple', 'Relaxed'] },
  { id: 'm-003', name: 'Ava Thompson', initials: 'AT', destination: 'Tokyo, Japan', dates: 'Jul 9–16', compatibility: 91, tags: ['Cultural', 'Mid-range'] },
];

// Trending destinations
export const trendingDestinations = [
  { name: 'Tokyo', country: 'Japan', planCount: 342, gradient: 'linear-gradient(135deg, hsl(350, 75%, 45%), hsl(15, 80%, 55%))' },
  { name: 'Bali', country: 'Indonesia', planCount: 287, gradient: 'linear-gradient(135deg, hsl(130, 55%, 40%), hsl(85, 60%, 50%))' },
  { name: 'Barcelona', country: 'Spain', planCount: 256, gradient: 'linear-gradient(135deg, hsl(15, 85%, 50%), hsl(45, 90%, 55%))' },
  { name: 'Iceland', country: 'Iceland', planCount: 198, gradient: 'linear-gradient(135deg, hsl(200, 55%, 40%), hsl(180, 45%, 50%))' },
  { name: 'Marrakech', country: 'Morocco', planCount: 176, gradient: 'linear-gradient(135deg, hsl(25, 80%, 45%), hsl(40, 85%, 55%))' },
];
