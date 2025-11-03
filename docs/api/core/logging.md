---
id: logging
title: Logging
---

The logging module is exposed only as a named import :

```ts
import { logging } from "@epicchain/epicvault-js";
logging.logger.setDefaultLevel("info"); // sets logging level of epicvault-js to 'info'
const apiLogger = logging.logger.getLogger("api"); // gets the logger for the api package
apiLogger.setLevel("warn"); // sets logging level only on the logger for the api package
```

All logs are piped towards `stdout` and `stderr`. Each named package within
`epicvault-js` will have its own logger. The initial setting for all loggers is
'silent'.
