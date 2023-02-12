const shortenAddress = (address: string) => address?.substring(0, 5) + "..." + address?.substring(address.length - 4);


export default shortenAddress