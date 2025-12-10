import { useCallback, useState } from "react";

import EventCard from "@/components/EventCard";

import { useEventData } from "@/hooks/useEventData";

import { FlatList, RefreshControl, View } from "react-native";
import { IconButton, Searchbar } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Events() {
	const { events, loading, refresh } = useEventData();

	const insets = useSafeAreaInsets();

	const [query, setQuery] = useState("");

	const [range, setRange] = useState({
		startDate: undefined,
		endDate: undefined
	});
	const [open, setOpen] = useState(false);

	const onDismiss = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const onConfirm = useCallback(
		({ startDate, endDate }) => {
			setOpen(false);
			setRange({ startDate, endDate });
		},
		[setOpen, setRange]
	);

	const filteredEvents = events
		.filter((event) => {
			console.log(event.date, new Date(event.date));
			if (new Date(event.date) < range.startDate) {
				return false;
			}
			if (new Date(event.date) > range.endDate) {
				return false;
			}

			return true;
		})
		.filter((event) =>
			[event.title, event.description, event.location]
				.join("")
				.toLowerCase()
				.includes(query.toLowerCase().trim())
		);

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
				<IconButton
					icon="calendar"
					mode="contained"
					onPress={() => setOpen(true)}
					style={{
						height: "100%",
						aspectRatio: "1/1",
						marginRight: 15
					}}
				/>
			</View>
			<FlatList
				data={filteredEvents}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => <EventCard info={item} />}
				contentContainerStyle={{ gap: 10, padding: 10, paddingTop: 5 }}
				style={{ marginBottom: insets.bottom * 2 + 10 }}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={refresh} />
				}
			/>
			<DatePickerModal
				locale="en-GB"
				mode="range"
				visible={open}
				onDismiss={onDismiss}
				startDate={range.startDate}
				endDate={range.endDate}
				onConfirm={onConfirm}
			/>
		</View>
	);
}
