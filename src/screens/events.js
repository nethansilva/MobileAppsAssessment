import { useState } from "react";

import EventCard from "@/components/EventCard";

import { useEventData } from "@/hooks/useEventData";

import { FlatList, RefreshControl, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";

export default function Events() {
	const { events, loading, refresh } = useEventData();

	const [query, setQuery] = useState("");

	const filteredEvents = events.filter((event) => {
		if (query == "") {
			return event;
		} else if (
			[event.title, event.description, event.location]
				.join("")
				.toLowerCase()
				.includes(query.toLowerCase().trim())
		) {
			return event;
		}
	});

	return (
		<View>
			<View
				style={{
					gap: 5,
					padding: 10,
					flexDirection: "row",
					alignItems: "center"
				}}
			>
				<Searchbar
					placeholder="Search events..."
					onChangeText={setQuery}
					style={{ flex: 1 }}
					value={query}
				/>
			</View>
			<FlatList
				data={filteredEvents}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => <EventCard info={item} />}
				contentContainerStyle={{ gap: 10, padding: 10, paddingTop: 5 }}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={refresh} />
				}
			/>
		</View>
	);
}
