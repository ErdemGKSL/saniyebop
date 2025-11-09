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

export default {
    name: "SaniyebopBadge",
    description: "Adds custom badges for special Saniyebop users",
    authors: [
        {
            name: "bariscb",
            id: 209974811479375872n
        }
    ],

    patches: [
        {
            // Patch to inject custom badges into user profiles
            find: "Messages.PROFILE_USER_BADGES",
            replacement: {
                match: /(\.badges\)\.map\()/,
                replace: "$self.injectCustomBadges(arguments[0]),$1"
            }
        }
    ],

    // Inject custom badges for specific users
    injectCustomBadges(userProps: any) {
        if (!userProps?.badges) return userProps;

        const userId = userProps.user?.id || userProps.userId;
        const customBadge = BADGE_USERS[userId];

        if (customBadge && !userProps.badges.some((b: any) => b.id === `custom_${customBadge.name}`)) {
            userProps.badges = [
                ...userProps.badges,
                {
                    id: `custom_${customBadge.name}`,
                    description: customBadge.description,
                    icon: this.getBadgeIcon(customBadge.icon),
                    link: "https://discord.gg/saniye"
                }
            ];
        }

        return userProps;
    },

    // Get badge icon URL
    getBadgeIcon(iconName: string) {
        // Return path to static badge asset
        return `equibop://static/badges/${iconName}.png`;
    }
};
