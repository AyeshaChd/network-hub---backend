# devTinder APIs

## auth Router
-POST /signUp
-POST /Login
-POST /Logout
## profile Router

-GET /profile/view
-PATCH /profile/ edit
-PATCH/profile / password

## connectionRequestRouter
-POST/request/send/interested/:touserID      // fromUserID --logged in userID
-POST /request/send/ignore/:userID
-POST/request/review/accepted/:requestID
-POST/reuest/review/rejected/:requestID


## userRouter
- GET /user /connections
-GET/ user /requests 
- GET/ user /feed  ---- give users to ur feed