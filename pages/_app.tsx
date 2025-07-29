import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from '../redux/store'
import { useRouter } from "next/router";
import { AuthContextProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/context/ProtectedRoutes";

const AuthRequired = ['/auth/register', '/auth/dashboard'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <AuthContextProvider>
      <Provider store={store}>
        {!AuthRequired.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Provider>
    </AuthContextProvider>
  );
}
