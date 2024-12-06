"use client";
import { ShoppingCart } from "lucide-react";

import Link from "next/link";

import { Button } from "@/components/ui/button";

function Background({
    children,
    color = "slate",
    className,
}: {
    children: React.ReactNode;
    color?: string;
    className?: string;
}) {
    return (
        <div
            className={`"flex items-center justify-center w-4 h-4 text-xs font-semibold text-white bg-${color}-600 rounded-full" ${className}`}
        >
            {children}
        </div>
    );
}

export default function CartSection() {
    const cart = {
        items: [
            {
                id: 1,
                name: "Product name",
                qty: 1,
            },
        ],
    };
    return (
        <Button asChild variant="ghost">
            <Link href="/cart">
                <div className="relative">
                    <ShoppingCart className="!w-8 !h-8" />
                    {cart && cart.items.length > 0 && (
                        <Background className="absolute top-0 right-0">
                            {cart.items.reduce((a, c) => a + c.qty, 0)}
                        </Background>
                    )}
                </div>
            </Link>
        </Button>
    );
}
