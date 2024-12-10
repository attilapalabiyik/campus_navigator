import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouterComponent from '../src/Router';  // Adjust path based on where the Router is located
import Root from '../src/routes/Root/Root';
import SettingsPage from '../src/routes/SettingsPage/SettingsPage';
import HomePage from '../src/routes/HomePage/HomePage';
import BuildingPage from '../src/routes/BuildingPage/BuildingPage';
import ChatPage from '../src/routes/ChatPage/ChatPage';

describe('Router Tests', () => {
  test('renders the Root and HomePage at "/" route', () => {
    render(
      <Router>
        <RouterComponent />
      </Router>
    );

    // Check if the HomePage is rendered (the default route)
    const homePageElement = screen.getByText(/Home Page/i);
    expect(homePageElement).toBeInTheDocument();
  });

  test('navigates to /chat and renders ChatPage', () => {
    render(
      <Router>
        <RouterComponent />
      </Router>
    );

    // Simulate navigating to /chat
    fireEvent.click(screen.getByText(/Chat/i));

    // Check if the ChatPage component is rendered
    const chatPageElement = screen.getByText(/Chat Page/i);
    expect(chatPageElement).toBeInTheDocument();
  });

  test('navigates to /building/:id and renders BuildingPage', () => {
    render(
      <Router>
        <RouterComponent />
      </Router>
    );

    // Simulate navigating to a building page (with a mock id, e.g., "1")
    window.history.pushState({}, '', '/building/1');

    // Check if the BuildingPage component is rendered
    const buildingPageElement = screen.getByText(/Building Page/i);
    expect(buildingPageElement).toBeInTheDocument();
  });

  test('navigates to /settings and renders SettingsPage', () => {
    render(
      <Router>
        <RouterComponent />
      </Router>
    );

    // Simulate navigating to /settings
    fireEvent.click(screen.getByText(/Settings/i));

    // Check if the SettingsPage component is rendered
    const settingsPageElement = screen.getByText(/Settings Page/i);
    expect(settingsPageElement).toBeInTheDocument();
  });

  test('navigates to a non-existing route and redirects to /', () => {
    render(
      <Router>
        <RouterComponent />
      </Router>
    );

    // Check if the HomePage is rendered (since it redirects to "/")
    const homePageElement = screen.getByText(/Home Page/i);
    expect(homePageElement).toBeInTheDocument();
  });
});
