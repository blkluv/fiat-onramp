import { Magic } from "magic-sdk";
import { useState } from "react";
import Button from "../Button";
import Spinner from "../Spinner";

const LoginForm = ({ onLogin }: any) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const tryLogin = async () => {
    try {
      const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
        network: "goerli",
      });

      await magic.auth.loginWithMagicLink({
        email,
      });

      onLogin();
    } catch (e) {
      console.error(e);
    }
  };

  const onClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await tryLogin();
    setLoading(false);
  };

  const handleChange = (e: any) => setEmail(e.target.value);

  return (
    <form
      className="flex flex-col justify-center items-center gap-10 w-[90vw] h-[85vh] "
      onSubmit={onClick}
    >
      <div>
        <p className="font-header">Email</p>
        <input
          className="border border-black text-black rounded-lg p-4 w-[400px]"
          onChange={handleChange}
        />
      </div>
      <Button onClick={onClick} type="submit" disabled={loading}>
        {loading ? <Spinner width={20} height={20} color="black" /> : "Sign In"}
      </Button>
    </form>
  );
};

export default LoginForm;
