import { getDatabase, ref, get, update } from "firebase/database";

const updateBookings = async () => {
  const database = getDatabase();
  const bookingsRef = ref(database, "bookings");
  const snapshot = await get(bookingsRef);

  if (snapshot.exists()) {
    const bookings = snapshot.val();

    for (const userId in bookings) {
      const userBookings = bookings[userId];
      for (const bookingId in userBookings) {
        const bookingRef = ref(database, `bookings/${userId}/${bookingId}`);
        await update(bookingRef, { status: "scheduled" });
      }
    }

    console.log("Все записи обновлены");
  } else {
    console.log("Записей не найдено");
  }
};

updateBookings();
