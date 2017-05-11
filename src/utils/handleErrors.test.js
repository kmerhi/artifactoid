const handleErrors = require('./handleErrors');

describe('handleErrors', () => {

	it('should return the response if response is ok', () => {
		const response = {
			url: 'http://localhost:8081/artifactory/api/404',
			status: 200,
			statusText: 'OK',
			ok: true,
		};

		expect(handleErrors(response)).toBe(response);
	});

	it('should throw the response if response is not ok', () => {
		const response = {
			url: 'http://localhost:8081/artifactory/api/404',
			status: 404,
			statusText: 'Not Found',
			ok: false,
		};

		expect(() => {
			handleErrors(response);
		}).toThrowError(new Error(response));
	});

});