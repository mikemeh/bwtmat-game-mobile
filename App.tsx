import { useRef, useState, useEffect, useCallback } from 'react';
import {
  BackHandler,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const GAME_URL = 'https://bwtmat-game.vercel.app';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack]     = useState(false);
  const [isLoading, setIsLoading]     = useState(true);
  const [hasError, setHasError]       = useState(false);
  const [appReady, setAppReady]       = useState(false);

  useEffect(() => {
    setAppReady(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appReady) await SplashScreen.hideAsync();
  }, [appReady]);

  // Android hardware back button
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [canGoBack]);

  const handleNavChange = (state: WebViewNavigation) => {
    setCanGoBack(state.canGoBack);
  };

  const handleReload = () => {
    setHasError(false);
    setIsLoading(true);
    webViewRef.current?.reload();
  };

  if (!appReady) return null;

  return (
    <View style={styles.root} onLayout={onLayoutRootView}>
      <StatusBar style="light" backgroundColor="#060a14" />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text style={styles.loadingText}>Loading BWTmat…</Text>
        </View>
      )}

      {hasError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>😕</Text>
          <Text style={styles.errorTitle}>No Connection</Text>
          <Text style={styles.errorMsg}>Check your internet and try again.</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={handleReload}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          ref={webViewRef}
          source={{ uri: GAME_URL }}
          style={styles.webview}
          onNavigationStateChange={handleNavChange}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => { setHasError(true); setIsLoading(false); }}
          onHttpError={() => { setHasError(true); setIsLoading(false); }}
          javaScriptEnabled
          domStorageEnabled
          allowsBackForwardNavigationGestures
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback
          mixedContentMode="always"
        />
      )}
    </View>
  );
}

const BG = '#060a14';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  webview: {
    flex: 1,
    backgroundColor: BG,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BG,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    gap: 16,
  },
  loadingText: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: '700',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 12,
  },
  errorEmoji:  { fontSize: 56 },
  errorTitle:  { color: '#fff', fontSize: 22, fontWeight: '900' },
  errorMsg:    { color: 'rgba(255,255,255,0.4)', fontSize: 14, textAlign: 'center' },
  retryBtn: {
    marginTop: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#f59e0b',
  },
  retryText: { color: '#000', fontWeight: '900', fontSize: 16 },
});
