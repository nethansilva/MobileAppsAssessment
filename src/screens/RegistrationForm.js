import { useState } from "react";

import { useRegisterEvent } from "@/hooks/useRegisterEvent";

import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function RegistrationForm({ route }) {
	const { eventId } = route.params;

	const { submitRegistration, loading, error, success } = useRegisterEvent();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const isValid =
		name.trim().length > 0 &&
		email.trim().length > 0 &&
		email.includes("@");

	const handleSubmit = async () => {
		await submitRegistration({ eventId, name, email, phone });
	};

	return (
		<View style={{ padding: 20, gap: 15 }}>
			<Text variant="titleLarge" style={{ fontWeight: "bold" }}>
				Register for Event
			</Text>

			<TextInput
				label="Full Name"
				value={name}
				onChangeText={setName}
				mode="outlined"
			/>

			<TextInput
				label="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
				mode="outlined"
			/>

			<TextInput
				label="Phone (optional)"
				value={phone}
				onChangeText={setPhone}
				keyboardType="phone-pad"
				mode="outlined"
			/>

			<Button
				mode="contained"
				onPress={handleSubmit}
				loading={loading}
				disabled={!isValid || loading}
			>
				Submit Registration
			</Button>

			{error && <Text style={{ color: "red" }}>⚠️ {error}</Text>}

			{success && (
				<Text style={{ color: "green" }}>
					✔️ Registration successful!
				</Text>
			)}
		</View>
	);
}
