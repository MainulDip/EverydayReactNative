declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";

declare module "react-native/Libraries/Components/View/ReactNativeStyleAttributes" {
    const ViewReactNativeStyleAttributes =  {
        scaleY : boolean
    }
    export default ViewReactNativeStyleAttributes;
    // export = ViewReactNativeStyleAttributes;
    // export { ViewReactNativeStyleAttributes }; // import it like `import { ViewReactNativeStyleAttributes } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'`
}