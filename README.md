# lab3-prosper007
## What I did
I made a React real-time notes app. It's connected to a Firebase database.
## What didn't work
I found it difficult to make the draggable notes controlled with the react-draggable component library. I made it controlled by passing the `axis=none` prop. However, this also introduced the bug of offseting the box before dragging it. I could make it drag normally by passing the `position={null}` prop and removing the `axis=none` prop. However, the position wouldn't update in real time. This was actually pretty cool! This is basically Google Docs! Well maybe not but close enough
## Extra Credit Attempted
* Dragging updates z-index so any dragged not has the highest z-index and stays on top
* Added database rule so user cannot create note without a title and text. Having either one is fine.
* Snaps to grid
