import EventCard from "@/components/EventCard";

import { useEventList } from "@/hooks/useEventList";

import { useNavigation } from "@react-navigation/native";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Home() {
	const { events } = useEventList();

	const navigation = useNavigation();

	const todaysEvents = events.filter(
		(event) =>
			new Date(event.date).toDateString() == new Date().toDateString()
	);

	return (
		<View style={{ padding: 10, gap: 10 }}>
			<Image
				source={require("@/assets/EHC.jpg")}
				style={{
					aspectRatio: "334/131",
					height: 75,
					alignSelf: "center"
				}}
			/>
			<Text variant="titleLarge" style={{ fontWeight: "bold" }}>
				Today's Events
			</Text>
			{todaysEvents.length > 0 ? (
				todaysEvents.map((event) => <EventCard info={event} />)
			) : (
				<Text>No events today.</Text>
			)}
			<Button
				mode="contained"
				onPress={() => navigation.navigate("events")}
			>
				View all Events
			</Button>
		</View>
	);
}
