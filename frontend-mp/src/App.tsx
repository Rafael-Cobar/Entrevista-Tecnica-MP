import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./routes/Index-Router";

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<Toaster
				theme="system"
				position="bottom-right"
				dir="auto"
				visibleToasts={6}
				duration={5000}
				closeButton
				richColors
			/>
		</>
	);
};

export default App;
