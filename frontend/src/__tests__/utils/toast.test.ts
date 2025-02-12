import { showToast } from '../../utils/toast';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

describe('showToast', () => {
  it('calls success toast', () => {
    showToast('success', 'Test message');
    expect(toast.success).toHaveBeenCalledWith('Test message', expect.any(Object));
  });

  it('calls error toast', () => {
    showToast('error', 'Error message');
    expect(toast.error).toHaveBeenCalledWith('Error message', expect.any(Object));
  });
}); 