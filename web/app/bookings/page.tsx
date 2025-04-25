import { getAllBookings } from '../../src/services/api';
import BookingsList from './BookingsList';

export const dynamic = 'force-dynamic';

async function getBookingsData() {
    return await getAllBookings();
}

export default async function Bookings() {
    const bookings = await getBookingsData();

    return (
        <div className='min-h-screen'>
            <div className='container mx-auto px-4 py-8'>
                <h1 className='text-4xl font-bold text-[#fffffe] mb-8'>Your Bookings</h1>

                {bookings && bookings.length > 0 ? (
                    <BookingsList bookings={bookings} />
                ) : (
                    <p className='text-paragraph pt-4'>No bookings found.</p>
                )}
            </div>
        </div>
    );
}
