import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import SettingsPanel from '../../../components/Settings/SettingsPanel';
import { useThemeContext } from '../../../context/themeContext';
import { useChatStore } from '../../../context/chatStore';
import type { Mock } from 'jest-mock';

jest.mock('../../../context/themeContext');
jest.mock('../../../context/chatStore', () => ({
  useChatStore: jest.fn()
}));

describe('SettingsPanel', () => {
  const mockToggleDarkMode = jest.fn();
  const mockUpdateSettings = jest.fn();

  beforeEach(() => {
    (useThemeContext as unknown as Mock<any>).mockReturnValue({
      darkMode: false, 
      toggleDarkMode: mockToggleDarkMode
    });

    (useChatStore as unknown as Mock<any>).mockReturnValue({
      settings: {
        language: 'en',
        speechEnabled: true
      },
      updateSettings: mockUpdateSettings
    });
  });

  it('renders settings button', () => {
    render(<SettingsPanel />);
    expect(screen.getByTestId('SettingsIcon')).toBeInTheDocument();
  });

  it('opens menu on button click', () => {
    render(<SettingsPanel />);
    fireEvent.click(screen.getByTestId('SettingsIcon'));
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  
  it('toggles speech recognition', () => {
    render(<SettingsPanel />);
    fireEvent.click(screen.getByTestId('SettingsIcon'));
    
    // Find and click the switch input
    const switchInput = screen.getByTestId('speech-switch');
    fireEvent.click(switchInput);
    
    expect(mockUpdateSettings).toHaveBeenCalledWith({ speechEnabled: false });
  });
}); 