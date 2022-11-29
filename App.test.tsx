import {fireEvent, render} from '@testing-library/react-native';
import App from './App'

describe('App', () => {
    it('can click the button', () => {
        const { getByTestId, queryByTestId } = render(<App />);
        const button = getByTestId('click-me-button');
        fireEvent.press(button);
        expect(queryByTestId('click-me-button')).toBeFalsy();
    });
})
