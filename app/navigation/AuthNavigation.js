import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GettingStarted from "../screens/Authentication/GettingStarted";

const AuthNavigation = () => {
    const AuthStack = createNativeStackNavigator();
    return (
        <AuthStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <AuthStack.Screen
                name="GettingStarted"
                component={GettingStarted}
            />
        </AuthStack.Navigator>
    );
}

export default AuthNavigation;