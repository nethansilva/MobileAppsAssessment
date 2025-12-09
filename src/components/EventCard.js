import { View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function EventCard({ info }) {
	return (
		<Card>
			<View style={{ padding: 10, gap: 5 }}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "flex-end"
					}}
				>
					<Text variant="titleMedium" style={{ fontWeight: "bold" }}>
						{info.title.replace(" REMOTE", "")}
					</Text>
					<Text variant="bodySmall">🏷️ {info.category}</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text variant="bodySmall">🗓️ {info.date}</Text>
					<Text variant="bodySmall">
						⏰ {info.startTime}-{info.endTime}
					</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between"
					}}
				>
					<Text variant="bodySmall">
						👤 {info.spotsRemaining} spots remaining
					</Text>
					<Text variant="bodySmall">📍 {info.location}</Text>
				</View>
			</View>
		</Card>
	);
}
