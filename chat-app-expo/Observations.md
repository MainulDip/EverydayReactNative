### Call UseEffect on Every Route:
Add useSegments() as dependency.

### What re-calls on React Components/Functions:
If any route is visited and is not replaced (removed from the stack), everything that is not withing useEffect will will be recalled.

### Preventing Back Pressed inside Tab Navigation:
Tabs `_layout.tsx` should can hold this snippet to manipulate hardware back navigation. 
```jsx
const Page = () => {
  const routeSegments = useSegments();
  // console.log(routeSegments);

  const router = useRouter();

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (routeSegments[2] === "[id]") {
        router.back(); // hardware back press will only work for this [id] dynamic route.
      }
      
      return true;
    });
    
    },[routeSegments])

    return (
    <Tabs>
        <Tabs.Screen name="calls" options={{ title: "Calls" }} />
        <Tabs.Screen name="chats" options={{ title: "Calls" }} />
    </Tabs>
    )
}
```

### Hiding Tabs For Nested Screen:
Work on Tab's `_layout` file (Where Tabs.Screen 's are defined). Grab the current url Segment using `useSegment()`. Check if the segment matches with a specific nested screen and set `tabBarStyle: {display: routeSegments[2] === "[id]" ? "none" : "flex" }}`.

```jsx
const routeSegments = useSegments();
// ... Other Code
<Tabs.Screen name="chats" options={{
        tabBarStyle: { backgroundColor: Colors.background, display: routeSegments[2] === "[id]" ? "none" : "flex" }
      }} />
````