import TabsLayer from "@/_layout";

import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { StyleSheet } from "react-native";

export default function Root() {
	return (
		<NavigationContainer>
			<TabsLayer />
		</NavigationContainer>
	);
}

registerRootComponent(Root);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
