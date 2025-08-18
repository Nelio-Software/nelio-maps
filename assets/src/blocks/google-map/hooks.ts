export const useGoogleMapsApiKey = (): string =>
	// @ts-expect-error This global variable must exist.
	// eslint-disable-next-line
	window.NelioMaps?.googleMapsApiKey || '';

export const useOptionsPageUrl = (): string =>
	// @ts-expect-error This global variable must exist.
	// eslint-disable-next-line
	window.NelioMaps?.optionsPageUrl || '';
