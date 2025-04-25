// Define types based on API response
export interface Space {
    id: number;
    name: string;
    description: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface Booking {
    id: number;
    space_id: number;
    status: 'confirmed' | 'cancelled' | 'pending'; // Add other status types as needed
    start_time: string;
    end_time: string;
    created_at: string;
    updated_at: string;
    space: Space;
}

export interface ApiResponse<T> {
    message: string;
    code: number;
    status: string;
    data: T;
    errors: null | any;
}

// Base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all spaces
export async function getSpaces(): Promise<Space[]> {
    try {
        const response = await fetch(`${API_URL}/spaces`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result: ApiResponse<{ spaces: Space[] }> = await response.json();
        return result.data.spaces;
    } catch (error) {
        console.error('Error fetching spaces:', error);
        return [];
    }
}

// Get a single space by ID
export async function getSpace(id: number): Promise<Space | null> {
    try {
        const response = await fetch(`${API_URL}/spaces/${id}`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result: ApiResponse<{ space: Space }> = await response.json();
        return result.data.space;
    } catch (error) {
        console.error(`Error fetching space ${id}:`, error);
        return null;
    }
}

// Fetch all bookings
export async function getAllBookings(): Promise<Booking[]> {
    try {
        const response = await fetch(`${API_URL}/bookings`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result: ApiResponse<{ bookings: Booking[] }> = await response.json();
        return result.data.bookings;
    } catch (error) {
        console.error('Error fetching spaces:', error);
        return [];
    }
}

// Get all bookings for a specific space
export async function getSpaceBookings(spaceId: number): Promise<Booking[]> {
    try {
        const response = await fetch(`${API_URL}/spaces/${spaceId}/bookings?status=confirmed`);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const result: ApiResponse<{ bookings: Booking[] }> = await response.json();
        return result.data.bookings;
    } catch (error) {
        console.error(`Error fetching bookings for space ${spaceId}:`, error);
        return [];
    }
}
