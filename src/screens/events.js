import { useEventData } from "@/hooks/useEventData";
import { FlatList, RefreshControl, View } from "react-native";
import { Text } from "react-native-paper";

export default function Events() {
	const { events, loading, refresh } = useEventData();

	return (
		<View>
			<FlatList data={events}
			keyExtractor={(item) => String(item.id)}
			renderItem={({ item }) => (
				<Text>{item.title}</Text>
			)}
			refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
			/>
		</View>
	)
}