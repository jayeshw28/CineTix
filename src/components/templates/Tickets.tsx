"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getDownloadURL, ref } from "firebase/storage";

import { format } from "date-fns";

import { Button } from "../atoms/button";
import { storage } from "@/utils/config/firebase";
import { useAuth } from "@clerk/nextjs";
import { trpcClient } from "@/trpc/clients/client";
import { Loading } from "../molecules/Loading";
import { RouterOutputs } from "@/trpc/clients/types";
import { SimpleDialog } from "../molecules/SimpleDialog";
import { SeatNumber } from "../organisms/SearchUtils/SeatNumber";

export interface ITicketsProps {}

async function getImageUrl(path: string): Promise<string> {
  if (!path) {
    throw new Error("Invalid file path");
  }

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  try {
    const fileRef = ref(storage, cleanPath);
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error getting download URL:", error);
    throw error;
  }
}

export const TicketMovie = ({
  ticket,
}: {
  ticket: RouterOutputs["tickets"]["myTickets"][0];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div key={ticket.id} className="bg-white">
      <SimpleDialog open={open} setOpen={setOpen} title={"QR Code"}>
        <QRCode url={ticket.qrCode || ""} />
      </SimpleDialog>
      <div className="flex gap-6 rounded-sm p-3 border">
        <Image
          width={200}
          height={200}
          className="rounded"
          src={ticket.Booking[0].ShowTime.Movie.posterUrl || "/film.png"}
          alt={ticket.Booking[0].ShowTime.Movie.title}
        />
        <div>
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-lg font-semibold">
                {ticket.Booking[0].ShowTime.Movie.title}
              </div>
              <div>{ticket.Booking[0].ShowTime.Screen.Cinema.name}</div>
            </div>
            <div className="flex flex-col items-center p-1 border rounded">
              <div className="text-xs">AUDI</div>
              <div className="text-xl font-bold">
                {ticket.Booking[0].ShowTime.Screen.number}
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold">
              {format(new Date(ticket.Booking[0].ShowTime.startTime), "p")}
            </div>
            <div className="text-xs">
              {format(new Date(ticket.Booking[0].ShowTime.startTime), "PP")}
            </div>
          </div>
          <div className="mt-4">
            <div>Seats</div>
            <div className="flex flex-wrap gap-2 ">
              {ticket.Booking.map((booking) => (
                <SeatNumber
                  key={booking.id}
                  row={booking.row}
                  column={booking.column}
                />
              ))}
            </div>
          </div>
          <Button
            variant="default"
            className="mt-2"
            size="sm"
            onClick={() => setOpen(true)}
          >
            View QR code
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Tickets = ({}: ITicketsProps) => {
  const { userId } = useAuth();
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(0);
  const { data, isLoading } = trpcClient.tickets.myTickets.useQuery();

  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6">
      {data?.map((ticket) => <TicketMovie key={ticket.id} ticket={ticket} />)}
    </div>
  );
};

export const QRCode = ({ url }: { url: string }) => {
  const [picUrl, setPicUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // fix this
  useEffect(() => {
    async function fetchImageUrl() {
      if (!url) {
        setError("No QR code URL provided");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const imageUrl = await getImageUrl(url);
        setPicUrl(imageUrl);
      } catch (err) {
        console.error("Error fetching QR code:", err);
        setError("Failed to load QR code");
      } finally {
        setLoading(false);
      }
    }

    fetchImageUrl();
  }, [url]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;
  if (!picUrl) return <div>No QR code available</div>;

  return <Image width={200} height={200} src={picUrl} alt={"ticket"} />;
};
