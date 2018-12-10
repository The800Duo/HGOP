# Anwers day 11

## Explain why we put each consecutive call inside the onSuccess callback of the // previous database call, instead of just placing them next to each other.

### Answer: Because all the call functions are asynchronous they use onSuccess callback to know if their call has been successful. First call has to be succesful for the next to be able to return with success and so on. If all calls are able to do that then the POST request can respond successfully.