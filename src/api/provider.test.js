import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createThunk, makeSendRequest } from './path-to-your-utils'; // Import your utilities

describe('Abort Functionality', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it('should abort the request', async () => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        // Mock the request to delay response
        mock.onGet('/example').reply(200, {}, { delay: 2000 });

        // Set up your sendRequest function
        const sendRequest = makeSendRequest('http://localhost:3000/api/v1/posts', {});

        // Create a thunk using the sendRequest
        const thunk = createThunk({
            resource: 'example',
            actionType: 'getAll',
            requestConfig: {
                method: 'GET'
            }
        });

        // Dispatch the thunk with the signal
        const dispatchPromise = thunk({ token: 'your-token' }, { signal });

        // Abort the request after a short delay
        setTimeout(() => {
            abortController.abort();
        }, 1000);

        // Verify that the promise rejects with AbortError
        await expect(dispatchPromise).rejects.toThrow('Aborted');
    });
});
