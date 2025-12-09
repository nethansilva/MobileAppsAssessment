import Events from "@/screens/Events";
import Home from "@/screens/Home";
import Settings from "@/screens/Settings";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function TabsLayer() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="home"
				component={Home}
				options={{ title: "Welcome" }}
			/>
			<Tab.Screen
				name="events"
				component={Events}
				options={{ title: "Events" }}
			/>
			<Tab.Screen
				name="settings"
				component={Settings}
				options={{ title: "Settings" }}
			/>
		</Tab.Navigator>
	);
}
