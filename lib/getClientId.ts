const getClientId = (chainId: number) => {
    if (chainId === 80001) {
        return "f96a87b9-8f1a-4352-a734-f959d652c19e"
    } 
    if (chainId === 5) {
        return "aa7f9bdc-cdce-41f2-9e09-c3f9e9694be1"
    }
}

export default getClientId