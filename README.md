# dpd-config-writer
This is a deployd custom resource that writes takes a javascript object and writes it out as a json to the public folder. The method of input is a GET request with a query param.

## Installation

This needs to be installed on the in the javascript-config-json-server/server/config-json with the --save flag. 

```
npm install dpd-config-writer --save
```

We must have the --save flag or deployd dashboard will not pick this up. Once you install this you can now add configwriter as a resource:

Go to the Deployd dashboard at: http://localhost:3000/dashboard


In the Resources + dropdown you should now see ConfigWriter as a new resource type, choose that.

In the popup take the default /configwriter as the path

# how front end uses this
ConfigWriter is a node module that has a hook into GET requests. When get requests are made the are intercepted by ConfigWriter and processed accordingly by writing the query params to the file system. The front end uses this by calling

```
dpd.configwriter.get(objConfigJson);
```

It is the front end's job to create and marshall the full config.
