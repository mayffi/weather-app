// import React from 'react'
// import useScript, { ScriptStatus } from '@charlietango/use-script'

// export const useExternalScript = () => {
//   const [ready, status] = useScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAXH9FYT5V3qUOSaX3Z2d04suqmRYRKJ5g&libraries=places&callback=initMap')

//   if (status === ScriptStatus.ERROR) {
//     return <div>Failed to load Google API</div>
//   }

//   return <div>Google API Ready: {ready}</div>
// }

// export default useExternalScript