"use client";

import { SubscriptionForm } from "@/app/(dashboard)/counterpart/subscription/subscribe/subscribe-form";
import React from "react";

export default function SubscribeNew() {
    return (
        <div>
            <h1>Subscribe</h1>
            <div className="flex">
                <SubscriptionForm />
            </div>
        </div>
    );
}
