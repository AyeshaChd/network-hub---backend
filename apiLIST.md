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
- POST/request/send/:status/:touserID      // fromUserID --logged in userID // status   is dynammic ,it can be interested or ignored
- POST/request/review/:status/:requestID  // status id dynamic it can be accepted or rejected



## userRouter
-GET/ user /requests/received
- GET /user /connections

- GET/ user /feed  ---- give users to ur feed