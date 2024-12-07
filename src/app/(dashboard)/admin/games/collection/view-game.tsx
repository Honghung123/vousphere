"use client";
import { GameType } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import Image from "next/image";

export default function ViewGame({ children, game }: { children: React.ReactNode; game: GameType }) {
    return (
        <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-[425px] sm:max-w-[900px]">
                <DialogHeader>
                    <DialogTitle>User info</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <Card>
                        <CardContent className="grid p-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
                                <div className="flex">
                                    <Image
                                        src={game.image}
                                        alt="Game image"
                                        className="h-64 w-full"
                                        width={200}
                                        height={150}
                                    />
                                </div>
                                <div className="p-2">
                                    <p>
                                        <b>Game name: </b>
                                        {game.name}
                                    </p>
                                    <p>
                                        <b>Game type: </b> {game.type}
                                    </p>
                                    <p>
                                        <b>Allow trading: </b> {game.allowTrading ? "Allow" : "Not allow"}
                                    </p>
                                    <div className="">
                                        {" "}
                                        <b>Guide: </b> {game.guide}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex justify-center items-center gap-4">
                    <Button className="bg-sky-600">Update status</Button>
                    <Button className="bg-lime-600">Update game</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
