import { useCallback, useEffect, useState } from "react";

export function useEventInfo({ eventId }) {
	const [event, setEvent] = useState();
	const [loading, setLoading] = useState(false);

	const load = useCallback(async () => {
		if (!eventId) return;

		setLoading(true);

		try {
			const res = await fetch(
				"https://grmobile.onrender.com/events/" + eventId
			);
			const data = await res.json();
			setEvent(data);
		} catch (err) {
			console.error("Failed to load events: ", err);
		} finally {
			setLoading(false);
		}
	}, [eventId]); // re-run when eventId changes

	useEffect(() => {
		load();
	}, [load]);

	return { event, loading, refresh: load };
}
