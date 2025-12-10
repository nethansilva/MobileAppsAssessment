import StackLayer from "@/_layout";

import { NavigationContainer } from "@react-navigation/native";
import { registerRootComponent } from "expo";
import { enGB, registerTranslation } from "react-native-paper-dates";

registerTranslation("en-GB", enGB);

export default function Root() {
	return (
		<NavigationContainer>
			<StackLayer />
		</NavigationContainer>
	);
}

registerRootComponent(Root);
