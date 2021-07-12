import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Login from "./Screens/Authentication/Login";
import Register from "./Screens/Authentication/Register";
import Homescreen from "./Screens/Homescreen/Homescreen";
import Practice from "./Screens/Practice/Practice";
import Challenges from "./Screens/Challenges/Challenges";
import Profile from "./Screens/Profile/Profile";

import AddSong from "./Screens/Practice/AddSong";
import Song from "./Screens/Practice/Song";
import AddSection from "./Screens/Practice/AddSection";
import Section from "./Screens/Practice/Section";
import History from "./Screens/Practice/History";

import ChallengeFull from "./Screens/Challenges/ChallengeFull";
import AddAttempt from "./Screens/Challenges/AddAttempt";

import { tokenSelector } from "./store/user/user.selectors";
import { useSelector } from "react-redux";

const AuthenticationStack = createStackNavigator();
const HomescreenStack = createStackNavigator();
const PracticeStack = createStackNavigator();
const ChallengesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomescreenStackScreen = () => {
  return (
    <HomescreenStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomescreenStack.Screen name="Homescreen" component={Homescreen} />
    </HomescreenStack.Navigator>
  );
};

const PracticeStackScreen = () => {
  return (
    <PracticeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PracticeStack.Screen name="Practice" component={Practice} />
      <PracticeStack.Screen name="AddSong" component={AddSong} />
      <PracticeStack.Screen name="Song" component={Song} />
      <PracticeStack.Screen name="AddSection" component={AddSection} />
      <PracticeStack.Screen name="Section" component={Section} />
      <PracticeStack.Screen name="History" component={History} />
    </PracticeStack.Navigator>
  );
};

const ChallengesStackScreen = () => {
  return (
    <ChallengesStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChallengesStack.Screen name="Challenges" component={Challenges} />
      <ChallengesStack.Screen name="ChallengeFull" component={ChallengeFull} />
      <ChallengesStack.Screen name="AddAttempt" component={AddAttempt} />
    </ChallengesStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

const App = () => {
  const isLogged = useSelector(tokenSelector) !== "";

  return (
    <NavigationContainer>
      {!isLogged ? (
        <AuthenticationStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <AuthenticationStack.Screen name="Login" component={Login} />
          <AuthenticationStack.Screen name="Register" component={Register} />
        </AuthenticationStack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string;

              if (route.name === "Home") {
                iconName = focused ? "md-home" : "md-home-outline";
              } else if (route.name === "Practice") {
                iconName = focused
                  ? "md-musical-notes"
                  : "md-musical-notes-outline";
              } else if (route.name === "Challenges") {
                iconName = focused ? "md-stopwatch" : "md-stopwatch-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "md-man" : "md-man-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: "white",
            inactiveTintColor: "grey",
            activeBackgroundColor: "#3b3b3b",
            inactiveBackgroundColor: "black",
          }}
        >
          <Tab.Screen name="Home" component={HomescreenStackScreen} />
          <Tab.Screen name="Practice" component={PracticeStackScreen} />
          <Tab.Screen name="Challenges" component={ChallengesStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
