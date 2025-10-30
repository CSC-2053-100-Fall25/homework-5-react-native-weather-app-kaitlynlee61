import { Stack } from "expo-router";
export default function RootLayout() {
 return (
 <Stack>
 {/* Main Screen */}
 <Stack.Screen
 name="index"
 options={{
 title: "Kaitlyn's Weather App",
 headerStyle: {
 backgroundColor: '#fa10a4ff',
 },
 headerTintColor: '#FFFFFF',
 headerTitleStyle: {
 fontWeight: 'bold',
 fontSize: 24,
 },
 }}
 />

 {/* Detail Screen */}
 <Stack.Screen
 name="CityDetail"
 options={{
 title: "City Details",
 headerStyle: {
 backgroundColor: '#db6fd0ff',
 },
 headerTintColor: '#FFFFFF',
 headerTitleStyle: {
 fontWeight: 'bold',
 fontSize: 24,
 },
 }}
 />
 </Stack>
 );
}