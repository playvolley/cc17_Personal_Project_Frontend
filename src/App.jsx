import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <h1 className="text-4xl text-center">Loading...</h1>;
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto shadow-lg">
      <AppRouter />
    </div>
  );
}

export default App;
