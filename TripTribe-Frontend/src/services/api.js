// ═══════════════════════════════════════════════════════════════
// TripTribe API Service Layer
// Mock implementations — swap with real fetch() when backend is ready
// ═══════════════════════════════════════════════════════════════

import { trips, guides, feedItems, friendMatches, trendingDestinations, timelinePosts, extendedFriendMatches, checkpointState } from '../data/mockData';

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms));

function mapTrip(dto) {
  if (!dto) return null;
  const createdBy = dto.createdBy || 'Unknown Explorer';
  const ownerInitials = createdBy
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'TR';

  const ownerId = dto.ownerId || dto.owerId || '';

  const dayDetails = (dto.dayDetails || []).map(day => ({
    dayId: day.dayId,
    date: day.date,
    activities: (day.activities || []).map(act => ({
      activityId: act.activityId,
      title: act.title,
      description: act.description,
      money: Number(act.money || 0),
      location: act.location,
      startTime: act.startTime ? act.startTime.substring(0, 5) : '09:00',
      endTime: act.endTime ? act.endTime.substring(0, 5) : '10:00',
      type: Number(act.type || 10),
    }))
  }));

  return {
    tripId: dto.tripId,
    ownerId: ownerId,
    ownerName: createdBy,
    ownerInitials: ownerInitials,
    title: dto.title,
    description: dto.details || '',
    startDate: dto.startDate,
    endDate: dto.endDate,
    status: Number(dto.status || 1),
    visibility: Number(dto.visibility || 1),
    confidenceScore: dto.confidenceScore || 0,
    forkCount: dto.forkCount || 0,
    rating: dto.rating || 0,
    ratingCount: dto.ratingCount || 0,
    coverGradient: 'linear-gradient(135deg, hsl(205, 85%, 45%), hsl(172, 70%, 50%))',
    tags: ['Adventure'],
    collaborators: [],
    dayDetails: dayDetails
  };
}

export const tripService = {
  async getTrips() {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    if (user && user.id) {
      return this.getUserTrips(user.id);
    }
    return [...trips];
  },

  async getUserTrips(userId) {
    let backendTrips = [];
    try {
      const response = await fetch(`${GATEWAY_URL}/trip/user-trips?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.data && Array.isArray(json.data)) {
          backendTrips = json.data.map(mapTrip);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch user trips from backend", e);
    }

    const mockTrips = trips.filter(t => t.ownerId === userId);
    const merged = [...backendTrips];
    for (const m of mockTrips) {
      if (!merged.some(t => t.tripId === m.tripId)) {
        merged.push(m);
      }
    }
    return merged;
  },

  async getTripDetails(tripId) {
    try {
      const response = await fetch(`${GATEWAY_URL}/trip?tripId=${tripId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
      });
      if (response.ok) {
        const json = await response.json();
        if (json.data) {
          return mapTrip(json.data);
        }
      }
    } catch (e) {
      console.warn("Failed to fetch trip details from backend, falling back to mock", e);
    }
    return trips.find(t => t.tripId === tripId) || null;
  },

  async getPublicTrips() {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    let backendTrips = [];
    if (user && user.id) {
      try {
        backendTrips = await this.getUserTrips(user.id);
      } catch (e) {
        console.warn("Failed to fetch user trips for explore", e);
      }
    }
    const publicBackendTrips = backendTrips.filter(t => t.status === 5);
    const mockPublic = trips.filter(t => t.status === 5);
    const allPublic = [...publicBackendTrips];
    for (const m of mockPublic) {
      if (!allPublic.some(t => t.tripId === m.tripId)) {
        allPublic.push(m);
      }
    }
    return allPublic;
  },

  async createTrip(data) {
    const payload = {
      createTripDTO: {
        ownerId: data.ownerId,
        createdBy: data.ownerName || 'Unknown',
        title: data.title,
        description: data.description,
        visibility: Number(data.visibility),
        status: 1,
        start: data.startDate,
        end: data.endDate,
      }
    };
    try {
      const response = await fetch(`${GATEWAY_URL}/trip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const json = await response.json();
        return {
          tripId: json.data.id || json.data.Id,
          ...data,
          status: 1,
          confidenceScore: 0,
          forkCount: 0,
          rating: 0,
          ratingCount: 0,
          collaborators: [],
          dayDetails: [],
        };
      }
    } catch (e) {
      console.warn('Backend createTrip failed, using mock fallback', e);
    }
    // Mock fallback
    await delay(300);
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
      coverGradient: data.coverGradient || 'linear-gradient(135deg, hsl(205, 85%, 45%), hsl(172, 70%, 50%))',
      tags: data.tags || ['Adventure'],
    };
    trips.push(newTrip);
    return newTrip;
  },

  async updateTrip(tripId, data) {
    const payload = {
      updateTripDTO: {
        tripId: tripId,
        ownerId: data.ownerId,
        title: data.title,
        description: data.description,
      }
    };
    try {
      const response = await fetch(`${GATEWAY_URL}/trip`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const json = await response.json();
        return mapTrip(json.data);
      }
    } catch (e) {
      console.warn('Backend updateTrip failed, using mock fallback', e);
    }
    // Mock fallback
    await delay(300);
    const idx = trips.findIndex(t => t.tripId === tripId);
    if (idx !== -1) {
      trips[idx] = { ...trips[idx], ...data };
      return { ...trips[idx] };
    }
    return null;
  },

  async deleteTrip(tripId, ownerId) {
    try {
      const response = await fetch(`${GATEWAY_URL}/trip`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ tripId, ownerId }),
      });
      if (response.ok) {
        return true;
      }
    } catch (e) {
      console.warn('Backend deleteTrip failed, using mock fallback', e);
    }
    // Mock fallback
    await delay(300);
    const idx = trips.findIndex(t => t.tripId === tripId);
    if (idx !== -1) {
      trips.splice(idx, 1);
    }
    return true;
  },

  async publishTrip(tripId) {
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : {};
    const response = await fetch(`${GATEWAY_URL}/trip/publish`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ ownerId: user.id, tripId }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to publish trip');
    }
    const json = await response.json();
    return json.data;
  },

  async addDay(tripId, ownerId, date) {
    try {
      const response = await fetch(`${GATEWAY_URL}/trip/add-day-to-tip`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ tripId, ownerId, date }),
      });
      if (response.ok) {
        const result = await response.json();
        return result.data;
      }
    } catch (e) {
      console.warn('Backend addDay failed, using mock fallback', e);
    }
    // Mock fallback
    await delay(300);
    const trip = trips.find(t => t.tripId === tripId);
    if (trip) {
      const newDay = { dayId: `d-${Date.now()}`, date, activities: [] };
      trip.dayDetails.push(newDay);
      return newDay;
    }
    return null;
  },

  async removeDay(tripId, dayId, ownerId) {
    try {
      const response = await fetch(`${GATEWAY_URL}/trip/remove-day-from-trip`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ tripId, dayId, ownerId }),
      });
      if (response.ok) {
        const result = await response.json();
        return result.data;
      }
    } catch (e) {
      console.warn('Backend removeDay failed, using mock fallback', e);
    }
    // Mock fallback
    await delay(300);
    const trip = trips.find(t => t.tripId === tripId);
    if (trip) {
      trip.dayDetails = trip.dayDetails.filter(d => d.dayId !== dayId);
    }
    return true;
  },

  async addActivity(data) {
    const payload = {
      tripId: data.tripId,
      dayId: data.dayId,
      ownerId: data.ownerId,
      activityId: data.activityId || null,
      title: data.title,
      notes: data.notes || data.description || '',
      startTime: data.startTime || '09:00',
      endTime: data.endTime || '10:00',
      locationName: data.locationName || data.location || '',
      longitude: Number(data.longitude || 0),
      latitude: Number(data.latitude || 0),
      activityType: Number(data.activityType || data.type || 10),
      amount: Number(data.amount || data.money || 0),
      currency: data.currency || 'USD',
    };
    try {
      const response = await fetch(`${GATEWAY_URL}/trip/add-activity-to-day`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const json = await response.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend addActivity failed, using mock fallback', e);
    }
    // Mock fallback
    await delay(300);
    const trip = trips.find(t => t.tripId === data.tripId);
    if (trip) {
      const day = trip.dayDetails.find(d => d.dayId === data.dayId);
      if (day) {
        const newActivity = {
          activityId: `act-${Date.now()}`,
          title: data.title,
          description: data.notes || data.description || '',
          money: Number(data.amount || data.money || 0),
          location: data.locationName || data.location || '',
          startTime: data.startTime || '09:00',
          endTime: data.endTime || '10:00',
          type: Number(data.activityType || data.type || 10),
        };
        day.activities.push(newActivity);
        return newActivity;
      }
    }
    return null;
  },

  async updateActivity(data) {
    const payload = {
      tripId: data.tripId,
      dayId: data.dayId,
      ownerId: data.ownerId,
      activityId: data.activityId,
      title: data.title,
      notes: data.notes || data.description || '',
      startTime: data.startTime || '09:00',
      endTime: data.endTime || '10:00',
      locationName: data.locationName || data.location || '',
      longitude: Number(data.longitude || 0),
      latitude: Number(data.latitude || 0),
      activityType: Number(data.activityType || data.type || 10),
      amount: Number(data.amount || data.money || 0),
      currency: data.currency || 'USD',
    };
    try {
      const response = await fetch(`${GATEWAY_URL}/trip/update-activity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const json = await response.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend updateActivity failed, using mock fallback', e);
    }
    // Mock fallback
    await delay(300);
    const trip = trips.find(t => t.tripId === data.tripId);
    if (trip) {
      for (const day of trip.dayDetails) {
        const actIdx = day.activities.findIndex(a => a.activityId === data.activityId);
        if (actIdx !== -1) {
          day.activities[actIdx] = {
            ...day.activities[actIdx],
            title: data.title,
            description: data.notes || data.description || '',
            money: Number(data.amount || data.money || 0),
            location: data.locationName || data.location || '',
            startTime: data.startTime || '09:00',
            endTime: data.endTime || '10:00',
            type: Number(data.activityType || data.type || 10),
          };
          return day.activities[actIdx];
        }
      }
    }
    return null;
  },

  async removeActivity(tripId, dayId, activityId, ownerId) {
    try {
      const response = await fetch(`${GATEWAY_URL}/trip/remove-activity`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ tripId, dayId, activityId, ownerId }),
      });
      if (response.ok) {
        const json = await response.json();
        return json.data;
      }
    } catch (e) {
      console.warn('Backend removeActivity failed, using mock fallback', e);
    }
    // Mock fallback
    await delay(300);
    const trip = trips.find(t => t.tripId === tripId);
    if (trip) {
      const day = trip.dayDetails.find(d => d.dayId === dayId);
      if (day) {
        day.activities = day.activities.filter(a => a.activityId !== activityId);
      }
    }
    return true;
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

  async createPost(postData) {
    await delay(300);
    const newPost = {
      id: `p-${Date.now()}`,
      reactions: { '❤️': 0, '🔥': 0, '😍': 0, '👏': 0, '🌍': 0, '😂': 0 },
      userReaction: null,
      comments: [],
      shares: 0,
      postedAt: new Date().toISOString(),
      engagementScore: 0,
      ownerId: 'u-001',
      ownerName: 'Alex Rivera',
      ownerInitials: 'AR',
      ...postData,
    };
    timelinePosts.unshift(newPost);
    return newPost;
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

const GATEWAY_URL = 'https://localhost:7000/gateway';

export function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export const authService = {
  async register(email, phoneNumber, password) {
    const response = await fetch(`${GATEWAY_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, phoneNumber, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  },

  async login(email, password) {
    const response = await fetch(`${GATEWAY_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();
  },

  async confirmEmail(email, token) {
    const response = await fetch(`${GATEWAY_URL}/auth/confirm-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Email confirmation failed');
    }

    return await response.json();
  },

  async confirmPhone(phoneNumber, token) {
    const response = await fetch(`${GATEWAY_URL}/auth/confirm-phone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber, token }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Phone confirmation failed');
    }

    return await response.json();
  },

  async forgetPassword(email) {
    const response = await fetch(`${GATEWAY_URL}/auth/forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Forget password request failed');
    }

    return await response.json();
  },

  async resetPassword(email, token, newPassword) {
    const response = await fetch(`${GATEWAY_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, token, newPassword }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Reset password failed');
    }

    return await response.json();
  },

  async oauthLogin(provider, token) {
    const response = await fetch(`${GATEWAY_URL}/auth/oauth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ provider, token }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'OAuth login failed');
    }

    return await response.json();
  }
};

