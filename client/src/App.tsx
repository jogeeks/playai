import { Route, Switch } from "wouter";
import { Experience } from "./components/Experience";
import { Interface } from "./components/Interface";
import { About } from "./pages/About";

function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      <Experience />
      <Interface />
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  );
}

export default App;
