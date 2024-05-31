### Install and Run the Expo application:
```bash
npm install
npx expo start
```
then press the letter as instructed in the terminal console.


### Navigation:

### Tabs (Layout):
Just by Wrapping the layout with `Tabs` will automatically pick all the pages inside of the directory or group-directory `(tabs)`.

```tsx
// (tabs)/_layout.tsx
import React from 'react'
import { Tabs } from 'expo-router'

export default function TabsLayout () {
  return (
    <>
      <Tabs>
        <Tabs.Screen name='home' /> {/* Define First Tab's Position */}
      </Tabs>
    </>
  )
}
```
### Image | React Native & Expo-Image: