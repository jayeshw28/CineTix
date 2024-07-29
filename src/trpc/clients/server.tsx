import { headers } from "next/headers";
import { createTRPCContext } from "../server";
import { cache } from "react";
import { createTRPCProxyClient, TRPCClientError } from "@trpc/client";
import { appRouter, AppRouter } from "../server/routers";
import { callProcedure } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { TRPCErrorResponse } from "@trpc/server/rpc";

const createContext = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    () =>
      ({ op: { input, path, type } }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callProcedure({
                ctx,
                path,
                procedures: appRouter._def.procedures,
                rawInput: input,
                type,
              });
            })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        }),
  ],
});
