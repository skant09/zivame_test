"use strict";function routes(e){e.get("/*",function(e,s,t){s.render("sample",{pageTitle:"Zivame",assets:{css:["main"],js:["main"]}})})}console.log(__dirname),app.use("/app",express["static"](path.join(__dirname,"/assets"))),module.exports=routes;
//# sourceMappingURL=routes.js.map
