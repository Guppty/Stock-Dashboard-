const basePath = "https://finnhub.io/api/v1";

export default searchSymbols = async (query) => {
    const url = `${basePath}/search?q=${query}&token=${process.env.REACT_APP_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        const message = `An Error has occured: ${response.status}`
        throw new Error(message);
    }

    return await response.json();
};