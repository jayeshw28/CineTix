import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="">
      Hello <UserButton />{' '}
    </main>
  );
}
