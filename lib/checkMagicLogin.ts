import { Magic } from "magic-sdk";

const getMagicUser = async () => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
        network: "goerli",
    });

    const user = await magic.user.getMetadata();
    return user
}

export default getMagicUser