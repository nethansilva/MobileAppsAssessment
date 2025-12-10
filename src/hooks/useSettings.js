import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "app_settings";

export function useSettings() {
	const [settings, setSettings] = useState({
		themeConfig: "system",
		soundConfig: false
	});

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const stored = await AsyncStorage.getItem(SETTINGS_KEY);
				if (stored) {
					setSettings(JSON.parse(stored));
				}
			} catch (err) {
				console.error("Failed to load settings:", err);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const saveSettings = useCallback(async (newSettings = settings) => {
		try {
			await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
			setSettings(newSettings);
			return true;
		} catch (err) {
			console.error("Failed to save settings:", err);
			return false;
		}
	}, [settings]);

	return {
		settings,
		setSettings,
		saveSettings,
		loading
	};
}