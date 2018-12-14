# Anwers day 11

## Explain why we put each consecutive call inside the onSuccess callback of the // previous database call, instead of just placing them next to each other.

 ### Answer:
  Because all the call functions are asynchronous they use onSuccess callback to know if their call has been successful. First call has to be succesful for the next to be able to return with success and so on. If all calls are able to do that then the POST request can respond successfully.

## What does the done parameter do?
  ### Answer: 
  The done parameter is used to notify Jest when the test has finished it‘s execution. The done parameter signals either way it is successful or if it fails. The done callbacks accepts one or more arguments which can be a single function or arrays.