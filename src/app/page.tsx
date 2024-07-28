"use client";
import { trpcClient } from "@/trpc/clients/client";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const { data, isLoading } = trpcClient.hello.useQuery();
  return (
    <main className="">
      Hello
      <UserButton />
      <div>{data?.title}</div>
      <div>{data?.content}</div>
    </main>
  );
}
