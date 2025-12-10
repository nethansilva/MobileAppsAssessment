import Event from "@/screens/Event";
import Events from "@/screens/tabs/Events";
import Home from "@/screens/tabs/Home";
import Settings from "@/screens/tabs/Settings";

import RegistrationForm from "./screens/RegistrationForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

function TabsLayer() {
	return (
		<Tab.Navigator>
			<Tab.Screen
				name="home"
				component={Home}
				options={{
					title: "Welcome",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="home"
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Tab.Screen
				name="events"
				component={Events}
				options={{
					title: "Events",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="calendar"
							size={size}
							color={color}
						/>
					)
				}}
			/>
			<Tab.Screen
				name="settings"
				component={Settings}
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name="cog"
							size={size}
							color={color}
						/>
					)
				}}
			/>
		</Tab.Navigator>
	);
}

const Stack = createNativeStackNavigator();

export default function StackLayer() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="base"
				component={TabsLayer}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="event" component={Event} options={{ headerBackTitle: 'Back' }}/>
			<Stack.Screen name="registration" component={RegistrationForm} options={{ title: "Register" }}/>
		</Stack.Navigator>
	);
}
