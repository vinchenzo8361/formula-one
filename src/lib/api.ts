export interface Driver {
  driverId: string;
  permanentNumber?: string;
  code?: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time?: string;
}

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

/**
 * Fetch current season Driver Standings
 */
export async function getCurrentDriverStandings(): Promise<DriverStanding[]> {
  try {
    const res = await fetch(`${BASE_URL}/current/driverStandings.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch current driver standings: ${res.statusText}`);
    }
    const data = await res.json();
    const lists = data?.MRData?.StandingsTable?.StandingsLists;
    if (lists && lists.length > 0) {
      return lists[0].DriverStandings || [];
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch current season Constructor Standings
 */
export async function getCurrentConstructorStandings(): Promise<ConstructorStanding[]> {
  try {
    const res = await fetch(`${BASE_URL}/current/constructorStandings.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch current constructor standings: ${res.statusText}`);
    }
    const data = await res.json();
    const lists = data?.MRData?.StandingsTable?.StandingsLists;
    if (lists && lists.length > 0) {
      return lists[0].ConstructorStandings || [];
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch current season Race Schedule
 */
export async function getCurrentSchedule(): Promise<Race[]> {
  try {
    const res = await fetch(`${BASE_URL}/current.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch current schedule: ${res.statusText}`);
    }
    const data = await res.json();
    const races = data?.MRData?.RaceTable?.Races;
    return races || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch Historical Driver Standings for a given year
 */
export async function getHistoricalDriverStandings(year: number): Promise<DriverStanding[]> {
  try {
    const res = await fetch(`${BASE_URL}/${year}/driverStandings.json`, {
      next: { revalidate: 86400 }, // Cache longer for historical data
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch driver standings for year ${year}: ${res.statusText}`);
    }
    const data = await res.json();
    const lists = data?.MRData?.StandingsTable?.StandingsLists;
    if (lists && lists.length > 0) {
      return lists[0].DriverStandings || [];
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export interface OpenF1Session {
  session_key: number;
  session_name: string;
  date_start: string;
  date_end: string;
  year: number;
  country_name: string;
  circuit_short_name: string;
}

export interface OpenF1TrackStatus {
  session_key: number;
  date: string;
  status: string;
  message: string;
}

const OPENF1_BASE_URL = 'https://api.openf1.org/v1';

/**
 * Fetch the latest session from OpenF1
 */
export async function getLatestSession(): Promise<OpenF1Session | null> {
  try {
    const res = await fetch(`${OPENF1_BASE_URL}/sessions?year=2024`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch OpenF1 sessions: ${res.statusText}`);
    }
    const data: OpenF1Session[] = await res.json();
    if (data && data.length > 0) {
      // Return the most recent session
      return data.sort((a, b) => new Date(b.date_start).getTime() - new Date(a.date_start).getTime())[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Fetch the latest track status for a given session
 */
export async function getTrackStatus(sessionKey: string | number): Promise<OpenF1TrackStatus | null> {
  try {
    const res = await fetch(`${OPENF1_BASE_URL}/track_status?session_key=${sessionKey}`, {
      next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch track status for session ${sessionKey}: ${res.statusText}`);
    }
    const data: OpenF1TrackStatus[] = await res.json();
    if (data && data.length > 0) {
      // Return the most recent track status
      return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
