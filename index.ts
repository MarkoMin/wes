import app from "./app";
// We choose environments port if it's specified, or 3000 as local port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
   console.log('Express server listening on port ' + PORT);
})