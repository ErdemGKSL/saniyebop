/*
 * Saniyebop, a desktop app aiming to give you a snappier Discord Experience
 * Copyright (c) 2025 Saniyebop
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

// Custom badge user IDs
const BADGE_USERS: Record<string, { name: string; description: string; icon: string }> = {
    "209974811479375872": {
        name: "baris",
        description: "baris",
        icon: "baris" // Will load from static/badges/baris.png
    }
};

// Register badge with Vencord's Badge API
setTimeout(() => {
    if (Vencord?.Api?.Badges) {
        try {
            Vencord.Api.Badges.addProfileBadge({
                description: "bariscb",
                image: "equibop://static/badges/baris.png",
                link: "https://discord.gg/saniye",
                shouldShow: (userInfo: any) => userInfo?.userId === "209974811479375872"
            });
        } catch (e) {
            console.error("[SaniyebopBadge] Failed to register badge:", e);
        }
    }
}, 1000);

export default {
    name: "SaniyebopBadge",
    description: "Adds custom badges for special Saniyebop users",
    authors: [
        {
            name: "bariscb",
            id: 209974811479375872n
        }
    ]
};
