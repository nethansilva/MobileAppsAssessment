import EventCard from "@/components/EventCard";

import { useEventData } from "@/hooks/useEventData";

import { FlatList, RefreshControl, View } from "react-native";

export default function Events() {
	const { events, loading, refresh } = useEventData();

	return (
		<View>
			<FlatList
				data={events}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => <EventCard info={item} />}
				contentContainerStyle={{ gap: 10, padding: 10 }}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={refresh} />
				}
			/>
		</View>
	);
}
