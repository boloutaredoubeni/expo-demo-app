import {describe, expect, test, it} from '@jest/globals';
import { render } from '@testing-library/react-native';
import App from "./App";

describe('App', () => {
  it('renders correctly', () => {
    const screen = render(<App />)
    screen.getByText(/Hello, World/i)
  });
})
