import { View } from "react-native";
import { Button, SegmentedButtons, Switch, Text } from "react-native-paper";
import { useSettings } from "@/hooks/useSettings";

export default function Settings() {
	const { settings, setSettings, saveSettings, loading } = useSettings();

	if (loading) {
		return <Text>Loading settings…</Text>;
	}

	const update = (updates) =>
		setSettings({ ...settings, ...updates });
		saveSettings();

	return (
		<View style={{ gap: 10, padding: 10 }}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
				<Text style={{ flex: 20 }}>Font Size</Text>
				<Text variant="labelMedium">This can be changed in your system settings.</Text>
			</View>

			<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
				<Text style={{ flex: 20 }}>Application Theme</Text>
				<SegmentedButtons
					style={{ flex: 70 }}
					value={settings.themeConfig}
					onValueChange={(v) => update({ themeConfig: v })}
					buttons={[
						{ value: "light", label: "Light" },
						{ value: "dark", label: "Dark" }
					]}
				/>
			</View>

			<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
				<Text style={{ flex: 20 }}>Sound</Text>
				<Switch
					style={{ flex: 70 }}
					value={settings.soundConfig}
					onValueChange={(v) => update({ soundConfig: v })}
				/>
			</View>

			<View style={{ marginTop: 40 }}>
				<Text>Restart the app to apply your settings.</Text>
			</View>
		</View>
	);
}