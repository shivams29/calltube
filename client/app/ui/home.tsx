"use client";

import { Button } from "@/components/ui/button";
import { createRoom, joinRoom } from "../room/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const Home = () => {
  const joinRoomFormSchema = z.object({
    roomId: z.string({
      required_error: "Room ID is required",
    }),
    // .min(36, "Invalid room id"),
  });

  interface JoinRoomFormSchema extends z.infer<typeof joinRoomFormSchema> {}

  const form = useForm<JoinRoomFormSchema>({
    resolver: zodResolver(joinRoomFormSchema),
    defaultValues: {
      roomId: "",
    },
  });

  const onSubmit = (values: JoinRoomFormSchema) => {
    joinRoom(values.roomId);
  };

  const handleDialogOpen = () => {
    form.reset();
  };

  return (
    <div className="container">
      <div className="flex flex-col items-center gap-20">
        <h1 className="pt-10 text-center text-6xl font-sans font-bold">Create or join a room!</h1>
        <div className="flex gap-10">
          <Button size="lg" onClick={createRoom}>
            Create Room
          </Button>
          <Dialog onOpenChange={handleDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">Join Room</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Join Room</DialogTitle>
                    <DialogDescription>Enter the room id to join.</DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-2">
                    <FormField
                      control={form.control}
                      name="roomId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Id</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter the room id here..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="text-right mt-5">
                    <Button type="submit">Join</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
