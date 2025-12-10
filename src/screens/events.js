import { useCallback, useState } from "react";

import EventCard from "@/components/EventCard";

import { useEventData } from "@/hooks/useEventData";

import { FlatList, RefreshControl, View } from "react-native";
import { Chip, IconButton, Searchbar } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Events() {
	const insets = useSafeAreaInsets();

	const categories = [
		"Fitness",
		"Social",
		"Community",
		"Music",
		"Educational",
		"Arts",
		"Wellness",
		"Games",
		"Outdoor",
		"Dance",
		"Entertainment"
	];

	const { events, loading, refresh } = useEventData();

	const [range, setRange] = useState({
		startDate: undefined,
		endDate: undefined
	});

	const onConfirm = useCallback(
		({ startDate, endDate }) => {
			setOpen(false);
			setRange({ startDate, endDate });
		},
		[setOpen, setRange]
	);

	const [selCats, setSelCats] = useState([]);

	const toggleCategory = useCallback((category) => {
		setSelCats((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category]
		);
	}, []);

	const [query, setQuery] = useState("");

	const [open, setOpen] = useState(false);

	const onDismiss = useCallback(() => {
		setOpen(false);
	}, [setOpen]);

	const filteredEvents = events
		.filter((event) => {
			if (new Date(event.date) < range.startDate) {
				return false;
			}
			if (new Date(event.date) > range.endDate) {
				return false;
			}

			return true;
		})
		.filter((event) =>
			selCats.length ? selCats.includes(event.category) : true
		)
		.filter((event) =>
			[event.title, event.description, event.location]
				.join("")
				.toLowerCase()
				.includes(query.toLowerCase().trim())
		);

	return (
		<View style={{ gap: 10 }}>
			<FlatList
				data={filteredEvents}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => <EventCard info={item} />}
				contentContainerStyle={{ gap: 10, padding: 10 }}
				refreshControl={
					<RefreshControl refreshing={loading} onRefresh={refresh} />
				}
				ListHeaderComponent={
					<View style={{ gap: 10 }}>
						<View
							style={{
								gap: 5,
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
						<View
							style={{
								gap: 5,
								flexDirection: "row",
								flexWrap: "wrap"
							}}
						>
							{categories.map((cat) => {
								const sel = selCats.includes(cat);

								return (
									<Chip
										key={cat}
										mode={sel ? "flat" : "outlined"}
										onPress={() => {
											toggleCategory(cat);
										}}
									>
										{cat}
									</Chip>
								);
							})}
						</View>
					</View>
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
