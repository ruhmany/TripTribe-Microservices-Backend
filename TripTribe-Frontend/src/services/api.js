// ═══════════════════════════════════════════════════════════════
// TripTribe API Service Layer
// Mock implementations — swap with real fetch() when backend is ready
// ═══════════════════════════════════════════════════════════════

import { trips, guides, feedItems, friendMatches, trendingDestinations } from '../data/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

export const tripService = {
  async getTrips() {
    await delay();
    return [...trips];
  },

  async getUserTrips(userId) {
    await delay();
    return trips.filter(t => t.ownerId === userId);
  },

  async getTripDetails(tripId) {
    await delay();
    return trips.find(t => t.tripId === tripId) || null;
  },

  async getPublicTrips() {
    await delay();
    return trips.filter(t => t.status === 5);
  },

  async createTrip(data) {
    await delay(500);
    const newTrip = {
      tripId: `t-${Date.now()}`,
      ...data,
      status: 1,
      confidenceScore: 0,
      forkCount: 0,
      rating: 0,
      ratingCount: 0,
      collaborators: [],
      dayDetails: [],
    };
    trips.push(newTrip);
    return newTrip;
  },

  async updateTrip(tripId, data) {
    await delay();
    const idx = trips.findIndex(t => t.tripId === tripId);
    if (idx >= 0) trips[idx] = { ...trips[idx], ...data };
    return trips[idx];
  },

  async publishTrip(tripId) {
    await delay();
    const trip = trips.find(t => t.tripId === tripId);
    if (trip) trip.status = 5;
    return trip;
  },
};

export const socialService = {
  async getFeed() {
    await delay();
    return [...feedItems];
  },

  async getFriendMatches() {
    await delay();
    return [...friendMatches];
  },
};

export const guideService = {
  async getGuides() {
    await delay();
    return [...guides];
  },

  async getGuideById(id) {
    await delay();
    return guides.find(g => g.id === id) || null;
  },
};

export const exploreService = {
  async getTrendingDestinations() {
    await delay();
    return [...trendingDestinations];
  },
};
