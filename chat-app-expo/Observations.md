### Call UseEffect on Every Route:
Add useSegments() as dependency.

### What re-calls:
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