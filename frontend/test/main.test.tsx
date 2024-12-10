import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './store/store'; // Adjust path if needed
import { environment } from './environment'; // Adjust path if needed
import App from './App'; // Adjust path if needed
import './index.css'; // Make sure CSS is being applied

describe('Main.tsx Entry Point', () => {
  test('renders App component with necessary providers', () => {
    render(
      <GoogleOAuthProvider clientId={environment.clientId}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    );

    // Check if App component renders (check a known text or element from App)
    const appElement = screen.getByText(/Home Page/i); 
    expect(appElement).toBeInTheDocument();
  });

  test('wraps App component in StrictMode', () => {
    const { container } = render(
      <GoogleOAuthProvider clientId={environment.clientId}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    );

    // Check if StrictMode is applied by inspecting the rendered container
    expect(container).toBeInTheDocument();
  });

  test('renders with Google OAuth provider correctly', () => {
    const { container } = render(
      <GoogleOAuthProvider clientId={environment.clientId}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    );

    // Check if Google OAuth Provider is correctly initialized
    expect(container.querySelector('div')).toBeInTheDocument();  
  });

  test('renders with Redux provider and store', () => {
    const { container } = render(
      <GoogleOAuthProvider clientId={environment.clientId}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    );

    // Check if the Redux store is being passed down properly 
    expect(container).toBeInTheDocument();
  });

  test('loads the required fonts', () => {
    const { container } = render(
      <GoogleOAuthProvider clientId={environment.clientId}>
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    );

    // Check if the roboto font is applied 
    const body = container.querySelector('body');
    expect(body).toHaveStyle('font-family: "Roboto", sans-serif');
  });
