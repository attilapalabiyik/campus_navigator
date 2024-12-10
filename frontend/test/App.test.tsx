import { render, screen } from '@testing-library/react';
import App from '../src/App'
import { BrowserRouter as Router } from 'react-router-dom';

describe('App Component', () => {
  test('renders Home Page title correctly', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const pageTitle = screen.getByText(/Home Page/i);
    expect(pageTitle).toBeInTheDocument();
  });

  test('renders building information correctly', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const buildingTitle = screen.getByText(/Integrative Learning Center/i);
    expect(buildingTitle).toBeInTheDocument();

    const machmerHall = screen.getByText(/Machmer Hall/i);
    expect(machmerHall).toBeInTheDocument();
  });

  test('renders search bar', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const searchBar = screen.getByRole('searchbox'); // or 'textbox' depending on how the search bar is rendered
    expect(searchBar).toBeInTheDocument();
  });

  test('renders chat bot section', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const chatBot = screen.getByText(/Chat Bot/i); // Check if the Chat Bot text is visible
    expect(chatBot).toBeInTheDocument();
  });

  test('renders signed-in user information', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const userName = screen.getByText(/Swetha Mohan/i);
    expect(userName).toBeInTheDocument();

    const userEmail = screen.getByText(/swethamohan@umass.edu/i);
    expect(userEmail).toBeInTheDocument();
  });

  test('renders "Learn More" buttons', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const learnMoreButton = screen.getByText(/Learn More/i);
    expect(learnMoreButton).toBeInTheDocument();
  });

  test('renders images of buildings correctly', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const buildingImages = screen.getAllByRole('img');
    expect(buildingImages).toHaveLength(2); // Assuming there are two images, one for each building
  });
});
