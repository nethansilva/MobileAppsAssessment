import Events from "@/screens/Events";
import Home from "@/screens/Home";
import Settings from "@/screens/Settings";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-paper";

const Tab = createBottomTabNavigator();

export default function TabsLayer() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="home"
				component={Home}
				options={{ title: "Welcome", tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" size={size} color={color} /> }}
			/>
			<Tab.Screen
				name="events"
				component={Events}
				options={{ title: "Events", tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="calendar" size={size} color={color} />  }}
			/>
			<Tab.Screen
				name="settings"
				component={Settings}
				options={{ title: "Settings", tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cog" size={size} color={color} />  }}
			/>
		</Tab.Navigator>
	);
}
