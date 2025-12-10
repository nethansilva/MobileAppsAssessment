import { useEventInfo } from "@/hooks/useEventInfo";

import { useNavigation } from "@react-navigation/native";
import { RefreshControl, ScrollView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Event({ route }) {
	const { eventId } = route.params;

	const insets = useSafeAreaInsets();

	const navigation = useNavigation();

	const { event, loading, refresh } = useEventInfo({ eventId });

	if (event) {
		navigation.setOptions({ title: event.title.replace(" REMOTE", "") });
		return (
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={refresh} />
				}
			>
				<View style={{ padding: 10, gap: 10, flex: 1 }}>
					<Text
						variant="headlineLarge"
						style={{ fontWeight: "bold" }}
					>
						{event.title.replace(" REMOTE", "")}
					</Text>
					<Text>{event.description}</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between"
						}}
					>
						<Text>
							⏰ {event.startTime} - {event.endTime}
						</Text>
						<Text>📍 {event.location}</Text>
						<Text>👤 {event.spotsRemaining}</Text>
					</View>
					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
							marginBottom: insets.bottom
						}}
					>
						<Button
							mode="contained"
							onPress={() =>
								navigation.navigate("registration", { eventId })
							}
						>
							Register
						</Button>
					</View>
				</View>
			</ScrollView>
		);
	}

	if (loading) return <Text>Loading event...</Text>;
}
