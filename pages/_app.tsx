import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from '../redux/store'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContextProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/context/ProtectedRoutes";

function useRouterReady() {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsReady(router.isReady);
  }, [router.isReady]);

  return isReady;
}

const AuthRequired = ['/auth/register', '/auth/dashboard']

export default function App({ Component, pageProps }: AppProps) {
  const isRouterReady = useRouterReady();
  const router = useRouter()

  return isRouterReady ? (
    <AuthContextProvider>
      {!AuthRequired.includes(router.pathname) ? (
        <Provider store={store} >
          <Component {...pageProps} />
        </Provider>
      ) : (
        <Provider store={store} >
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        </Provider>
      )}
    </AuthContextProvider>
  ) : null
}
