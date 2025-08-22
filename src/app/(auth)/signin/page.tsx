import Image from "next/image";
import Link from "next/link";
import SiginInButton from "./_components/SiginInButton";
import GradientAnimatedText from "../../../components/GradientAnimatedText";
import { Globe } from "@/components/magicui/globe"; // Import the Globe component

function Signin() {
  return (
    <div className="w-full min-h-screen h-screen relative flex items-center justify-center bg-background">
      <div className="w-[300px] sm:w-[600px] h-[600px] absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full blur-3xl bg-gradient-to-br from-slate-900 to-violet-900 opacity-30"></div>
      {/* Globe as background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50 z-0">
        <Globe className="scale-150 animate-spin" style={{ animationDuration: "30s" }} />
      </div>
      {/* Centered form */}
      <div className="mx-auto grid w-[350px] gap-6 z-10 text-center">
        <div className="grid gap-2">
          <GradientAnimatedText className="font-bold tracking-tighter sm:text-3xl xl:text-4xl/none pt-4 pb-2">
            Sign in
          </GradientAnimatedText>
          <p className="text-balance text-muted-foreground">
            Sign in and be a part of Updates 2K25.
          </p>
        </div>
        <SiginInButton className="w-full" text="Sign in with Google" />
        <div className="mt-4 text-sm">
          Navigate back to{" "}
          <Link href="/" className="underline">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;