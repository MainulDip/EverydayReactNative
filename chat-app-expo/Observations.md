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
<Tabs.Screen name="chats" options={{
        tabBarStyle: { backgroundColor: Colors.background, display: routeSegments[2] === "[id]" ? "none" : "flex" }
}} />
```

### Solving Version Conflict:
React Native Uses Native Binding (JS calls kotlin/swift UI functions), that's why if multiple version of safe node.js library are installed (a package can have it's own version of dependencies), the underlying native code throws error as there can be same native module with same name. To resolve this add all the conflicting package all at once using `npx expo install <package1> <package2> ...`.

To check which library is using which version of a package, run `npm ls <package_name>`. Ex `npm ls react-native-reanimated` to check which package is using what version of reanimated package.

Another way is specifying `overrides` in package.json. Add the latest previously used version. (Though may not work always)

```json
"overrides": {
  "react-native-reanimated": "~3.15.0"
},
```

`npm dedupe` will remove duplicated packages (if any). deduped is short for "deduplicated. 
  
Installing all the packages with npx to resolve native version conflict of the `reanimated` package.
`npx expo install react-native-gifted-chat react-native-reanimated react-native-safe-area-context`

### Error: xcrun simctl (ios error for opening RN app to simulator):
ios simulator needs to be run using xcode first. xcode -> open developer tools -> simulator will fix those issues.