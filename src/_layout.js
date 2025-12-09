import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/home";
import Events from "./screens/events";
import Settings from "./screens/settings";

const Tab = createBottomTabNavigator();

export default function TabsLayer() {
	return (
		<Tab.Navigator>
			<Tab.Screen name='home' component={Home} options={{title: 'Welcome'}} />
			<Tab.Screen name='events' component={Events} options={{title: 'Events'}} />
			<Tab.Screen name='settings' component={Settings} options={{title: 'Settings'}} />
		</Tab.Navigator>
	)
}