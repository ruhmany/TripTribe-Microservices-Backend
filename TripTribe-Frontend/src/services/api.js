// ═══════════════════════════════════════════════════════════════
// TripTribe API Service Layer
// Mock implementations — swap with real fetch() when backend is ready
// ═══════════════════════════════════════════════════════════════

import { trips, guides, feedItems, friendMatches, trendingDestinations, timelinePosts, extendedFriendMatches, checkpointState } from '../data/mockData';

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

// ═══════════════════════════════════════════════════════════════
// Timeline / Post Service
// ═══════════════════════════════════════════════════════════════
export const postService = {
  async getFeed(sortBy = 'viral') {
    await delay();
    const posts = timelinePosts.map(p => ({ ...p, reactions: { ...p.reactions }, comments: p.comments.map(c => ({ ...c, replies: [...c.replies] })) }));
    if (sortBy === 'viral') {
      posts.sort((a, b) => b.engagementScore - a.engagementScore);
    } else {
      posts.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    }
    return posts;
  },

  async addReaction(postId, emoji) {
    await delay(150);
    const post = timelinePosts.find(p => p.id === postId);
    if (post) {
      if (post.userReaction) {
        post.reactions[post.userReaction] = Math.max(0, (post.reactions[post.userReaction] || 0) - 1);
      }
      post.reactions[emoji] = (post.reactions[emoji] || 0) + 1;
      post.userReaction = emoji;
    }
    return post ? { ...post, reactions: { ...post.reactions } } : null;
  },

  async removeReaction(postId) {
    await delay(150);
    const post = timelinePosts.find(p => p.id === postId);
    if (post && post.userReaction) {
      post.reactions[post.userReaction] = Math.max(0, (post.reactions[post.userReaction] || 0) - 1);
      post.userReaction = null;
    }
    return post ? { ...post, reactions: { ...post.reactions } } : null;
  },

  async addComment(postId, text) {
    await delay(200);
    const post = timelinePosts.find(p => p.id === postId);
    if (post) {
      const newComment = {
        id: `c-${Date.now()}`,
        userId: 'u-001',
        userName: 'Alex Rivera',
        userInitials: 'AR',
        text,
        timestamp: new Date().toISOString(),
        replies: [],
      };
      post.comments.push(newComment);
      return newComment;
    }
    return null;
  },

  async addReply(postId, commentId, text) {
    await delay(200);
    const post = timelinePosts.find(p => p.id === postId);
    if (post) {
      const comment = post.comments.find(c => c.id === commentId);
      if (comment) {
        const newReply = {
          id: `r-${Date.now()}`,
          userId: 'u-001',
          userName: 'Alex Rivera',
          userInitials: 'AR',
          text,
          timestamp: new Date().toISOString(),
        };
        comment.replies.push(newReply);
        return newReply;
      }
    }
    return null;
  },

  async sharePost(postId) {
    await delay(150);
    const post = timelinePosts.find(p => p.id === postId);
    if (post) {
      post.shares += 1;
    }
    return post ? { shares: post.shares } : null;
  },
};

// ═══════════════════════════════════════════════════════════════
// Checkpoint Service
// ═══════════════════════════════════════════════════════════════
export const checkpointService = {
  async getCheckpoints(tripId) {
    await delay(200);
    return checkpointState[tripId] ? { ...checkpointState[tripId] } : {};
  },

  async toggleCheckpoint(tripId, activityId) {
    await delay(150);
    if (!checkpointState[tripId]) {
      checkpointState[tripId] = {};
    }
    const current = checkpointState[tripId][activityId];
    if (current && current.completed) {
      checkpointState[tripId][activityId] = { completed: false };
    } else {
      checkpointState[tripId][activityId] = { completed: true, completedAt: new Date().toISOString() };
    }
    return { ...checkpointState[tripId][activityId] };
  },

  getCompletionPercentage(tripId, totalActivities) {
    const state = checkpointState[tripId] || {};
    const completed = Object.values(state).filter(s => s.completed).length;
    return totalActivities > 0 ? Math.round((completed / totalActivities) * 100) : 0;
  },
};

// ═══════════════════════════════════════════════════════════════
// Friend Matching Service
// ═══════════════════════════════════════════════════════════════
export const friendService = {
  async getMatches(filters = {}) {
    await delay();
    let matches = [...extendedFriendMatches];
    if (filters.matchType && filters.matchType !== 'all') {
      matches = matches.filter(m => m.matchReason === filters.matchType);
    }
    if (filters.destination) {
      matches = matches.filter(m => m.destination.toLowerCase().includes(filters.destination.toLowerCase()));
    }
    if (filters.travelStyle && filters.travelStyle.length > 0) {
      matches = matches.filter(m => filters.travelStyle.some(s => m.tags.includes(s)));
    }
    // Default sort by compatibility
    matches.sort((a, b) => b.compatibility - a.compatibility);
    return matches;
  },

  async sendRequest(matchId) {
    await delay(300);
    const match = extendedFriendMatches.find(m => m.id === matchId);
    if (match) {
      match.status = 'requested';
    }
    return match ? { ...match } : null;
  },

  async acceptRequest(matchId) {
    await delay(300);
    const match = extendedFriendMatches.find(m => m.id === matchId);
    if (match) {
      match.status = 'connected';
    }
    return match ? { ...match } : null;
  },
};

