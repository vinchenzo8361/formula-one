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
  Results?: RaceResult[];
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

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: {
    millis: string;
    time: string;
  };
}

export interface QualifyingResult {
  number: string;
  position: string;
  Driver: Driver;
  Constructor: Constructor;
  Q1: string;
  Q2?: string;
  Q3?: string;
}

/**
 * Format team names nicely
 */
export function formatTeamName(name: string): string {
  const upper = name.toUpperCase();
  if (upper === 'RB' || upper === 'VCARB' || upper === 'RB F1 TEAM') {
    return 'Racing Bulls';
  }
  return name;
}

/**
 * Fetch Race Results for a specific round
 */
export async function getRaceResults(season: string, round: string): Promise<RaceResult[]> {
  try {
    const res = await fetch(`${BASE_URL}/${season}/${round}/results.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch race results for ${season} round ${round}`);
    const data = await res.json();
    const races = data?.MRData?.RaceTable?.Races;
    if (races && races.length > 0 && races[0].Results) {
      return races[0].Results;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch Qualifying Results for a specific round
 */
export async function getQualifyingResults(season: string, round: string): Promise<QualifyingResult[]> {
  try {
    const res = await fetch(`${BASE_URL}/${season}/${round}/qualifying.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch qualifying results for ${season} round ${round}`);
    const data = await res.json();
    const races = data?.MRData?.RaceTable?.Races;
    if (races && races.length > 0 && races[0].QualifyingResults) {
      return races[0].QualifyingResults;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch a specific driver's results for a given year
 */
export async function getDriverResultsByYear(driverId: string, year: number | string): Promise<Race[]> {
  try {
    const res = await fetch(`${BASE_URL}/${year}/drivers/${driverId}/results.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch driver results for ${driverId} in ${year}`);
    const data = await res.json();
    return data?.MRData?.RaceTable?.Races || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export interface Season {
  season: string;
  url: string;
}

/**
 * Fetch all seasons a driver has competed in
 */
export async function getDriverSeasons(driverId: string): Promise<number[]> {
  try {
    const res = await fetch(`${BASE_URL}/drivers/${driverId}/seasons.json`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch seasons for driver ${driverId}`);
    const data = await res.json();
    const seasons = data?.MRData?.SeasonTable?.Seasons as Season[] | undefined;
    return seasons ? seasons.map(s => parseInt(s.season, 10)).sort((a, b) => b - a) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch all seasons a constructor has competed in
 */
export async function getConstructorSeasons(constructorId: string): Promise<number[]> {
  try {
    const res = await fetch(`${BASE_URL}/constructors/${constructorId}/seasons.json`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch seasons for constructor ${constructorId}`);
    const data = await res.json();
    const seasons = data?.MRData?.SeasonTable?.Seasons as Season[] | undefined;
    return seasons ? seasons.map(s => parseInt(s.season, 10)).sort((a, b) => b - a) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch a specific constructor's results for a given year
 */
export async function getConstructorResultsByYear(constructorId: string, year: number | string): Promise<Race[]> {
  try {
    const res = await fetch(`${BASE_URL}/${year}/constructors/${constructorId}/results.json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch constructor results for ${constructorId} in ${year}`);
    const data = await res.json();
    return data?.MRData?.RaceTable?.Races || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export interface StandingsList {
  season: string;
  round: string;
  ConstructorStandings?: ConstructorStanding[];
  DriverStandings?: DriverStanding[];
}

/**
 * Fetch all constructors
 */
export async function getAllConstructors(): Promise<Constructor[]> {
  try {
    const res = await fetch(`${BASE_URL}/constructors.json?limit=1000`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch all constructors: ${res.statusText}`);
    const data = await res.json();
    return data?.MRData?.ConstructorTable?.Constructors || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch drivers for a specific constructor
 */
export async function getConstructorDrivers(constructorId: string): Promise<Driver[]> {
  try {
    const res = await fetch(`${BASE_URL}/constructors/${constructorId}/drivers.json?limit=500`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch drivers for constructor ${constructorId}: ${res.statusText}`);
    const data = await res.json();
    return data?.MRData?.DriverTable?.Drivers || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch historical constructor standings for a specific constructor
 */
export async function getConstructorStandingsHistory(constructorId: string): Promise<StandingsList[]> {
  try {
    const res = await fetch(`${BASE_URL}/constructors/${constructorId}/constructorStandings.json?limit=100`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch standings history for constructor ${constructorId}: ${res.statusText}`);
    const data = await res.json();
    return data?.MRData?.StandingsTable?.StandingsLists || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Fetch all drivers
 */
export async function getAllDrivers(): Promise<Driver[]> {
  try {
    const res = await fetch(`${BASE_URL}/drivers.json?limit=1000`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch all drivers: ${res.statusText}`);
    const data = await res.json();
    return data?.MRData?.DriverTable?.Drivers || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}



