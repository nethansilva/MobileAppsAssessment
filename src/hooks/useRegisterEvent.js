import { useCallback, useState } from "react";

export function useRegisterEvent() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const submitRegistration = useCallback(
		async ({ eventId, name, email, phone }) => {
			setLoading(true);
			setError(null);
			setSuccess(null);

			try {
				const res = await fetch(
					"https://events.realmajed.com/registrations",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							eventId: String(eventId), // API requires string
							name,
							email,
							phone: phone || null
						})
					}
				);

				if (!res.ok) {
					const errText = await res.text().catch(() => "");
					throw new Error(`Server error: ${res.status} ${errText}`);
				}

				const data = await res.json();
				setSuccess(data);
				return data;
			} catch (err) {
				setError(err.message);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return { submitRegistration, loading, error, success };
}
